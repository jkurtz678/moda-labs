<template>
    <div class='subheader' style="display: flex; align-items: center;">
        <el-input v-model="search_filter" :prefix-icon="Search" placeholder="Search artwork or artist" style="max-width: 350px"
            clearable>
        </el-input>
        <el-select v-model="sort_order" placeholder="Sort by" style="margin-left: 10px;">
                <el-option label="Sort by name" value="name"></el-option>
                <el-option label="Sort by newest" value="created_at"></el-option>
            </el-select>
            <el-button icon="Plus" @click="router.push({ name: 'new-artwork' })" color="#000000" style="margin-left: 10px" size="small">Artwork</el-button>
        <!-- <el-popover placement="bottom" title="Plaque Filters" :width="300" trigger="click">
            <template #reference>
                <el-button icon="Filter" style="margin-left: 10px;" type="info" size="small">Filters</el-button>
            </template>
            <el-select v-model="sort_order" placeholder="Sort by" style="">
                <el-option label="Sort by name" value="name"></el-option>
                <el-option label="Sort by newest" value="created_at"></el-option>
            </el-select>
        </el-popover> -->
    </div>

    <div style="padding-bottom: 40px;"></div>
    <div id="masonry-container" ref="masonryContainer"
        style="overflow-y: auto; height: 100%; padding: 10px; margin: -10px;">
        <vue-masonry-wall id="masonary-wall" :scroll-container="masonryContainer" :items="paginated_tokens"
            :column-width="220" :gap="16">
            <template v-slot:default="{ item }">
                <ArtworkTile :token_meta="item">
                </ArtworkTile>
            </template>
        </vue-masonry-wall>
    </div>
    <RouterView></RouterView>
</template>

<script setup lang="ts">
import VueMasonryWall from "@yeger/vue-masonry-wall";
import ArtworkTile from "./ArtworkTile.vue"
import { useTokenMetaStore } from '@/stores/token-meta';
import { computed, onMounted, ref } from 'vue';
import { watch } from "vue";
import type { FirestoreDocument, TokenMeta } from "@/types/types";
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const token_meta_store = useTokenMetaStore()
const search_filter = ref("")
const masonryContainer = ref(null);
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
// watch(filtered_tokens, (v) => {
//     paginated_tokens.value = v.slice(0, limit.value)
// })

onMounted(() => {
    const masonry_container_el = document.getElementById("masonry-container")
    if (!masonry_container_el) {
        console.log("ArtworkTileGrid error, masonary_wall element not found")
        return
    }
    // masonry_container_el.addEventListener('scroll', () => {
    //     const scroll_top = masonry_container_el.scrollTop;
    //     const scroll_height = masonry_container_el.scrollHeight;
    //     const client_height = masonry_container_el.clientHeight;
    //     const scroll_percentage = (scroll_top / (scroll_height - client_height)) * 100;
    //     if (scroll_percentage > 85 && limit.value < all_tokens.value.length) {
    //         limit.value = limit.value + 4;
    //         // if (paginated_tokens.value) {
    //         //     paginated_tokens.value = [...paginated_tokens.value, ...filtered_tokens.value.slice(paginated_tokens.value.length, 4)]
    //         // }
    //     }

    // });
})

</script>

<style scoped>
.tile-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 10px;
}

.subheader {
    background-color: white;
    position: fixed;
    top: 50px;
    left: 0px;
    right: 0px;
    padding: 0px 25px 10px;
    z-index: 5;
}
</style>