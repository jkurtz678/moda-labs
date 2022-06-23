import { defineStore } from "pinia";
import type { FirestoreDocument, Plaque } from "@/types/types"
import { getPlaquesByWalletAddressWithListener, getPlaquesByWalletAddressListWithListener } from "@/api/plaque";
import { useAccountStore } from "./account";
import { useGalleryStore } from "./gallery";

import { getAdminWalletAddressList } from "@/util/util";

export type RootPlaqueState = {
    plaques: FirestoreDocument<Plaque>[],
}
interface PlaqueMap {
    [id: string]: FirestoreDocument<Plaque>;
}
export const usePlaqueStore = defineStore({
    id: 'plaque',
    state: () => ({
        plaques: [],
    } as RootPlaqueState),
    getters: {
        plaque_map: (state): PlaqueMap => {
            const plaque_map: PlaqueMap = {};
            state.plaques.forEach((p) => {
                plaque_map[p.id] = p;
            });
            return plaque_map;
        },
        meta_in_playlist: (getters: any) => (plaque_id: string, token_meta_id: string): boolean => {
            const plaque: FirestoreDocument<Plaque> = getters.plaque_map[plaque_id]
            return plaque.entity.token_meta_id_list.some(id => id == token_meta_id);
        },
        token_meta_id_list: (state): string[] => {
            let token_meta_id_list: string[] = [];
            state.plaques.forEach(p => {
                token_meta_id_list.push(...p.entity.token_meta_id_list);
            })
            return token_meta_id_list;
        }
    },
    actions: {
        async loadPlaques(wallet_address: string) {
            const account_store = useAccountStore();
            const gallery_store = useGalleryStore();
            if (gallery_store.gallery_list.length > 0) {
                await getPlaquesByWalletAddressListWithListener(gallery_store.get_address_list_for_galleries, (plaques) => {
                    // fix null token meta id list
                    for (let i = 0; i < plaques.length; i++) {
                        if (plaques[i].entity.token_meta_id_list == null) {
                            plaques[i].entity.token_meta_id_list = [];
                        }
                    }
                    this.plaques = plaques;
                })
                return
            }
            await getPlaquesByWalletAddressWithListener(wallet_address, (plaques) => {
                // fix null token meta id list
                for (let i = 0; i < plaques.length; i++) {
                    if (plaques[i].entity.token_meta_id_list == null) {
                        plaques[i].entity.token_meta_id_list = [];
                    }
                }
                this.plaques = plaques;
            })
        }
    }
})