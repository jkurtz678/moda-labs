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
    actions: {
        async loadPlaques(account_id: string) {
            await getPlaquesByAccountIDWithListener(account_id, (plaques) => {
                this.plaques = plaques;
            })
        }
    }
})