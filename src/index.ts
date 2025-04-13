import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import createAccountRouter from "./routes/createAccount";
import transferTokenRouter from "./routes/transferToken";
import getWalletAddressRouter from "./routes/getWalletAddress";
import params from "./routes/params";
import transferNFTRouter from "./routes/transferNFT";
import mintNFTRouter from "./routes/mintNFT";
import registerRelayerRouter from "./routes/registerRelayer";
import transferCW20Router from "./routes/transferCW20";
import getWalletBalanceRouter from "./routes/getAccountBalance";
import sendRouter from "./routes/sendRouter";
import getWalletAddressUsingEmailRouter from "./routes/getWalletAddressUsingEmail";
import transactionsRouter from "./routes/transactionsHistory";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

app.get("/", (_req, res) => res.status(200).send("OK"));
app.use("/", createAccountRouter);
app.use("/", transferTokenRouter);
app.use("/", getWalletAddressRouter);
app.use("/", transferNFTRouter);
app.use("/", mintNFTRouter);
app.use("/", registerRelayerRouter);
app.use("/", params);
app.use("/", transferCW20Router);
app.use("/", getWalletBalanceRouter);
app.use("/", sendRouter);
app.use("/", getWalletAddressUsingEmailRouter);
app.use("/", transactionsRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Your server is running successfully on port ${PORT}`)
);
