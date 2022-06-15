<template>
    <hr class="hr" />
    <div class="card-flex-container">
        <div style="flex: 1; width: 70px;">
            <img :src="getImageUrl('logo.png')" style="width: 70px;" />
        </div>
        <div style="flex: 3 1 0%">
            <p class="bold">{{ props.token.entity.name }}</p>
            <p class="bold">{{ props.token.entity.artist }}</p>
        </div>
        <el-button :icon="in_list ? 'close' : 'plus'" :type="in_list ? 'danger' : 'success'" plain circle
            @click="emit('update_token_list', props.token.id)" />
    </div>
</template>

<script setup lang="ts">

import { computed, ref, watch } from "vue";
import type { FirestoreDocument, TokenMeta, Plaque } from "../types/types";
import { usePlaqueStore } from "@/stores/plaque"
import { updatePlaque } from "@/api/plaque"
import { defaultMaxListeners } from "events";
import { pipelineTopicExpression } from "@babel/types";

interface AddTokenItemProps {
    in_list: boolean;
    token: FirestoreDocument<TokenMeta>;
}
const props = defineProps<AddTokenItemProps>();

const emit = defineEmits(['update_token_list'])

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}

// watch(add_to_list, async (v) => {
//     if (v) {
//         if (in_playlist.value) {
//             console.log("in")
//             const new_id_list = plaque.value.entity.token_meta_id_list.filter(id => id != props.token.id)
//             console.log(new_id_list)
//             await updatePlaque(props.plaque_id, { token_meta_id_list: new_id_list });
//             return
//         } else {
//             const new_id_list = [...plaque.value.entity.token_meta_id_list]
//             new_id_list.push(props.token.id);
//             console.log(new_id_list)
//             await updatePlaque(props.plaque_id, { token_meta_id_list: new_id_list });
//             return
//         }
//     }
// })
</script>
