<template>
    <div class='subheader' style="display: flex; align-items: center;">
        <el-input v-model="search_filter" :prefix-icon="Search" placeholder="Search artwork or artist"
            style="max-width: 350px" clearable>
        </el-input>
        <el-popover placement="bottom" title="Artwork Filters" :width="300" trigger="click">
            <template #reference>
                <el-button icon="Filter" style="margin-left: 10px;" type="info" size="small">Filters</el-button>
            </template>
            <div class="caption">Filter by gallery</div>
            <el-select v-model="filter_by_gallery" placeholder="Filter by gallery" class="filter-select">
                <el-option :label="'All plaques'" value="" />
                <el-option v-for="gallery in gallery_store.gallery_list" :key="gallery.id" :label="`${gallery.entity.name}`"
                    :value="gallery.id" />
            </el-select>
            <div class="caption">Filter by aspect ratio</div>
            <el-select v-model="filter_by_aspect_ratio" class="filter-select">
                <el-option label="All" value=""></el-option>
                <el-option label="Landscape" value="landscape"></el-option>
                <el-option label="Portrait" value="portrait"></el-option>
                <el-option label="Square" value="square"></el-option>
            </el-select>
            <div class="caption">Sort order</div>
            <el-select v-model="sort_order" placeholder="Sort by" class="filter-select">
                <el-option label="Sort by name" value="name"></el-option>
                <el-option label="Sort by newest" value="created_at"></el-option>
            </el-select>
        </el-popover>
        <el-button icon="Plus" type="info" @click="router.push({ name: 'new-artwork' })" style="margin-left: 10px"
            size="small">Artwork</el-button>
    </div>

    <div style="padding-bottom: 40px;"></div>
    <div id="masonry-container" ref="masonryContainer" style="overflow-y: auto; height: 100%; padding: 10px;">
        <vue-masonry-wall v-if="paginated_tokens.length > 0" id="masonary-wall" :scroll-container="masonryContainer"
            :items="paginated_tokens" :column-width="min_column_width" :gap="gap_width"
            :style="`width: ${grid_width}px; margin: auto`" :max-columns="5">
            <template v-slot:default="{ item }">
                <ArtworkTile :token_meta="item" :column_width="tile_width">
                </ArtworkTile>
            </template>
        </vue-masonry-wall>
        <div v-else style="padding: 1em;">No artwork found</div>
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
import { useGalleryStore } from "@/stores/gallery";
import useBreakpoints from "@/composables/breakpoints";

const router = useRouter();

const token_meta_store = useTokenMetaStore()
const gallery_store = useGalleryStore();
const search_filter = ref("")
const masonryContainer = ref(null);
const starting_limit = 30;
const limit = ref(starting_limit);


/* token filters */
const filter_by_aspect_ratio = ref<string>(localStorage.getItem('artwork_grid_aspect_ratio_filter') || "")
watch(filter_by_aspect_ratio, (newVal) => {
    localStorage.setItem('artwork_grid_aspect_ratio_filter', newVal)
})
const filter_by_gallery = ref<string>(localStorage.getItem('artwork_grid_filter_by_gallery') || "")
watch(filter_by_gallery, (newVal) => {
    localStorage.setItem('artwork_grid_filter_by_gallery', newVal)
})
const sort_order = ref(localStorage.getItem('artwork_grid_sort_order') || "name")
watch(sort_order, (newVal) => {
    localStorage.setItem('artwork_grid_sort_order', newVal)
})

// if search filter changes we want to reset the limit
watch(search_filter, (newVal) => {
    limit.value = starting_limit;
})

/* width calculation logic */
const min_column_width = 250;
const gap_width = 10;
const { screen_type } = useBreakpoints();
const grid_width = computed(() => {
    switch (screen_type.value) {
        case "xs":
            return 340 - (gap_width * 2);
        case "sm":
            return 650 - (gap_width * 2);
        case "md":
            return 960 - (gap_width * 2);
        case "lg":
            return 1200 - (gap_width * 2);
        case "xl":
            return 1700 - (gap_width * 2)
    }
    // wont get here but typescript complains
    return 0;
})
const tile_width = computed(() => {
    // determine how many columns can fit in the grid width with minimum column width and gap between columns
    let num_columns = Math.floor(grid_width.value / (min_column_width + gap_width));
    if (num_columns > 5) {
        num_columns = 5;
    }

    // calculate the width of each tile
    return (grid_width.value - ((num_columns - 1) * gap_width)) / num_columns;
})

const all_tokens = computed(() => {
    //create array of all token metas, duplicated 20 times
    // const all_token_metas = token_meta_store.sorted_all_token_metas.flatMap((token_meta) => {
    //      return Array(1000).fill(token_meta)
    // })
    // return all_token_metas
    return token_meta_store.sorted_all_token_metas.filter((token_meta) => {
        return Boolean(token_meta.entity.aspect_ratio)
    });
})

const filtered_tokens = computed(() => {
    let filtered_tokens = all_tokens.value.filter((token) => {

        if (search_filter.value && !token.entity.artist?.toLowerCase().includes(search_filter.value.toLowerCase()) && !token.entity.name?.toLowerCase().includes(search_filter.value.toLowerCase())) {
            return false
        }
        if (filter_by_gallery.value && !gallery_store.gallery_list.find(g => g.id == filter_by_gallery.value)?.entity.token_meta_id_list.includes(token.id)) {
            return false
        }


        switch (filter_by_aspect_ratio.value) {
            case "portrait":
                if (!token.entity.aspect_ratio || token.entity.aspect_ratio > 0.9) {
                    return false
                }
                break; 
            case "landscape":
                if (!token.entity.aspect_ratio || token.entity.aspect_ratio < 1.1) {
                    return false
                }
                break
            case "square":
                if (!token.entity.aspect_ratio || token.entity.aspect_ratio < 0.9 || token.entity.aspect_ratio > 1.1) {
                    return false
                }
                break;
        }
        return true
    });




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

onMounted(() => {
    const masonry_container_el = document.getElementById("masonry-container")
    if (!masonry_container_el) {
        console.log("ArtworkTileGrid error, masonary_wall element not found")
        return
    }
    masonry_container_el.addEventListener('scroll', () => {
        const scroll_top = masonry_container_el.scrollTop;
        const scroll_height = masonry_container_el.scrollHeight;
        const client_height = masonry_container_el.clientHeight;
        const scroll_percentage = (scroll_top / (scroll_height - client_height)) * 100;
        if (scroll_percentage > 90 && limit.value < filtered_tokens.value.length) {
            limit.value = limit.value + 20;
        }

    });
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

.caption {
    font-size: var(--el-font-size-extra-small)
}

.filter-select {
    margin-bottom: 1em;
    width: 260px;
}
</style>