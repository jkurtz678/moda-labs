
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
        }
    },
    actions: {
        async loadGalleryList(user_id: string) {
            const account_store = useAccountStore();
            if(account_store.is_user_admin) {
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