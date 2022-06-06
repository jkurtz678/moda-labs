import { defineStore } from "pinia";
import type { FirestoreDocument, Plaque } from "@/types/types"
import { getPlaquesByAccountIDWithListener } from "@/api/plaque";

export type RootPlaqueState = {
    plaques: FirestoreDocument<Plaque>[]
}
export const usePlaqueStore = defineStore({
    id: 'plaque',
    state: () => ({
        plaques: [],
    } as RootPlaqueState),
    getters: {
        token_meta_id_list: (state): string[] => {
            let token_meta_id_list: string[] = [];
            state.plaques.forEach( p => {
                token_meta_id_list = token_meta_id_list.concat(p.entity.token_meta_id_list);
            })
            return token_meta_id_list;
        }
    },
    actions: {
        async loadPlaques(account_id: string) {
            await getPlaquesByAccountIDWithListener(account_id, (plaques) => {
                this.plaques = plaques;
            })
        }
    }
})