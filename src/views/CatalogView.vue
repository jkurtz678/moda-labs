<template>
    <div style="overflow-y: auto; height: 100%">
        <div class="container">
            <div v-for="artist of artist_list_sorted" :key="artist" style="margin: 24px 0px;">
                <h1 style="font-weight: bold;">{{ artist }}</h1>
                <div style="display: flex; margin: -12px; flex-wrap: wrap;">
                    <CatalogArtTile v-for="t of artist_to_token_list_map[artist]" :token_meta="t">
                    </CatalogArtTile>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getAllBidsWithListener } from '@/api/bid';
import { getAllTokenMetasOnSaleWithListener } from '@/api/token-meta';
import { priceDisplay, type Bid, type FirestoreDocument, type TokenMeta } from '@/types/types';
import { showError } from '@/util/util';
import { computed, onMounted, ref } from 'vue';
import CatalogArtTile from '@/components/CatalogArtTile.vue';

const token_metas = ref<FirestoreDocument<TokenMeta>[]>([]);
const bids = ref<FirestoreDocument<Bid>[]>([]);

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
    getAllTokenMetasOnSaleWithListener((r) => {
        console.log("R", r)
        token_metas.value = r
    }).catch((err) => {
        showError(`Error fetching token metas: ${err}`);
    });

    getAllBidsWithListener((r) => {
        console.log("bids", r)
        bids.value = r.filter((bid) => {
            return !!bid.entity.amount && bid.entity.amount >= 0;
        });
    }).catch((err) => {
        showError(`Error fetching bids: ${err}`);
    });
});
</script>

<style>
.container {
    max-width: 1250px;
    padding: 20px;
    margin: 0 auto;
}
</style>