import express, {Request, Response} from "express";
import {createAccount, getAccount} from "../contracts/createAccount";
import {bytes32} from "../interfaces/alias";
import {bufferFromByte32} from "../utils/converterBuffer";
import {AccountCreationProof} from "../interfaces/proof";

const createAccountRouter = express.Router();

export type AccountCreationRequest = {
    wallet_salt_byte32: bytes32;
    proof: AccountCreationProof;
};

export type AccountCreationResponse = {
    user_addr: string;
    account_creation_tx_hash: string;
};

createAccountRouter.post(
    "/create-account",
    async (
        req: Request<never, never, AccountCreationRequest>,
        res: Response<AccountCreationResponse>
    ) => {
        try {
            let {wallet_salt_byte32, proof} = req.body;
            let newAccountAddress = await getAccount(
                bufferFromByte32(wallet_salt_byte32)
            );
            let account_creation_tx_hash = await createAccount(proof);
            let [{address: user_addr}] = await newAccountAddress.getAccounts();
            res.send({
                user_addr,
                account_creation_tx_hash
            });
        } catch (err) {
            throw err;
        }
    }
);

export default createAccountRouter;
