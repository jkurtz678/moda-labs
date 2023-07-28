
import { defineStore } from "pinia";
import type { FirestoreDocument, Gallery, GalleryPlaque, GalleryTokenMeta, GalleryUser } from "@/types/types"
import { getGalleriesForUserIDWithListener } from "@/api/gallery";
import { getGalleryUserListByUserID } from "@/api/gallery-user";

export type RootGalleryState = {
    gallery_list: FirestoreDocument<Gallery>[];
    gallery_user_list: FirestoreDocument<GalleryUser>[];
    gallery_plaque_list: FirestoreDocument<GalleryPlaque>[];
    gallery_token_meta_list: FirestoreDocument<GalleryTokenMeta>[];
}
export const useGalleryStore = defineStore({
    id: "gallery",
    state: () => ({
        gallery_list: [],
        gallery_user_list: [],
        gallery_plaque_list: [],
        gallery_token_meta_list: [],
    } as RootGalleryState),
    getters: {
        get_user_id_list_for_galleries: (state): string[] => {
            return Array<string>().concat.apply(Array<string>(), state.gallery_list.map(g => g.entity.user_id_list));
        }
    },
    actions: {
        async loadGalleryList(user_id: string) {
            getGalleryUserListByUserID(user_id)
                .then((gallery_user_list) => {
                    this.gallery_user_list = gallery_user_list;
                    const promise_list = [];
                    const gallery_id_list = gallery_user_list.map(g => g.entity.gallery_id);

                    
                })
            // return new Promise(resolve => {
            //     return getGalleriesForUserIDWithListener(user_id, (gallery_list) => {
            //         this.gallery_list = gallery_list.map;
            //         resolve(null);
            //     });
            // })

        }
    }
})