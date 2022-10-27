
import { defineStore } from "pinia";
import type { FirestoreDocument, Gallery } from "@/types/types"
import { getGalleriesForUserIDWithListener } from "@/api/gallery";

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
            return new Promise(resolve => {
                return getGalleriesForUserIDWithListener(user_id, (gallery_list) => {
                    this.gallery_list = gallery_list;
                    resolve(null);
                });
            })

        }
    }
})