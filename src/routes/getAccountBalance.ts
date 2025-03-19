import express, { Request, Response } from "express";
import { getAccount } from "../contracts/createAccount";
import { bufferFromByte32 } from "../utils/converterBuffer";
import { getAddressFromWallet } from "../utils/wallet";
import { bytes32 } from "../interfaces/alias";
import { getBalance } from "../contracts/getAllBalance";

const getWalletBalanceRouter = express.Router();

interface Req {
  accountAddr: string;
}

type Res =
  | string
  | {
      cw20Balance: string;
    };

getWalletBalanceRouter.post(
  "/get-wallet-balance",
  async (
    req: Request<never, never, { accountAddr: string }>,
    res: Response<{ cw20Balance: string; cw721Balance: string }>
  ) => {
    let { accountAddr } = req.body;
    let { cw20Balance, cw721Balance } = await getBalance(accountAddr);
    console.log({ cw20Balance: cw20Balance, cw721Balance: cw721Balance });
    res.send({ cw20Balance, cw721Balance });
  }
);

export default getWalletBalanceRouter;
