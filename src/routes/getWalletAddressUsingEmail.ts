import express, { Request, Response } from "express";

const getWalletAddressUsingEmailRouter = express.Router();

interface Req {
  email: string;
}

getWalletAddressUsingEmailRouter.post(
  "/get-wallet-address-using-email",
  async (req: Request<never, never, Req>, res: Response<any>) => {
    try {
      let { email }= req.body;

      const response = await fetch("http://localhost:4500/get-wallet-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      res.status(200).json(data);
    } catch (error: any) {
      console.error("Error calling get-wallet-address:", error);
    }
  }
)

export default getWalletAddressUsingEmailRouter;