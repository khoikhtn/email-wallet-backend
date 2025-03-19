import express, { Request, Response } from "express";
import * as fs from "fs/promises";

const getTransactions = express.Router();

getTransactions.get(
  "/get-transactions",
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const filePath = "./transactions/txResult.txt";

      const data = await fs.readFile(filePath, "utf-8");

      const transactions = data
        .split("\n")
        .filter((tx) => tx.trim() !== "");

      res.json({ transactions })
    } catch (err) {
      throw err;
    }
  }
);

export default getTransactions;