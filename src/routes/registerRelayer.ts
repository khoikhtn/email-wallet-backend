import express, {Request, Response} from "express";
import {u256} from "../interfaces/alias";
import {registerRelayer} from "../contracts/relayerHandler";

const registerRelayerRouter = express.Router();
registerRelayerRouter.post(
    "/register-relayer",
    async (
        req: Request<never, never, {
            rand_hash: u256,
            email_addr: String,
            hostname: String,
        }>,
        res: Response<{
            tx_hash: String
        }>
    ) => {
        let tx_hash = await registerRelayer(req.body);
        res.send({
            tx_hash
        });
    }
);

export default registerRelayerRouter;
