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
        <el-button :icon="getIcon" :type="getType" plain circle @click="toggleTokenMeta"
            :loading="toggle_token_loading" />
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
    token: FirestoreDocument<TokenMeta>;
    plaque_id: string;
    submit_new_token: boolean;
    clear: string[];
}
const props = defineProps<AddTokenItemProps>();
const toggle_token_loading = ref(false);
const new_tmp_list: string[] = [];
const new_list = ref(new_tmp_list);
const in_playlist = computed(() => {
    console.log("in_playlist", plaque_store.meta_in_playlist(props.plaque_id, props.token.id))

    return plaque_store.meta_in_playlist(props.plaque_id, props.token.id)
})
const in_newlist = computed(() => {
    return new_list.value.some(id => id == props.token.id);
})
const plaque = computed((): FirestoreDocument<Plaque> => {
    return plaque_store.plaque_map[props.plaque_id];
})
const reset = ref(props.submit_new_token)
const plaque_store = usePlaqueStore();
const emit = defineEmits(['update_token_list'])
const toggleTokenMeta = () => {
    if (reset.value) {
        new_list.value = []
        reset.value = false
    }
    if (!in_newlist.value) {
        new_list.value.push(props.token.id)
    } else {
        new_list.value = new_list.value.filter(id => id != props.token.id)
    }
    emit('update_token_list', props.token.id)
};

const getImageUrl = (filename: string) => {
    return new URL(`../assets/${filename}`, import.meta.url).href
}
const getType = computed(() => {
    // if(props.clear.length!=0){
    //     console.log("here",props.clear)
    // }

    if (in_playlist.value && !in_newlist.value) {
        return 'danger'
    } else if (in_playlist.value && in_newlist.value) {
        return 'success'
    } else if (!in_playlist.value && in_newlist.value) {
        return 'danger'
    } else {
        return 'success'
    }
})
const getIcon = computed(() => {
    if (in_playlist.value && !in_newlist.value) {
        return 'close'
    } else if (in_playlist.value && in_newlist.value) {
        return 'plus'
    } else if (!in_playlist.value && in_newlist.value) {
        return 'close'
    } else {
        return 'plus'
    }
})
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
