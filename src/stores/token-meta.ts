import { defineStore } from "pinia";
import type { FirestoreDocument, OpenseaToken, TokenMeta } from "@/types/types"
import { getTokenMetaListByIDListWithListener } from "@/api/token-meta";
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
        token_meta_map: (state): TokenMetaMap => {
            const token_meta_map: TokenMetaMap = {};
            state.archive_token_meta_list.forEach((m) => {
                token_meta_map[m.id] = m;
            });
            return token_meta_map;
        }
    },
    actions: {
        async loadArchiveTokenMetas(token_meta_ids: string[]) {
            await getTokenMetaListByIDListWithListener(token_meta_ids, (token_metas) => {
                this.archive_token_meta_list = token_metas;
            })
        },
        async loadOpenseaTokenMetas(address: string) {
            await loadTokensByAccountID(address).then(tokens => {
                this.opensea_token_meta_list = tokens;
            })
        }
    }
})