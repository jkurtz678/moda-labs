import { defineStore } from "pinia";
import { type FirestoreDocument, type OpenseaToken, type TokenMeta, Blockchain, TokenPlatform } from "@/types/types"
import { getUniqueOpenseaID, getTokenMetaUniqueChainID } from "@/types/types"

import { getTokenMetaListByWalletAddressWithListener } from "@/api/token-meta";
import { loadTokensByAccountID, loadTokensCreatedByAddress } from "@/api/opensea";

export type RootTokenMetaState = {
    archive_token_meta_list: FirestoreDocument<TokenMeta>[];
    opensea_minted_token_meta_list: OpenseaToken[];
    opensea_wallet_token_meta_list: OpenseaToken[];
}
interface TokenMetaMap {
    [id: string]: FirestoreDocument<TokenMeta>;
}
export const useTokenMetaStore = defineStore({
    id: 'token-meta',
    state: () => ({
        archive_token_meta_list: [],
        opensea_minted_token_meta_list: [],
        opensea_wallet_token_meta_list: [],
    } as RootTokenMetaState),
    getters: {
        archive_token_meta_map: (state): TokenMetaMap => {
            const token_meta_map: TokenMetaMap = {};
            state.archive_token_meta_list.forEach((m) => {
                token_meta_map[m.id] = m;
            });
            return token_meta_map;
        },
        all_token_metas(state): TokenMetaMap {
            const token_meta_map: TokenMetaMap = {};

            // add wallet and minted tokens together in one map, which will remove duplicates
            const opensea_tokens = [...state.opensea_minted_token_meta_list, ...state.opensea_wallet_token_meta_list]
            opensea_tokens.forEach((o) => {
                const meta = convertOpenseaToTokenMeta(o)
                token_meta_map[meta.id] = meta
            })

            // add archive tokens
            state.archive_token_meta_list.forEach((t) => {
                // if archive tokens contain matching token_id/asset_contract_address pair to opensea tokens, remove
                if (token_meta_map[getTokenMetaUniqueChainID(t)]) {
                    delete token_meta_map[getTokenMetaUniqueChainID(t)]
                }
                token_meta_map[t.id] = t
            })
            return token_meta_map;

        }
    },
    actions: {
        async loadArchiveTokenMetas(wallet_address: string) {
            await getTokenMetaListByWalletAddressWithListener(wallet_address, (token_metas) => {
                this.archive_token_meta_list = token_metas;
            })
        },
        async loadOpenseaMintedTokenMetas(wallet_address: string) {
            await loadTokensCreatedByAddress(wallet_address).then(tokens => {
                this.opensea_minted_token_meta_list = tokens;
            })
        },
        async loadOpenseaWalletTokenMetas(wallet_address: string) {
            await loadTokensByAccountID(wallet_address).then(tokens => {
                this.opensea_wallet_token_meta_list = tokens;
            })
        }
    }
})

const convertOpenseaToTokenMeta = (o: OpenseaToken): FirestoreDocument<TokenMeta> => {
    return {
        id: getUniqueOpenseaID(o),
        entity: {
            name: o.name,
            artist: o.creator?.user?.username || "N/A",
            description: o.description,
            public_link: o.permalink,
            blockchain: Blockchain.Ethereum,
            asset_contract_address: o.asset_contract.address,
            token_id: o.token_id,
            platform: TokenPlatform.Opensea,
            thumbnail_url: o.image_thumbnail_url,
            media_url: o.animation_url ? o.animation_url : o.image_url,
        }
    } as FirestoreDocument<TokenMeta>
}