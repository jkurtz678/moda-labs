<template>
    <div class="container">
        <h2>{{ `Artwork On Sale (${table_items.length} total)` }}</h2>
        <el-table height="350" :data="table_items" style="width: 100%; overflow-y: auto;">
            <el-table-column prop="artist" label="Artist" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="price" label="Price" width="100" />
            <el-table-column prop="price_unit" label="Price Unit" width="100" />
        </el-table>

        <h2 style="padding-top: 20px;">{{ `All Bids (${bid_table_items.length} total)` }}</h2>
        <el-table height="350" :data="bid_table_items" style="width: 100%; overflow-y: auto;">
            <el-table-column prop="bidding_name" label="Name" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="phone_number" label="Phone Number" />
            <el-table-column prop="amount" label="Amount" />
            <el-table-column prop="amount_unit" label="Unit" />
            <el-table-column prop="artist_name" label="Artist Name" />
            <el-table-column prop="artwork_name" label="Artwork Name" />
        </el-table>
    </div>
</template>
<script lang="ts" setup>
import { getAllBidsWithListener } from '@/api/bid';
import { getAllTokenMetasOnSaleWithListener } from '@/api/token-meta';
import type { Bid, FirestoreDocument, TokenMeta } from '@/types/types';
import { showError } from '@/util/util';
import { computed, onMounted, ref } from 'vue';

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
            if (!a?.artwork_name|| !b?.artwork_name) {
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
    max-width: 900px;
    padding: 20px;
    margin: 0 auto;
}
</style>