
import { defineStore } from "pinia";
import type { FirestoreDocument, Gallery, GalleryPlaque, GalleryTokenMeta, GalleryUser } from "@/types/types"
import { getGalleryUserListByUserID } from "@/api/gallery-user";
import { getAllGalleries } from "@/api/gallery";
import { useAccountStore } from "./account";

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
            return Array<string>().concat.apply(Array<string>(), state.gallery_user_list.map(g => g.entity.user_id));
        },
        gallery_map: (state): Map<string, FirestoreDocument<Gallery>> => {
            const map = new Map<string, FirestoreDocument<Gallery>>();
            state.gallery_list.forEach((g) => {
                map.set(g.id, g);
            });
            return map;
        },
        token_id_to_gallery_map(state): Map<string, FirestoreDocument<Gallery>[]> {

            // map has a key of token_meta_id and value of a list of galleries
            const map = new Map<string, FirestoreDocument<Gallery>[]>();
            state.gallery_token_meta_list.forEach((gtm) => {
                const token_meta_id = gtm.entity.token_meta_id
                const gallery = this.gallery_map.get(gtm.entity.gallery_id);
                
                if(!gallery) {
                    console.error(`gallery not found for gallery_token_meta ${gtm.id}`)
                    return
                }

                if (map.has(token_meta_id)) {
                    map.get(token_meta_id)?.push(gallery);
                } else {
                    map.set(token_meta_id, [gallery]);
                }
            });
            return map;
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