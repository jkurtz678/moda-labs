
import { defineStore } from "pinia";
import type { FirestoreDocument, Gallery } from "@/types/types"
import { getAllGalleries, getGalleriesForUserIDWithListener } from "@/api/gallery";
import { useAccountStore } from "./account";

export type RootGalleryState = {
    gallery_list: FirestoreDocument<Gallery>[];
}
export const useGalleryStore = defineStore({
    id: "gallery",
    state: () => ({
        gallery_list: [],
    } as RootGalleryState),
    getters: {
        get_user_id_list_for_galleries: (state): string[] => {
            return Array<string>().concat.apply(Array<string>(), state.gallery_list.map(g => g.entity.user_id_list));
        },
        token_id_to_gallery_map: (state): Map<string, FirestoreDocument<Gallery>[]> => {

            // map has a key of token_meta_id and value of a list of galleries
            const map = new Map<string, FirestoreDocument<Gallery>[]>();
            state.gallery_list.forEach((g) => {
                g.entity.token_meta_id_list.forEach((token_id) => {
                    if (map.has(token_id)) {
                        map.get(token_id)?.push(g);
                    } else {
                        map.set(token_id, [g]);
                    }
                });
            });
            return map;
        }
    },
    actions: {
        async loadGalleryList(user_id: string) {
            const account_store = useAccountStore();
            if (account_store.is_user_admin) {
                await getAllGalleries().then((gallery_list) => {
                    this.gallery_list = gallery_list;
                })
                return
            }

            return new Promise(resolve => {
                return getGalleriesForUserIDWithListener(user_id, (gallery_list) => {
                    this.gallery_list = gallery_list;
                    resolve(null);
                });
            })

        }
    }
})