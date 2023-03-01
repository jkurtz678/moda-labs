import { defineStore } from "pinia";
import { type FirestoreDocument, type OpenseaToken, type TokenMeta, Blockchain, TokenPlatform, type Gallery } from "@/types/types"
import { getUniqueOpenseaID, getTokenMetaUniqueChainID } from "@/types/types"

import { getAllTokenMetasWithListener, getTokenMetaListByIDList, getTokenMetaListByUserIDWithListener } from "@/api/token-meta";
import { loadTokensByAccountID, loadTokensCreatedByAddress } from "@/api/opensea";
import { getAdminUserIDList } from "@/util/util";
import { useAccountStore } from "./account";
import type { Firestore } from "firebase/firestore";

export type RootTokenMetaState = {
    archive_token_meta_list: FirestoreDocument<TokenMeta>[];
    opensea_minted_token_meta_list: OpenseaToken[];
    opensea_wallet_token_meta_list: OpenseaToken[];
    gallery_token_meta_list: FirestoreDocument<TokenMeta>[];
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
        gallery_token_meta_list: [],
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
            const opensea_tokens = [...state.opensea_minted_token_meta_list, ...state.opensea_wallet_token_meta_list]
            opensea_tokens.forEach((o) => {
                const meta = convertOpenseaToTokenMeta(o)
                token_meta_map[meta.id] = meta
            })

            // add archive tokens
            state.archive_token_meta_list.forEach((t) => {
                // if archive tokens contain matching token_id/asset_contract_address pair to opensea tokens, remove
                if (token_meta_map[getTokenMetaUniqueChainID(t)]) {
                    delete token_meta_map[getTokenMetaUniqueChainID(t)]
                }
                token_meta_map[t.id] = t
            })  
            // add gallery tokens
            state.gallery_token_meta_list.forEach((t) => {
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
        async loadOpenseaMintedTokenMetas(user_id: string) {
            await loadTokensCreatedByAddress(user_id).then(tokens => {
                this.opensea_minted_token_meta_list = tokens;
            })
        },
        async loadOpenseaWalletTokenMetas(user_id: string) {
            await loadTokensByAccountID(user_id).then(tokens => {
                this.opensea_wallet_token_meta_list = tokens;
            })
        },
        async loadGalleryTokenMetas(gallery_list: FirestoreDocument<Gallery>[]) {
            const token_meta_id_list: string[] = [];
            gallery_list.forEach(g => {
                token_meta_id_list.push(...g.entity.token_meta_id_list);
            })
            // getTokenMetaListByIDList in increments of 10 
            const token_meta_list: FirestoreDocument<TokenMeta>[] = [];
            for (let i = 0; i < token_meta_id_list.length; i += 10) {
                const token_meta_list_chunk = await getTokenMetaListByIDList(token_meta_id_list.slice(i, i + 10));
                token_meta_list.push(...token_meta_list_chunk);
            }
            this.gallery_token_meta_list = token_meta_list;
        },
    }
})

const convertOpenseaToTokenMeta = (o: OpenseaToken): FirestoreDocument<TokenMeta> => {
    return {
        id: getUniqueOpenseaID(o),
        entity: {
            name: o.name,
            artist: o.creator?.user?.username || "N/A",
            description: o.description,
            public_link: o.permalink,
            blockchain: Blockchain.Ethereum,
            asset_contract_address: o.asset_contract.address,
            token_id: o.token_id,
            platform: TokenPlatform.Opensea,
            external_thumbnail_url: o.image_thumbnail_url,
            external_media_url: o.animation_url ? o.animation_url : o.image_url,
        }
    } as FirestoreDocument<TokenMeta>
}