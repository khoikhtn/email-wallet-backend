import express, { Request, Response } from "express";
import { getAccount } from "../contracts/createAccount";
import { transferNFT } from "../contracts/transferNFT";

const transferNFTRouter = express.Router();

interface Req {
  wallet_salt: number[];
  toAddress: string;
  contract: string;
  tokenId: string;
}

type Res =
  | string
  | {
    txHash: string;
  };

transferNFTRouter.post(
  "/transfer-nft",
  async (req: Request<never, never, Req>, res: Response<Res>) => {
    try {
      let { wallet_salt, toAddress, contract, tokenId } = req.body;

      if (wallet_salt.length !== 32) {
        res.status(400).send("Invalid wallet salt");
        return;
      }

      let signer = await getAccount(Buffer.from(wallet_salt));
      let txHash = await transferNFT(signer, toAddress, contract, tokenId);

      res.send({
        txHash,
      });
    } catch (error) {
      console.error("Error during NFT transfer:", error);
      res.status(500).send("An error occurred during the NFT transfer");
    }
  }
);

export default transferNFTRouter;
