import express, { Request, Response } from "express";

import { bytes32 } from "../interfaces/alias";
import { transferToken } from "../contracts/transferToken";
import { getAccount } from "../contracts/createAccount";
import { bufferFromByte32 } from "../utils/converterBuffer";

const transferTokenRouter = express.Router();

interface Req {
  wallet_salt: bytes32;
  toAddress: string;
  denom: string;
  amount: number;
}

type Res =
  | string
  | {
    txHash: string;
  };

transferTokenRouter.post(
  "/transfer-token",
  async (req: Request<never, never, Req>, res: Response<Res>) => {
    try {
      let { wallet_salt, toAddress, denom, amount } = req.body;

      if (wallet_salt.length !== 32) {
        res.status(400).send("Invalid wallet salt");
        return;
      }

      let signer = await getAccount(bufferFromByte32(wallet_salt));
      let txHash = await transferToken(signer, { toAddress, amount, denom });

      res.send({
        txHash,
      });
    } catch (error) {
      console.error("Error during token transfer:", error);
      res.status(500).send("An error occurred during the token transfer");
    }
  }
);

export default transferTokenRouter;
