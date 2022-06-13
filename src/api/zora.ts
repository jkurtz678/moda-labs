import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";

const networkInfo = {
    network: ZDKNetwork.Ethereum,
    chain: ZDKChain.Mainnet,
}

const API_ENDPOINT = "https://api.zora.co/graphql";
const args = {
    endPoint: API_ENDPOINT,
    networks: [networkInfo],
    // apiKey: process.env.API_KEY // i've requested an api key with Zora, waiting for their response
} 

const zdk = new ZDK(args)

export async function getWalletTokens(account_address: string) {
    const resp = await zdk.token({    
        token: {
            address: "0x495f947276749ce646f68ac8c248420045cb7b5e",
            tokenId: "97961714644881132905920075193463250017091449770775961728735358090901545025537"
        }
    })  

    console.log("zora resp", resp)
}