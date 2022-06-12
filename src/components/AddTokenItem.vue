<template>
    <hr class="hr" />
    <div class="card-flex-container">
        <div style="flex: 1; width: 70px;">
            <img :src="getImageUrl('logo.png')"
                style="width: 70px;" />
        </div>
        <div style="flex: 3 1 0%">
            <p class="bold">{{ props.token.entity.name }}</p>
            <p class="bold">{{ props.token.entity.artist }}</p>
        </div>
        <el-button :icon="in_playlist ? 'close' : 'plus'" :type="in_playlist ? 'danger' : 'success'" plain circle @click="toggleTokenMeta" :loading="toggle_token_loading"/>
    </div>

</template>

<script setup lang="ts">

import {computed, ref } from "vue";
import type { FirestoreDocument, TokenMeta, Plaque } from "../types/types";
import { usePlaqueStore } from "@/stores/plaque"
import { updatePlaque } from "@/api/plaque"
import { defaultMaxListeners } from "events";

interface AddTokenItemProps {
    token: FirestoreDocument<TokenMeta>;
    plaque_id: string;
}
const props = defineProps<AddTokenItemProps>();
const toggle_token_loading = ref(false);

const in_playlist = computed(() => {
    return !!plaque.value.entity.token_meta_id_list.find(id => id == props.token.id);
})

const plaque = computed((): FirestoreDocument<Plaque> => {
    return plaque_store.plaque_map[props.plaque_id];
})

const plaque_store = usePlaqueStore();

const toggleTokenMeta = async () => {
    toggle_token_loading.value = true;
    if(in_playlist.value) {
        const new_id_list = plaque.value.entity.token_meta_id_list.filter(id => id != props.token.id)
        await updatePlaque(props.plaque_id, {token_meta_id_list: new_id_list});
    } else {
        const new_id_list = [...plaque.value.entity.token_meta_id_list]
        new_id_list.push(props.token.id);
        await updatePlaque(props.plaque_id, {token_meta_id_list: new_id_list});
    }
    toggle_token_loading.value = false;
};

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}
</script>
