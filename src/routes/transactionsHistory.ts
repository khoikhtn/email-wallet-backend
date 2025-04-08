import express, {Request, Response} from "express";
import transactionDatabase from "../utils/firebaseConfig";
import { collection, query, where, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

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

      const [doc] = querySnapshot.docs;

      res.json({
        transaction: doc.data(),
      })
    } catch (err) {
      throw err;
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

      const docRef = doc(transactionDatabase, "transactions", wallet_address);
      await setDoc(docRef, data, { merge: true });

      res.status(201).json({
        message: "Transaction stored successfully",
        docId: wallet_address,
      });
    } catch (err) {
      console.error("Error writing transaction:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default transactionsRouter;