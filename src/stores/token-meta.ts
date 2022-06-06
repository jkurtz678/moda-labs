import { defineStore } from "pinia";
import type { FirestoreDocument, TokenMeta } from "@/types/types"
import { getTokenMetaListByIDListWithListener } from "@/api/token-meta";
export type RootTokenMetaState = {
    token_meta_list: FirestoreDocument<TokenMeta>[]
}
interface TokenMetaMap {
    [id: string]: FirestoreDocument<TokenMeta>;
}
export const useTokenMetaStore = defineStore({
    id: 'token-meta',
    state: () => ({
        token_meta_list: [],
    } as RootTokenMetaState),
    getters: {
        token_meta_map: (state): TokenMetaMap => {
            const token_meta_map: TokenMetaMap = {};
            state.token_meta_list.forEach((m) => {
                token_meta_map[m.id] = m;
            });
            return token_meta_map;
        }
    },
    actions: {
        async loadTokenMetas(token_meta_ids: string[]) {
            await getTokenMetaListByIDListWithListener(token_meta_ids, (token_metas) => {
                this.token_meta_list = token_metas;
            })
        }
    }
})