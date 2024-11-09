<template>
    <div>
        <h1 style="font-weight: bold; font-size: 2.8em; padding-top: 1.5em;">{{ gallery?.entity.name }}</h1>
        <div style="white-space: pre-wrap;">{{ description }}</div>
        <div v-for="artist of artist_list_sorted" :key="artist" style="margin: 20px 0px;">
            <h1 style="font-weight: bold; font-size: 2.8em; padding: 48px 0px 24px 0px;">{{ artist }}</h1>
            <div style="display: flex; margin: -12px; flex-wrap: wrap;">
                <CatalogArtTile v-for="t of artist_to_token_list_map[artist]" :token_meta="t">
                </CatalogArtTile>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { getAllBidsWithListener } from '@/api/bid';
import { getAllTokenMetasOnSaleWithListener, getTokenMetaListByIDList } from '@/api/token-meta';
import { Gallery, priceDisplay, type Bid, type FirestoreDocument, type TokenMeta } from '@/types/types';
import { showError } from '@/util/util';
import { computed, onMounted, ref } from 'vue';
import CatalogArtTile from '@/components/catalog/CatalogArtTile.vue';
import { useRoute } from 'vue-router';
import { getGalleryTokenMetaByGalleryID } from '@/api/gallery-token';
import { getGalleryByID } from '@/api/gallery';

const route = useRoute();
const gallery_id = route.params.gallery_id

const token_metas = ref<FirestoreDocument<TokenMeta>[]>([]);
const bids = ref<FirestoreDocument<Bid>[]>([]);
const gallery = ref<FirestoreDocument<Gallery>>();
const gallery_desc: Record<string, string> = {
    'XoE4gdUpdZJ5dcdGRHH3': `Presenting “Sequencer :: 002 — MICRO MYTHOLOGIES” a design and media art group exhibition featuring a curation of new media artists exploring generative systems, mythical biology, micro organisms, and unseen or endangered parts of our world. This second edition will feature artists working in: Film, Animation, Light, Generative Art, Projection, Performance, and Time. Hosted at 821 Mateo St, SEQUENCER :: 002 will feature a gallery exhibition and an afterparty featuring Live performances by Spencer Sterling, Ninocence and DJ FUCK.

​Presented by the combined forces at Projekt______, and Optic Nerve.`
}

const description = computed(() => {
    if (!route.params.gallery_id || typeof route.params.gallery_id !== "string") {
        console.log("failed to get gallery id from params")
        return
    }

    return gallery_desc[route.params.gallery_id];
})

const table_items = computed(() => {
    return token_metas.value
        .map((token_meta) => {
            return {
                name: token_meta.entity.name,
                artist: token_meta.entity.artist,
                price: token_meta.entity.price,
                price_unit: token_meta.entity.price_unit,
            }
        })
        .sort((a, b) => {
            if (!a?.artist || !b?.artist) {
                return 0
            }
            return a.artist.localeCompare(b.artist)
        });
})

const artist_list_sorted = computed(() => {


    return Array.from(new Set(token_metas.value.map((token_meta) => token_meta.entity.artist || "")))
        .sort((a, b) => a.localeCompare(b));
})

const artist_to_token_list_map = computed(() => {
    return token_metas.value.reduce((acc, token_meta) => {
        if (!token_meta.entity.artist) {
            return acc
        }

        if (!acc[token_meta.entity.artist]) {
            acc[token_meta.entity.artist] = [];
        }
        acc[token_meta.entity.artist].push(token_meta);
        return acc;
    }, {} as Record<string, FirestoreDocument<TokenMeta>[]>);
})

const token_meta_map = computed(() => {
    return token_metas.value.reduce((acc, token_meta) => {
        acc[token_meta.id] = token_meta;
        return acc;
    }, {} as Record<string, FirestoreDocument<TokenMeta>>);
});

const bid_table_items = computed(() => {
    return bids.value
        .map((bid) => {
            const token_meta = token_meta_map.value[bid.entity.token_meta_id]

            return {
                bidding_name: bid.entity.bidding_name,
                email: bid.entity.email,
                phone_number: bid.entity.phone_number,
                amount: bid.entity.amount,
                amount_unit: bid.entity.amount_unit,
                artist_name: token_meta?.entity?.artist,
                artwork_name: token_meta?.entity?.name,
            }
        })
        .sort((a, b) => {
            if (!a?.artwork_name || !b?.artwork_name) {
                return 0
            }
            return a.artwork_name.localeCompare(b.artwork_name)
        });
})

onMounted(async () => {
    if (!route.params.gallery_id || typeof route.params.gallery_id !== "string") {
        console.log("failed to get gallery id from params")
        return
    }

    getGalleryTokenMetaByGalleryID(route.params.gallery_id).then((gallery_token_metas) => {
        const token_meta_ids = gallery_token_metas.map((gtm) => gtm.entity.token_meta_id);

        return getTokenMetaListByIDList(token_meta_ids).then((metas) => {
            console.log("token_metas", token_metas)
            token_metas.value = metas;
        }).catch((err) => {
            showError(`Error fetching token metas: ${err}`);
        });

    }).catch((err) => {
        showError(`Error fetching token metas: ${err}`);
    });

    getGalleryByID(route.params.gallery_id).then((g) => {
        console.log("gallery", g)
        gallery.value = g
    }).catch((err) => {
        showError(`Error fetching gallery: ${err}`);
    });

    // getAllBidsWithListener((r) => {
    //     console.log("bids", r)
    //     bids.value = r.filter((bid) => {
    //         return !!bid.entity.amount && bid.entity.amount >= 0;
    //     });
    // }).catch((err) => {
    //     showError(`Error fetching bids: ${err}`);
    // });
});
</script>
