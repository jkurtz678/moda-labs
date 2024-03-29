import type { OpenseaToken, FirestoreDocument, TokenMeta } from "@/types/types";

const OPENSEA_API_KEY = import.meta.env.VITE_OPENSEA_API_KEY;

// loadTokensByAccountID returns all associated opensea tokens for a given account id
export async function loadTokensByAccountID(wallet_address: string): Promise<Array<OpenseaToken>> {
    const token_list = [];
    const chain = "ethereum"
    let cursor = "";
    while (true) {
        // https://api.opensea.io/api/v2/chain/{chain}/account/{address}/nfts
        const res = await fetch(`https://api.opensea.io/api/v2/chain/${chain}/account/${wallet_address}/nfts?limit=200${cursor ? '&next=' + cursor : ""}`,
            {
                headers: {
                    'X-API-KEY': OPENSEA_API_KEY
                }
            }
        );

        const res_json = await res.json();
        handleOpenseaFetchError(res, res_json)
        if (res_json.nfts) {
            token_list.push(...res_json.nfts);
        }


        // continue to call api until all tokens have been retrieved
        cursor = res_json.next;
        if (!cursor) {
            break;
        }
    }

    return token_list;
}

// loadTokensByAccountID returns opensea tokens by a list asset contract addresses and token ids
export const loadTokensByTokenIDAndAssetContract = async (tokens: Array<FirestoreDocument<TokenMeta>>): Promise<Array<OpenseaToken>> => {
    let url = `https://api.opensea.io/api/v1/assets/?`
    tokens.forEach(t => {
        url += `asset_contract_addresses=${t.entity.asset_contract_address}&token_ids=${t.entity.token_id}&`
    })

    url = url.substring(0, url.length - 1)

    const res = await fetch(url, {
        headers: {
            'X-API-KEY': OPENSEA_API_KEY
        }
    });
    const res_json = await res.json();

    return res_json.assets;
}

// loadTokensCreatedByAddress returns opensea tokens that are created by a wallet address
export const loadTokensCreatedByAddress = async (wallet_address: string): Promise<Array<OpenseaToken>> => {
    const token_list = [];
    let cursor = "";
    while (true) {
        const res = await fetch(`https://api.opensea.io/api/v2/events/accounts/${wallet_address}?chain=ethereum&event_type=listing&limit=50${cursor ? '&next=' + cursor : ""}`,
            {
                headers: {
                    'X-API-KEY': OPENSEA_API_KEY
                }
            }
        );

        const res_json = await res.json();
        handleOpenseaFetchError(res, res_json)
        // add creator to fit with other opensea endpoint pattern

        if (res_json.asset_events) {
            token_list.push(...res_json.asset_events.map((e: any) => {
                return { ...e.asset  };
            }));
        }


        // continue to call api until all tokens have been retrieved
        cursor = res_json.next;
        if (!cursor) {
            break;
        }
    }
    return token_list;
}

const handleOpenseaFetchError = (res: Response, body: any) => {
    if (res.status >= 400) {
        if (body.detail) {
            throw body.detail
        }
        if (res.status == 429) {
            throw "Error - opensea rejected request due to rate limiting"
        }
        throw "Error loading opensea tokens"
    }
}