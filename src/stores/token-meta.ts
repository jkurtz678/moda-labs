import { defineStore } from "pinia";
import type { FirestoreDocument, TokenMeta } from "@/types/types"
import { } from "@/api/token-meta";
export type RootTokenMetaState = {
    token_metas: FirestoreDocument<TokenMeta>[]
}
export const useTokenMetaStore = defineStore({
    id: 'token-meta',
    state: () => ({
        token_metas: [],
    } as RootTokenMetaState),
    /* actions: {
        async loadPlaques(account_id: string) {
            await getPlaquesByAccountIDWithListener(account_id, (plaques) => {
                this.plaques = plaques;
            })
        }
    } */
})