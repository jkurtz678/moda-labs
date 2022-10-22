
import { defineStore } from "pinia";
import type { FirestoreDocument, Gallery} from "@/types/types"
import { getGalleriesForUserID } from "@/api/gallery";

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
            this.gallery_list = await getGalleriesForUserID(user_id)
        }
    }
})