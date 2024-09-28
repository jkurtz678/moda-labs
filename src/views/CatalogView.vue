<template>
    <div class="container">
        <h2>Artwork On Sale</h2>
        <el-table :data="table_items" style="width: 100%">
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="artist" label="Artist" width="180" />
            <el-table-column prop="price" label="Price" />
            <el-table-column prop="price_unit" label="Price Unit" />
        </el-table>
    </div>
</template>
<script lang="ts" setup>
import { getAllTokenMetasOnSaleWithListener } from '@/api/token-meta';
import type { FirestoreDocument, TokenMeta } from '@/types/types';
import { showError } from '@/util/util';
import { computed, onMounted, ref } from 'vue';

const token_metas = ref<FirestoreDocument<TokenMeta>[]>([]);

    const table_items = computed(() => {
        return token_metas.value.map((token_meta) => {
            return {
                name: token_meta.entity.name,
                artist: token_meta.entity.artist,
                price: token_meta.entity.price,
                price_unit: token_meta.entity.price_unit,
            }
        })
    })

onMounted(async () => {
    getAllTokenMetasOnSaleWithListener((r) => {
        console.log("R", r)
        token_metas.value = r
    }).catch((err) => {
        showError(`Error fetching token metas: ${err}`);
    });
});
</script>

<style>
.container {
    max-width: 800px;
    padding: 20px;
    margin: 0 auto;
}
</style>