<template>
    <vue-masonry-wall :items="paginated_tokens" :column-width="220" :gap="16">
        <template v-slot:default="{ item }">
            <ArtworkTile :token_meta="item">
            </ArtworkTile>
        </template>
    </vue-masonry-wall>
    <div class="tile-grid">

    </div>
</template>

<script setup lang="ts">
import VueMasonryWall from "@yeger/vue-masonry-wall";
import ArtworkTile from "./ArtworkTile.vue"
import { useTokenMetaStore } from '@/stores/token-meta';
import { computed, ref } from 'vue';

const token_meta_store = useTokenMetaStore()
const search_filter = ref("")
const sort_order = ref(localStorage.getItem('token_list_sort_order') || "name")
const limit = ref(1000);


const all_tokens = computed(() => {
    return token_meta_store.sorted_all_token_metas;
})

const filtered_tokens = computed(() => {
    let filtered_tokens = all_tokens.value.filter((token) =>
        token.entity.artist?.toLowerCase().includes(search_filter.value.toLowerCase()) || token.entity.name?.toLowerCase().includes(search_filter.value.toLowerCase())
    );

    if (sort_order.value === "name") {
        filtered_tokens = filtered_tokens.sort((a, b) => a.entity.name.localeCompare(b.entity.name));
    } else if (sort_order.value === "created_at") {
        filtered_tokens = filtered_tokens.sort((a, b) => {
            // if both art null return 0
            if (a.entity.created_at == null && b.entity.created_at == null) {
                return 0;
            }

            // then if one is null it should go last
            if (a.entity.created_at == null) {
                return 1;
            }
            if (b.entity.created_at == null) {
                return -1;
            }

            return b.entity.created_at.seconds - a.entity.created_at.seconds
        });
    }
    return filtered_tokens
})

const paginated_tokens = computed(() => {
    const tokens = filtered_tokens.value;

    const start_index = 0;
    const end_index = start_index + limit.value;
    const subset = tokens.slice(start_index, end_index);

    return subset;
})

</script>

<style scoped> .tile-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
     gap: 10px;
 }
</style>