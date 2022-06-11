import type { OpenseaToken, FirestoreDocument, TokenMeta } from "@/types/types";

const OPENSEA_API_KEY = '742ea11e1d864fe2b23ac7cfe66a43f7';

// loadTokensByAccountID returns all associated opensea tokens for a given account id
export async function loadTokensByAccountID(web3_account_id: string): Promise<Array<OpenseaToken>> {
    const res = await fetch(`https://api.opensea.io/api/v1/assets/?owner=${web3_account_id}`);
    const res_json = await res.json();

    return res_json.assets;
}

// loadTokensByAccountID returns opensea tokens by a list asset contract addresses and token ids
export const loadTokensByTokenIDAndAssetContract = async (tokens: Array<FirestoreDocument<TokenMeta>>): Promise<Array<OpenseaToken>> => {
    let url = `https://api.opensea.io/api/v1/assets/?`
    tokens.forEach(t => {
        url += `asset_contract_addresses=${t.entity.asset_contract_address}&token_ids=${t.entity.token_id}&`
    })

    url = url.substring(0, url.length - 1)

    const res = await fetch(url);
    const res_json = await res.json();

    return res_json.assets;
}