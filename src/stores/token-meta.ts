import { defineStore } from "pinia";
import { type FirestoreDocument, type OpenseaToken, type TokenMeta, Blockchain, TokenPlatform } from "@/types/types"
import { getUniqueOpenseaID } from "@/types/types"

import { getTokenMetaListByWalletAddressWithListener } from "@/api/token-meta";
import { loadTokensByAccountID } from "@/api/opensea";

export type RootTokenMetaState = {
    archive_token_meta_list: FirestoreDocument<TokenMeta>[];
    opensea_token_meta_list: OpenseaToken[];
}
interface TokenMetaMap {
    [id: string]: FirestoreDocument<TokenMeta>;
}
export const useTokenMetaStore = defineStore({
    id: 'token-meta',
    state: () => ({
        archive_token_meta_list: [],
        opensea_token_meta_list: [],
    } as RootTokenMetaState),
    getters: {
        archive_token_meta_map: (state): TokenMetaMap => {
            const token_meta_map: TokenMetaMap = {};
            state.archive_token_meta_list.forEach((m) => {
                token_meta_map[m.id] = m;
            });
            return token_meta_map;
        },
        opensea_token_meta_map: (state): TokenMetaMap => {
            const token_meta_map: TokenMetaMap = {};
            state.opensea_token_meta_list.forEach((o) => {
                const id = getUniqueOpenseaID(o)
                token_meta_map[id] = {
                    id: id,
                    entity: {
                        name: o.name,
                        artist: o.creator.user.username,
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
            })
            return token_meta_map;
        },
        all_token_metas(): TokenMetaMap {
            return { ...this.archive_token_meta_map, ...this.opensea_token_meta_map };
        }
    },
    actions: {
        async loadArchiveTokenMetas(wallet_address: string) {
            await getTokenMetaListByWalletAddressWithListener(wallet_address, (token_metas) => {
                this.archive_token_meta_list = token_metas;
            })
        },
        async loadOpenseaTokenMetas(wallet_address: string) {
            await loadTokensByAccountID(wallet_address).then(tokens => {
                this.opensea_token_meta_list = tokens;
            })
        }
    }
})