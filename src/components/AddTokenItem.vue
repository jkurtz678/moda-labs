<template>
    <hr class="hr" />
    <div class="card-flex-container">
        <div style="display: flex; align-items: center; margin: 5px 25px 5px 0px;">
            <el-image :src="thumbnail_url" style="width: 50px; height: 50px;" fit="contain" />
        </div>
        <div style="flex: 3 1 0%">
            <p class="bold">{{ props.token_meta.entity.name }}</p>
            <p class="bold">{{ props.token_meta.entity.artist }}</p>
        </div>
        <div style="margin-right: 35px; opacity: 0.5;">{{ platform }}</div>
        <el-checkbox v-model="in_list" style="margin-right: 10px;"/>
    </div>
</template>

<script setup lang="ts">

import { computed, toRef } from "vue";
import { getPlatformDisplay } from "@/types/types";
import type { FirestoreDocument, TokenMeta } from "@/types/types";
import useThumbnail from "@/composables/thumbnail-image";

interface AddTokenItemProps {
    in_list: boolean;
    token_meta: FirestoreDocument<TokenMeta>;
}

const props = defineProps<AddTokenItemProps>();

// use toRef to make token_meta param stay reactive
const thumbnail_url = useThumbnail(toRef(props, "token_meta"));

const emit = defineEmits(['update_token_list'])

const platform = computed(() => {
    return getPlatformDisplay(props.token_meta.entity.platform)
})

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
