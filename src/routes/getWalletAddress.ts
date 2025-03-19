import express, {Request, Response} from "express";
import {getAccount} from "../contracts/createAccount";
import {bufferFromByte32} from "../utils/converterBuffer";
import {getAddressFromWallet} from "../utils/wallet";
import {bytes32} from "../interfaces/alias";

const getWalletAddressRouter = express.Router();

getWalletAddressRouter.post(
    "/get-wallet-address",
    async (
        req: Request<never, never, { wallet_salt: bytes32 }>,
        res: Response<{ address: string }>
    ) => {
        let {wallet_salt} = req.body;
        console.log({wallet_salt});
        let wallet = await getAccount(bufferFromByte32(wallet_salt));
        let address = await getAddressFromWallet(wallet);
        console.log({addr: address});
        res.send({address});
    }
);

export default getWalletAddressRouter;
