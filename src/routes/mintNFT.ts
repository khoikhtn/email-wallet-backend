import express, {Request, Response} from "express";
import {mintNFT} from "../contracts/mintNFT";

const mintNFTRouter = express.Router();

interface Req {
    owner: string;
    contract_address: string;
    token_id: string;
}

type Res =
    | string
    | {
    txHash: string;
};
mintNFTRouter.post(
    "/mint-nft",
    async (req: Request<never, never, Req>, res: Response<Res>) => {
        let {owner, contract_address, token_id} = req.body;

        let txHash = await mintNFT(owner, contract_address, token_id);
        res.send({
            txHash,
        });
    }
);
export default mintNFTRouter;
