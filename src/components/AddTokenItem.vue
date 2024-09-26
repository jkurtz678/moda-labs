<template>
    <hr class="hr" />
    <div class="card-flex-container">
        <div style="display: flex; align-items: center; margin: 3px 25px 3px 0px;">
            <el-image :src="thumbnail_url" style="width: 50px; height: 50px;" fit="contain" />
        </div>
        <div style="flex: 3 1 0%; text-align: left; align-items: center;">
            <p class="bold">{{ props.token_meta.entity.name }}</p>
            <p class="bold">{{ props.token_meta.entity.artist }}</p>
        </div>
        <div style="margin-right: 10px; min-width: 80px;">
            <div style="opacity: 0.5; font-size: var(--el-font-size-extra-small)">{{ platform }}</div>
            <div v-if="media_size_display" style="opacity: 0.5; font-size: var(--el-font-size-extra-small)">{{
                media_size_display }}</div>
        </div>
        <div style="min-width: 25px; margin: 0 1.5em 0 0">
            <template v-if="plaque_local_media">
                <el-button v-if="plaque_local_media.bytes_downloaded == plaque_local_media.total_bytes" type="success"
                    :icon="Download" circle size="small" ></el-button>
                <el-button v-else type="warning" :icon="Refresh" circle size="small"
                    ></el-button>
            </template>
        </div>
        <el-checkbox v-model="in_list" style="margin-right: 25px;" />
    </div>
</template>

<script setup lang="ts">

import { computed, toRef } from "vue";
import { getPlatformDisplay } from "@/types/types";
import type { FirestoreDocument, TokenMeta } from "@/types/types";
import { useThumbnail } from "@/composables/thumbnail-image";
import { mediaSizeDisplay } from "@/util/util";
import { Download, Refresh } from "@element-plus/icons-vue";
import { usePlaqueStore } from "@/stores/plaque";
import { getTokenMetaFileName } from "@/types/types"

interface AddTokenItemProps {
    in_list: boolean;
    token_meta: FirestoreDocument<TokenMeta>;
    plaque_id?: string; // id of plaque if this is being used to select tokens for the plaque
}

const props = defineProps<AddTokenItemProps>();
const plaque_store = usePlaqueStore();

// use toRef to make token_meta param stay reactive
const thumbnail_url = useThumbnail(toRef(props, "token_meta"));

const emit = defineEmits(['update_token_list'])

const platform = computed(() => {
    return getPlatformDisplay(props.token_meta.entity.platform)
})

const plaque_local_media = computed(() => {
    if (!props.plaque_id) {
        return null;
    }

    if (!plaque_store.plaque_media_map[props.plaque_id]) {
        return null;
    }

    if (!props.token_meta.entity.media_id) {
        return null;
    }

    const media_map = plaque_store.plaque_media_map[props.plaque_id];

    if (!media_map) {
        return null;
    }

    const plaqueLocalMedia = media_map[getTokenMetaFileName(props.token_meta)];
    return plaqueLocalMedia;
});

// media_size_display is a string that displays the media size in a human readable format, using metric definition of KB, MB, GB (1000, 1000^2, 1000^3)
const media_size_display = computed(() => {
    const media_size = props.token_meta?.entity?.media_size;
    if (!media_size) {
        return "";
    }

    return mediaSizeDisplay(media_size);
});

// checkbox computed v-model
const in_list = computed({
    get() {
        return props.in_list
    },
    set() {
        emit('update_token_list', props.token_meta.id)
    }
})

</script>

<style scoped>
.card-flex-container {
    display: flex;
    align-items: center;
}

.card-flex-container:hover {
    background-color: #f5f5f5;
}
</style>