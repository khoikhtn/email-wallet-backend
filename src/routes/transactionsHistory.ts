import express, {Request, Response} from "express";
import transactionDatabase from "../utils/firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const transactionsRouter = express.Router();
const collectionRef = collection(transactionDatabase, "transactions");

export type TransactionBody = {
  wallet_address: string;
  action: string;
  timestamp?: string;
}

transactionsRouter.get(
  "/transactions-history/:wallet",
  async (
    req: Request,
    res: Response
  ) => {
    const wallet = req.params.wallet;

    try {
      const q = query(collectionRef, where("wallet_address", "==", wallet));
      const querySnapshot = await getDocs(q);

      const transactions = querySnapshot.docs.map((doc) => doc.data())

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
    const { wallet_address, action, timestamp } = req.body;

    try {
      const data = {
        wallet_address,
        action,
        timestamp: timestamp || new Date().toISOString(),
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