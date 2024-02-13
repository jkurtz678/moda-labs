<template>
    <el-popover placement="bottom" title="Artwork Filters" :width="300" trigger="click">
        <template #reference>
            <el-badge is-dot :hidden="!show_filter_dot">
                <el-button icon="Filter" style="margin-left: 10px;" type="info" size="small">Filters</el-button>
            </el-badge>
        </template>
        <div class="caption">Filter by gallery</div>
        <el-select v-model="filter_by_gallery" placeholder="Filter by gallery" class="filter-select">
            <el-option :label="'All artwork'" value="" />
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
        <div class="caption">Filter by platform</div>
        <el-select v-model="filter_by_platform" class="filter-select">
            <el-option label="All" value=""></el-option>
            <el-option label="Moda Archive" value="moda_archive"></el-option>
            <el-option label="Opensea" value="opensea"></el-option>
            <el-option label="Demo" value="archive_demo"></el-option>
        </el-select>
        <template v-if="plaque_id">
            <div class="caption">Filter by downloaded</div>
            <el-select v-model="filter_by_downloaded" class="filter-select">
                <el-option label="All" value=""></el-option>
                <el-option label="Downloaded" value="downloaded"></el-option>
                <el-option label="Not Downloaded" value="not_downloaded"></el-option>
            </el-select>
        </template>
        <div class="caption">Sort order</div>
        <el-select v-model="sort_order" placeholder="Sort by" class="filter-select">
            <el-option label="Sort by name" value="name"></el-option>
            <el-option label="Sort by newest" value="created_at"></el-option>
        </el-select>
    </el-popover>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits, onBeforeMount } from 'vue';
import { useGalleryStore } from "@/stores/gallery";
import { TokenPlatform, type FirestoreDocument, type TokenMeta, getTokenMetaFileName } from '@/types/types';
import { usePlaqueStore } from '@/stores/plaque';

interface ArtworkFilterProps {
    all_tokens: FirestoreDocument<TokenMeta>[];
    search_filter: string;
    use_local_storage: boolean;
    plaque_id?: string;
}
const props = defineProps<ArtworkFilterProps>();
const gallery_store = useGalleryStore();
const plaque_store = usePlaqueStore();

const emits = defineEmits(['update-filtered-tokens']);

// Filter and sorting logic
// ...

/* token filters */

const filter_by_aspect_ratio = ref<string>("")
watch(filter_by_aspect_ratio, (newVal) => {
    if (props.use_local_storage) {
        localStorage.setItem('artwork_grid_aspect_ratio_filter', newVal)
    }
})
const filter_by_gallery = ref<string>("")
watch(filter_by_gallery, (newVal) => {
    if (props.use_local_storage) {
        localStorage.setItem('artwork_grid_filter_by_gallery', newVal)
    }
})
const filter_by_platform = ref<string>("")
watch(filter_by_platform, (newVal) => {
    if (props.use_local_storage) {
        localStorage.setItem('artwork_grid_filter_by_platform', newVal)
    }
})
const filter_by_downloaded = ref<string>("")
watch(filter_by_downloaded, (newVal) => {
    if (props.use_local_storage) {
        localStorage.setItem('artwork_grid_filter_by_downloaded', newVal)
    }
})

const sort_order = ref("created_at")
watch(sort_order, (newVal) => {
    if (props.use_local_storage) {
        localStorage.setItem('artwork_grid_sort_order', newVal)
    }
})

const plaque_media_map = computed(() => {
    if (!props.plaque_id){ 
        return null
    }
    return plaque_store.plaque_media_map[props.plaque_id]
})

// use beforeMount here so that watchers/computeds start with the data from local storage (instead of the values before local storage)
onBeforeMount(() => {
    if (props.use_local_storage) {
        filter_by_aspect_ratio.value = localStorage.getItem('artwork_grid_aspect_ratio_filter') || ""
        filter_by_gallery.value = localStorage.getItem('artwork_grid_filter_by_gallery') || ""
        filter_by_platform.value = localStorage.getItem('artwork_grid_filter_by_platform') || ""
        filter_by_downloaded.value = localStorage.getItem('artwork_grid_filter_by_downloaded') || ""
        sort_order.value = localStorage.getItem('artwork_grid_sort_order') || "name"
    }
})
const show_filter_dot = computed(() => {
    return filter_by_aspect_ratio.value || filter_by_gallery.value || filter_by_platform.value || filter_by_downloaded.value;
})

const tokens_in_gallery_set = computed(() => {
    const set = new Set<string>()
    if (filter_by_gallery.value) {
        gallery_store.gallery_token_meta_list.forEach((gtm) => {
            if (gtm.entity.gallery_id == filter_by_gallery.value) {
                set.add(gtm.entity.token_meta_id);
            }
        })
    }
    console.log("ret set ", set)
    return set;
})


const filtered_tokens = computed(() => {
    if (!props.all_tokens) {
        return []
    }

    let filtered_tokens = props.all_tokens.filter((token) => {

        if (props.search_filter && !token.entity.artist?.toLowerCase().includes(props.search_filter.toLowerCase()) && !token.entity.name?.toLowerCase().includes(props.search_filter.toLowerCase())) {
            return false
        }

        if (filter_by_gallery.value) {
            if (!tokens_in_gallery_set.value.has(token.id)) {
                return false
            }
        }

        switch (filter_by_platform.value) {
            case "moda_archive":
                if (token.entity.platform != TokenPlatform.Archive) {
                    return false
                }
                break;
            case "opensea":
                if (token.entity.platform != TokenPlatform.Opensea && token.entity.platform != TokenPlatform.OpenseaArchive) {
                    return false
                }
                break
            case "archive_demo":
                if (token.entity.platform != TokenPlatform.ArchiveDemo) {
                    return false
                }
                break;
        }

        if (plaque_media_map.value) {
            switch (filter_by_downloaded.value) {
                case "downloaded":
                    if (!plaque_media_map.value[getTokenMetaFileName(token)]) {
                        return false
                    }
                    break;
                case "not_downloaded":
                    if (plaque_media_map.value[getTokenMetaFileName(token)]) {
                        return false
                    }
            }
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


// Whenever the filtered list changes, emit an event
watch(filtered_tokens, (newVal) => {
    emits('update-filtered-tokens', newVal);
}, {
    immediate: true // This option will trigger the callback immediately on load
});
</script>

<style scoped>
.caption {
    font-size: var(--el-font-size-extra-small)
}

.filter-select {
    margin-bottom: 1em;
    width: 260px;
}
</style>