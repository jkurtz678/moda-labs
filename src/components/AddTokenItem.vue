<template>
    <hr class="hr" />
    <div class="card-flex-container">
        <div style="display: flex; align-items: center; margin: 5px 25px 5px 0px;">
            <el-image :src="props.token.entity.thumbnail_url || getImageUrl('logo.png')"
                style="width: 50px; height: 50px;" fit="contain" />
        </div>
        <div style="flex: 3 1 0%">
            <p class="bold">{{ props.token.entity.name }}</p>
            <p class="bold">{{ props.token.entity.artist }}</p>
        </div>
        <div style="margin-right: 35px; opacity: 0.5;">{{ platform }}</div>
        <el-button :icon="in_list ? 'close' : 'plus'" :type="in_list ? 'danger' : 'success'" plain circle
            @click="emit('update_token_list', props.token.id)" />
    </div>
</template>

<script setup lang="ts">

import { computed, ref, watch } from "vue";
import { getPlatformDisplay } from "@/types/types";
import type { FirestoreDocument, TokenMeta } from "@/types/types";

interface AddTokenItemProps {
    in_list: boolean;
    token: FirestoreDocument<TokenMeta>;
}
const props = defineProps<AddTokenItemProps>();

const emit = defineEmits(['update_token_list'])

const platform = computed(() => {
    return getPlatformDisplay(props.token.entity.platform)
})

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}
</script>
