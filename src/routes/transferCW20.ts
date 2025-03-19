import express, { Request, Response } from "express";

import { getAccount } from "../contracts/createAccount";
import { transferCW20 } from "../contracts/transferCW20";
import { bytes32 } from "../interfaces/alias";
import { bufferFromByte32 } from "../utils/converterBuffer";

const transferCW20Router = express.Router();

interface Req {
  wallet_salt: bytes32;
  toAddress: string;
  amount: string;
  contract: string;
}

type Res =
  | string
  | {
    txHash: string;
  };

transferCW20Router.post(
  "/transfer-cw20",
  async (req: Request<never, never, Req>, res: Response<Res>) => {
    try {
      let { wallet_salt, toAddress, amount, contract } = req.body;

      console.log(req.body);

      if (wallet_salt.length !== 32) {
        res.status(400).send("Invalid wallet salt");
        return;
      }

      let signer = await getAccount(bufferFromByte32(wallet_salt));
      let txHash = await transferCW20(signer, toAddress, amount, contract);

      res.send({
        txHash,
      });
    } catch (error) {
      console.error("Error during CW20 transfer:", error);
      res.status(500).send("An error occurred during the CW20 transfer");
    }
  }
);

export default transferCW20Router;
