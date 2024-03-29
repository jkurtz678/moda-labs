import { defineStore } from "pinia";
import type { FirestoreDocument, Gallery, GalleryPlaque, Plaque, PlaqueLocalMedia } from "@/types/types"
import { getPlaquesByUserIDWithListener, getAllPlaquesWithListener, getPlaquesByPlaqueIDList } from "@/api/plaque";
import { useAccountStore } from "./account";
import { useGalleryStore } from "./gallery";


export type RootPlaqueState = {
    plaque_list: FirestoreDocument<Plaque>[], // plaques associated with users
    gallery_plaque_list: FirestoreDocument<Plaque>[], // plaques that are in galleries
}
interface PlaqueMap {
    [id: string]: FirestoreDocument<Plaque>;
}
interface PlaqueMediaMap {
    [id: string]: {[file_name: string]: PlaqueLocalMedia};
}
export const usePlaqueStore = defineStore({
    id: 'plaque',
    state: () => ({
        plaque_list: [],
        gallery_plaque_list: [],
    } as RootPlaqueState),
    getters: {
        all_plaque_list(state): FirestoreDocument<Plaque>[] {
            return Object.values(this.plaque_map)
        },
        plaque_map(state): PlaqueMap {
            const plaque_map: PlaqueMap = {};
            state.plaque_list.forEach((p: FirestoreDocument<Plaque>) => {
                plaque_map[p.id] = p;
            });
            state.gallery_plaque_list.forEach((p: FirestoreDocument<Plaque>) => {
                plaque_map[p.id] = p;
            });
            return plaque_map;
        },
        plaque_media_map(state): PlaqueMediaMap {
            const plaque_media_map: PlaqueMediaMap = {};
            this.all_plaque_list.forEach((p: FirestoreDocument<Plaque>) => {
                plaque_media_map[p.id] = {};

                if(!p.entity.local_media_list) {
                    return;
                }

                p.entity.local_media_list.forEach((m: PlaqueLocalMedia) => {
                    plaque_media_map[p.id][m.file_name] = m;
                });
            });
            return plaque_media_map
        },
        meta_in_playlist(): (plaque_id: string, token_meta_id: string) => boolean {
            return (plaque_id, token_meta_id) => {
                const plaque: FirestoreDocument<Plaque> = this.plaque_map[plaque_id]
                return plaque.entity.token_meta_id_list.some(id => id == token_meta_id);
            }
        },
        token_meta_id_list(): string[] {
            let token_meta_id_list: string[] = [];
            this.all_plaque_list.forEach(p => {
                token_meta_id_list.push(...p.entity.token_meta_id_list);
            })
            return token_meta_id_list;
        }
    },
    actions: {
        async loadPlaques(user_id: string) {
            const account_store = useAccountStore();
            if (account_store.is_user_admin) {
                await getAllPlaquesWithListener((plaques) => {
                    // fix null token meta id list
                    for (let i = 0; i < plaques.length; i++) {
                        if (plaques[i].entity.token_meta_id_list == null) {
                            plaques[i].entity.token_meta_id_list = [];
                        }
                    }
                    this.plaque_list = plaques;
                })
                return;
            }
            await getPlaquesByUserIDWithListener(user_id, (plaques) => {
                // fix null token meta id list
                for (let i = 0; i < plaques.length; i++) {
                    if (plaques[i].entity.token_meta_id_list == null) {
                        plaques[i].entity.token_meta_id_list = [];
                    }
                }
                this.plaque_list = plaques;
            })
        },
        async loadGalleryPlaques(gallery_plaque_list: FirestoreDocument<GalleryPlaque>[]) {
            const plaque_id_list: string[] = [];
            gallery_plaque_list.forEach(g => {
                plaque_id_list.push(g.entity.plaque_id);
            });

            console.log("plaque_id_list", plaque_id_list); // TODO: remove")

            const plaque_list: FirestoreDocument<Plaque>[] = [];
            for (let i = 0; i < plaque_id_list.length; i += 10) {
                // get plaque chunks in chunks of 10
                const plaque_list_chunk = await getPlaquesByPlaqueIDList(plaque_id_list.slice(i, i + 10));
                plaque_list.push(...plaque_list_chunk);
            }
            this.gallery_plaque_list = plaque_list;
        }
    }
})