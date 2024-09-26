import { defineStore } from "pinia";
import { type FirestoreDocument, type OpenseaToken, type TokenMeta, Blockchain, TokenPlatform, type Gallery, type GalleryTokenMeta } from "@/types/types"
import { getUniqueOpenseaID, getTokenMetaUniqueChainID } from "@/types/types"

import { getAllTokenMetasWithListener, getTokenMetaListByIDList, getTokenMetaListByUserIDWithListener } from "@/api/token-meta";
import { loadTokensByAccountID, loadTokensCreatedByAddress } from "@/api/opensea";
import { getAdminUserIDList } from "@/util/util";
import { useAccountStore } from "./account";
import type { Firestore } from "firebase/firestore";
import { convertOpenseaToTokenMeta } from "./util";

export type RootTokenMetaState = {
    archive_token_meta_list: FirestoreDocument<TokenMeta>[];
    opensea_minted_token_meta_list: OpenseaToken[];
    opensea_wallet_token_meta_list: OpenseaToken[];
    opensea_converted_tokens: FirestoreDocument<TokenMeta>[];
    gallery_token_meta_list: FirestoreDocument<TokenMeta>[];
    demo_token_meta_list: FirestoreDocument<TokenMeta>[];
}
interface TokenMetaMap {
    [id: string]: FirestoreDocument<TokenMeta>;
}
export const useTokenMetaStore = defineStore({
    id: 'token-meta',
    state: () => ({
        archive_token_meta_list: [],
        opensea_minted_token_meta_list: [],
        opensea_wallet_token_meta_list: [],
        opensea_converted_tokens: [],
        gallery_token_meta_list: [],
        demo_token_meta_list: [],
    } as RootTokenMetaState),
    getters: {
        archive_token_meta_map: (state): TokenMetaMap => {
            const token_meta_map: TokenMetaMap = {};
            state.archive_token_meta_list.forEach((m) => {
                token_meta_map[m.id] = m;
            });
            return token_meta_map;
        },
        all_token_metas(state): TokenMetaMap {
            const token_meta_map: TokenMetaMap = {};

            // add wallet and minted tokens together in one map, which will remove duplicates
            // const opensea_tokens = [...state.opensea_minted_token_meta_list, ...state.opensea_wallet_token_meta_list]
            // opensea_tokens.forEach((o) => {
            //     const meta = convertOpenseaToTokenMeta(o)
            //     token_meta_map[meta.id] = meta
            // })
            state.opensea_converted_tokens.forEach((t) => {
                token_meta_map[t.id] = t
            })

            // add archive tokens
            state.archive_token_meta_list.forEach((t) => {
                // if archive tokens contain matching token_id/asset_contract_address pair to opensea tokens, remove
                if (token_meta_map[getTokenMetaUniqueChainID(t)]) {
                    delete token_meta_map[getTokenMetaUniqueChainID(t)]
                    const opensea_archive_token = {id: t.id, entity: {...t.entity}};
                    opensea_archive_token.entity.platform = TokenPlatform.OpenseaArchive
                    token_meta_map[opensea_archive_token.id] = opensea_archive_token;
                    return
                }
                token_meta_map[t.id] = t
            })  
            // add gallery tokens
            state.gallery_token_meta_list.forEach((t) => {
                token_meta_map[t.id] = t
            })

            // add demo tokens
            state.demo_token_meta_list.forEach((t) => {
                token_meta_map[t.id] = t
            })

            return token_meta_map;
        },
        sorted_all_token_metas(state): FirestoreDocument<TokenMeta>[] {
            const token_metas: FirestoreDocument<TokenMeta>[] = JSON.parse(JSON.stringify(Object.values(this.all_token_metas)));
            return token_metas.sort((a, b) => {
                const text_a = a.entity.artist?.toLowerCase()+a.entity.name.toLowerCase()
                const text_b = b.entity.artist?.toLowerCase()+b.entity.name.toLowerCase()
                return (text_a < text_b) ? -1 : (text_a > text_b) ? 1 : 0;
            })
        }
    },
    actions: {
        async loadArchiveTokenMetas(user_id: string) {
            // admins see all tokens
            const account_store = useAccountStore();
            if(account_store.is_user_admin) {
                await getAllTokenMetasWithListener((token_metas) => {
                    // filter out invalid tokens
                    this.archive_token_meta_list = token_metas.filter(t => t.entity.external_media_url || t.entity.media_id);
                })
                return
            }
            
            // other users only see tokens associated with their user_id
            await getTokenMetaListByUserIDWithListener(user_id, (token_metas) => {
                this.archive_token_meta_list = token_metas;
            })
        },
        async loadOpenseaMintedTokenMetas(wallet_address: string) {
            await loadTokensCreatedByAddress(wallet_address).then(tokens => {
                this.opensea_minted_token_meta_list = tokens;
            })
        },
        async loadOpenseaWalletTokenMetas(wallet_address: string) {
            await loadTokensByAccountID(wallet_address).then(tokens => {
                this.opensea_wallet_token_meta_list = tokens;
            })
        },
        async loadOpenseaConvertedTokens() {
            const token_meta_list: FirestoreDocument<TokenMeta>[] = [];
            const opensea_tokens = [...this.opensea_minted_token_meta_list, ...this.opensea_wallet_token_meta_list];
            const promise_list: Promise<void>[] = [];
            opensea_tokens.forEach((o) => {
                const meta = convertOpenseaToTokenMeta(o)
                token_meta_list.push(meta)
                promise_list.push((async () => {
                    if(!meta.entity.external_media_url) {
                        return
                    }

                    const ratio = await getAspectRatio(meta.entity.external_thumbnail_url || "").catch(err => {
                        console.log(err)
                    })
                    if (!ratio) {
                        return
                    }
                    meta.entity.aspect_ratio = ratio
                })());
            });

            await Promise.all(promise_list);
        
            this.opensea_converted_tokens = token_meta_list;
        },
        async loadGalleryTokenMetas(gallery_token_meta_list: FirestoreDocument<GalleryTokenMeta>[]) {
            const token_meta_id_list: string[] = [];
            gallery_token_meta_list.forEach(g => {
                token_meta_id_list.push(g.entity.token_meta_id);
            })
            // getTokenMetaListByIDList in increments of 10 
            const token_meta_list: FirestoreDocument<TokenMeta>[] = [];
            for (let i = 0; i < token_meta_id_list.length; i += 10) {
                const token_meta_list_chunk = await getTokenMetaListByIDList(token_meta_id_list.slice(i, i + 10));
                token_meta_list.push(...token_meta_list_chunk);
            }
            this.gallery_token_meta_list = token_meta_list;
        },
        async loadDemoTokenMetas() {
            const demo_token_meta_id_list = [
                "D0tO2S6iMjZRvCOp1rRJ", // williamsburg hearts, nate (landscape)
                "RU2HdfpA2stEZ6QvXJcX", // out of sight out of mind, manhattan (square)
            ];

            const token_meta_list = await getTokenMetaListByIDList(demo_token_meta_id_list);

            token_meta_list.forEach((t) => {
                t.entity.platform = TokenPlatform.ArchiveDemo;
            })

            console.log("demo token_meta_list", token_meta_list)

            this.demo_token_meta_list = token_meta_list;
        }
    }
})


const getAspectRatio = (url: string): Promise<number> => {
    const local_storage_key = `${url}_aspect_ratio`
    return new Promise((resolve, reject) => {
        const local_storage_ratio = localStorage.getItem(local_storage_key)
        if (local_storage_ratio) {
            resolve(Number(local_storage_ratio));
            return
        }

        const img = new Image();
        img.onload = () => {
            const aspect_ratio = img.naturalWidth / img.naturalHeight;
            console.log("aspect_ratio for opensea", aspect_ratio, url)
            // save to local storage
            localStorage.setItem(local_storage_key, String(aspect_ratio))

            resolve(aspect_ratio);
        }
        img.onerror = () => {
            reject("Error loading image");
        }
        img.src = url;
    })
}