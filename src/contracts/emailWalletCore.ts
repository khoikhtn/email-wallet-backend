import {setUpClient} from "../global";
import {ENV_KEY, getEnv} from "../utils/config";

const cache = {
    relayerHandlerAddr: "",
    accountHandlerAddr: ""
}

export async function relayerHandlerAddr() {
    if (cache.relayerHandlerAddr !== "") {
        return cache.relayerHandlerAddr;
    }
    const {client} = await setUpClient();
    cache.relayerHandlerAddr = await client.queryContractSmart(getEnv(ENV_KEY.CORE_CONTRACT_ADDRESS), {
        relayer_handler_addr: {}
    });
    return cache.relayerHandlerAddr;
}

export async function accountHandlerAddr() {
    if (cache.accountHandlerAddr !== "") {
        return cache.accountHandlerAddr;
    }
    const {client} = await setUpClient();
    cache.accountHandlerAddr = await client.queryContractSmart(getEnv(ENV_KEY.CORE_CONTRACT_ADDRESS), {
        account_handler_addr: {}
    });
    return cache.accountHandlerAddr;
}