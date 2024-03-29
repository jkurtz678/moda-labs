
import { defineStore } from "pinia";
import type { FirestoreDocument, Gallery, GalleryPlaque, GalleryTokenMeta, GalleryUser } from "@/types/types"
import { getGalleryUserListByGalleryIDList, getGalleryUserListByUserID } from "@/api/gallery-user";
import { getAllGalleries, getGalleryListByGalleryIDList } from "@/api/gallery";
import { useAccountStore } from "./account";
import { showError } from "@/util/util";
import { getGalleryPlaqueListByGalleryIDList } from "@/api/gallery-plaque";
import { getGalleryTokenMetaListByGalleryIDList } from "@/api/gallery-token";

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
        gallery_token_metas_id_list: (state): string[] => {
            return state.gallery_token_meta_list.map(gtm => gtm.entity.token_meta_id);
        },
        gallery_user_id_map: (state): Map<string, string[]> => {
            const map = new Map<string, string[]>();
            state.gallery_user_list.forEach((gu) => {
                const gallery_id = gu.entity.gallery_id
                const user_id = gu.entity.user_id
                if (map.has(gallery_id)) {
                    map.get(gallery_id)?.push(user_id);
                } else {
                    map.set(gallery_id, [user_id]);
                }
            });
            return map;
        },
        gallery_plaque_id_map: (state): Map<string, string[]> => {
            const map = new Map<string, string[]>();
            state.gallery_plaque_list.forEach((gp) => {
                const gallery_id = gp.entity.gallery_id
                const plaque_id = gp.entity.plaque_id
                if (map.has(gallery_id)) {
                    map.get(gallery_id)?.push(plaque_id);
                } else {
                    map.set(gallery_id, [plaque_id]);
                }
            });
            return map;
        },
        // map with the key as the gallery_id and the value as a list of token_meta_ids
        gallery_token_meta_id_map: (state): Map<string, string[]> => {
            const map = new Map<string, string[]>();
            state.gallery_token_meta_list.forEach((gtm) => {
                const token_meta_id = gtm.entity.token_meta_id
                const gallery_id = gtm.entity.gallery_id
                if (map.has(gallery_id)) {
                    map.get(gallery_id)?.push(token_meta_id);
                } else {
                    map.set(gallery_id, [token_meta_id]);
                }
            });
            return map;
        },
        // // map with the key as the gallery_id and the value as a set of token_meta_ids
        // gallery_id_to_token_meta_set: (state): Map<string, Set<string>> => {
        //     console.log("BUILDING TOKEN META SET")
        //     const map_to_set = new Map<string, Set<string>>();
        //     state.gallery_token_meta_list.forEach((gtm) => {
        //         const token_meta_id = gtm.entity.token_meta_id
        //         const gallery_id = gtm.entity.gallery_id
        //         if(map_to_set.has(gallery_id)){
        //             map_to_set.get(gallery_id)?.add(token_meta_id);
        //         } else {
        //             map_to_set.set(gallery_id, new Set<string>());
        //         }
        //     })
        //     return map_to_set;
        // },
        token_id_to_gallery_map(state): Map<string, FirestoreDocument<Gallery>[]> {

            // map has a key of token_meta_id and value of a list of galleries
            const map = new Map<string, FirestoreDocument<Gallery>[]>();
            state.gallery_token_meta_list.forEach((gtm) => {
                const token_meta_id = gtm.entity.token_meta_id
                const gallery = this.gallery_map.get(gtm.entity.gallery_id);

                if (!gallery) {
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
        // loadGalleryList will load all the users galleries and their associated joins
        async loadGalleryList(user_id: string) {
            return getGalleryUserListByUserID(user_id)
                .then(async (gallery_user_list_for_user) => {
                    console.log("done loading gallery users", gallery_user_list_for_user);
                    const gallery_id_list = gallery_user_list_for_user.map(g => g.entity.gallery_id);
                    const batch_size = 10;

                    const gallery_promise_id_list = [];
                    for (let i = 0; i < gallery_id_list.length; i += batch_size) {
                        const gallery_id_batch = gallery_id_list.slice(i, i + batch_size);
                        gallery_promise_id_list.push(getGalleryListByGalleryIDList(gallery_id_batch));
                    }
                    const gallery_promise = Promise.all(gallery_promise_id_list).then((gallery_resp_list) => {
                        this.gallery_list = Array<FirestoreDocument<Gallery>>().concat.apply(Array<FirestoreDocument<Gallery>>(), gallery_resp_list);
                    }).catch(err => (showError(`error loading gallery names: ${err}`)))

                    // load gallery users
                    const gallery_user_promise_list = [];
                    for (let i = 0; i < gallery_id_list.length; i += batch_size) {
                        const gallery_id_batch = gallery_id_list.slice(i, i + batch_size);
                        gallery_user_promise_list.push(getGalleryUserListByGalleryIDList(gallery_id_batch));
                    }
                    const gallery_user_promise = Promise.all(gallery_user_promise_list).then((gallery_user_resp_list) => {
                        this.gallery_user_list = Array<FirestoreDocument<GalleryUser>>()
                            .concat.apply(Array<FirestoreDocument<GalleryUser>>(), gallery_user_resp_list);
                    }).catch(err => (showError(`error loading gallery users: ${err}`)))

                    // call getGalleryPlaqueListByGalleryIDList in parallel batches of 10
                    const gallery_plaque_promise_list = [];
                    for (let i = 0; i < gallery_id_list.length; i += batch_size) {
                        const gallery_id_batch = gallery_id_list.slice(i, i + batch_size);
                        gallery_plaque_promise_list.push(getGalleryPlaqueListByGalleryIDList(gallery_id_batch));
                    }
                    const gallery_plaque_promise = Promise.all(gallery_plaque_promise_list).then((gallery_plaque_resp_list) => {
                        this.gallery_plaque_list = Array<FirestoreDocument<GalleryPlaque>>().concat.apply(Array<FirestoreDocument<GalleryPlaque>>(), gallery_plaque_resp_list);
                    }).catch(err => (showError(`error loading gallery plaques: ${err}`)));

                    // load gallery token metas
                    const gallery_token_meta_promise_list = [];
                    for (let i = 0; i < gallery_id_list.length; i += batch_size) {
                        const gallery_id_batch = gallery_id_list.slice(i, i + batch_size);
                        gallery_token_meta_promise_list.push(getGalleryTokenMetaListByGalleryIDList(gallery_id_batch));
                    }
                    const gallery_token_meta_promise = Promise.all(gallery_token_meta_promise_list).then((gallery_token_meta_resp_list) => {
                        this.gallery_token_meta_list = Array<FirestoreDocument<GalleryTokenMeta>>().concat.apply(Array<FirestoreDocument<GalleryTokenMeta>>(), gallery_token_meta_resp_list);
                    }).catch(err => (showError(`error loading gallery token metas: ${err}`)));

                    await Promise.all([gallery_promise, gallery_user_promise, gallery_plaque_promise, gallery_token_meta_promise]);

                })
            // return new Promise(resolve => {
            //     return getGalleriesForUserIDWithListener(user_id, (gallery_list) => {
            //         this.gallery_list = gallery_list.map;
            //         resolve(null);
            //     });
            // })

        },
        addGalleryToStore(gallery: FirestoreDocument<Gallery>, gallery_user_list: FirestoreDocument<GalleryUser>[], gallery_plaque_list: FirestoreDocument<GalleryPlaque>[], gallery_token_meta_list: FirestoreDocument<GalleryTokenMeta>[]) {
            console.log("adding gallery to store", gallery, gallery_user_list, gallery_plaque_list, gallery_token_meta_list);
            // replace all associated records with given records
            this.gallery_list = this.gallery_list.filter(g => g.id !== gallery.id).concat(gallery);
            this.gallery_user_list = this.gallery_user_list.filter(gu => gu.entity.gallery_id !== gallery.id).concat(gallery_user_list);
            this.gallery_plaque_list = this.gallery_plaque_list.filter(gp => gp.entity.gallery_id !== gallery.id).concat(gallery_plaque_list);
            this.gallery_token_meta_list = this.gallery_token_meta_list.filter(gtm => gtm.entity.gallery_id !== gallery.id).concat(gallery_token_meta_list);
        }
    }
})