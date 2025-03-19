import {transferToken} from "../contracts/transferToken";
import {ENV_KEY, getEnv} from "../utils/config";
import {importMnemonic} from "../utils/wallet";
import {createAccount} from "../contracts/createAccount";

jest.setTimeout(10000000);
describe("Test import existed mnemonic to reconstruct wallet", () => {
    it("should reconstruct expected wallet", async () => {
        let sender = await importMnemonic(getEnv(ENV_KEY.MNEMONIC));
        let r_add = "xion1pcgpfanmtqcv40h2ay3gl74r7wj2ajdwm0xdc9";
        let tx_hash = await transferToken(sender, {
            toAddress: r_add,
            denom: "uxion",
            amount: 5,
        });
        console.log(tx_hash);
    });

    it("should call contract", async () => {
        let tx_hash = await createAccount({
            email_addr_pointer: "16758458715147206766079366791832805159132081689916047111685962786065206865082",
            account_key_commit: "21358398833223768133805053213095102992867253664433975338853258016417424358279",
            wallet_salt: "16508469561050526225511527870209946093433618218663537432955398936429622658009",
            psi_point: [
                "3184649499805007138992381079366129329246398522610842004765495454419110487368",
                "19216343773775236196829009925907810475209443811108956591285097563906515509918"
            ],
            proof: {
                pi_a: [
                    "2476581765641128847685108976253388389997830179504700025414481287176970383828",
                    "110050287541428994412791243163578474887475946666479906241611567400925242652"
                ],
                pi_b: [
                    [
                        "2808659297487422594153927998937213084813965840346798916520353955067875659121",
                        "11712027834446867815512126564420559367212103042599983426662169622723289789493"
                    ],
                    [
                        "12053473043893844932492871142515311749324434875909438020690324794057070322440",
                        "3206770995391935126666281657525599500298247129725385661998349709883903870069"
                    ]
                ],
                pi_c: [
                    "11587830420469232944704361621630132594902311893253457153837927989357322012303",
                    "1500081884476111674042664060779514526998662668138028102382521766377108136252"
                ]
            }
        });
        console.log(tx_hash);
    });
});
