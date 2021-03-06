
import { defineStore } from "pinia";
import type { FirestoreDocument, Gallery} from "@/types/types"
import { getGalleriesForAddress } from "@/api/gallery";

export type RootGalleryState = {
    gallery_list: FirestoreDocument<Gallery>[];
}
export const useGalleryStore = defineStore({
    id: "gallery",
    state: () => ({
        gallery_list: [],
    } as RootGalleryState),
    getters: {
        get_address_list_for_galleries: (state): string[] => {
            return Array<string>().concat.apply(Array<string>(), state.gallery_list.map(g => g.entity.wallet_address_list));
        }
    },
    actions: {
        async loadGalleryList(wallet_address: string) {
            this.gallery_list = await getGalleriesForAddress(wallet_address)
        }
    }
})