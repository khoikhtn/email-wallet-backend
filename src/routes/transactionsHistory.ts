import express, {Request, Response} from "express";
import transactionDatabase from "../utils/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const transactionsRouter = express.Router();
const collectionRef = collection(transactionDatabase, "transactions");

export type TransactionBody = {
  sender: string;
  recipient: string;
  action: string;
}

transactionsRouter.get(
  "/transactions-history/:wallet",
  async (
    req: Request,
    res: Response
  ) => {
    const wallet = req.params.wallet;

    try {
      const senderQuery = query(collectionRef, where("sender", "==", wallet));
      const recipientQuery = query(collectionRef, where("recipient", "==", wallet));

      const [senderSnapshot, recipientSnapshot] = await Promise.all([
        getDocs(senderQuery),
        getDocs(recipientQuery),
      ]);

      const transactions = [
        ...senderSnapshot.docs.map((doc) => doc.data()),
        ...recipientSnapshot.docs.map((doc) => doc.data()),
      ];

      transactions.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );      

      res.json({
        transactions,
      })
    } catch (err) {
      console.error("Error fetching transaction with wallet address:", wallet, err);
      res.status(500).json({ message: `Error fetching transaction with wallet address: ${wallet}` });
    }
  }
)

transactionsRouter.post(
  "/transactions-history",
  async (
    req: Request<never, never, TransactionBody>,
    res: Response
  ) => {
    const { sender, recipient, action } = req.body;

    try {
      const data = {
        sender,
        recipient,
        action,
        timestamp: new Date().toISOString(),
      };

      const docRef = await addDoc(collectionRef, data);

      res.status(201).json({
        message: "Transaction added successfully",
        docId: docRef.id,
      });

    } catch (err) {
      console.error("Error adding transaction:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default transactionsRouter;