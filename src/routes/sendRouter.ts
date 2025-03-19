import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import { sendEmail } from "../utils/sendEmail";

const sendRouter = express.Router();

interface TokenReq {
  email: string;
  appPassword: string;
  recipient: string;
  amount?: number;
  contractAddress?: string;
  tokenId?: number;
}

interface EmailReq {
  email: string;
  appPassword: string;
}

sendRouter.post("/send-email", async (req: Request<never, never, EmailReq>, res: Response) => {
  const { email, appPassword } = req.body;

  const randomHex = randomBytes(30).toString("hex");
  const subject = `CODE:0x${randomHex}`;

  try {
    await sendEmail({
      email,
      appPassword,
      recipientEmail: "emailrelayer2003@gmail.com",
      subject,
    });
    res.send({ message: "Email sent" });
  } catch (error) {
    res.status(500).send({ message: "Email not sent" });
  }
});

sendRouter.post("/send-token", async (req: Request<never, never, TokenReq>, res: Response) => {
  const { email, appPassword, recipient, amount } = req.body;

  const subject = `Send ${amount} uxion to ${recipient}`;
  try {
    await sendEmail({ email, appPassword, recipientEmail: "emailrelayer2003@gmail.com", subject });
    res.send({ message: "XION sent" });
  } catch (error) {
    res.status(500).send({ message: "XION not sent" });
  }
});

sendRouter.post("/send-cw20", async (req: Request<never, never, TokenReq>, res: Response) => {
  const { email, appPassword, recipient, contractAddress, amount } = req.body;

  const subject = `Send CW20 ${amount} ${contractAddress} to ${recipient}`;
  try {
    await sendEmail({ email, appPassword, recipientEmail: "emailrelayer2003@gmail.com", subject });
    res.send({ message: "CW20 token sent" });
  } catch (error) {
    res.status(500).send({ message: "CW20 token not sent" });
  }
});

sendRouter.post("/send-nft", async (req: Request<never, never, TokenReq>, res: Response) => {
  const { email, appPassword, recipient, contractAddress, tokenId } = req.body;

  const subject = `Send NFT ${contractAddress} ${tokenId} to ${recipient}`;
  try {
    await sendEmail({ email, appPassword, recipientEmail: "emailrelayer2003@gmail.com", subject });
    res.send({ message: "NFT sent" });
  } catch (error) {
    res.status(500).send({ message: "NFT not sent" });
  }
});

export default sendRouter;
