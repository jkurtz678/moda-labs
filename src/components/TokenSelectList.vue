<template>
    <div style="display: flex; align-items:center;">
        <el-input type="text" v-model="search_filter" :prefix-icon="Search"
            placeholder="Search by artwork title or artist name" />
        <ArtworkFilters :all_tokens="props.token_meta_list" :search_filter="search_filter" :use_local_storage="false"
            @update-filtered-tokens="updateFilteredTokenMetaList" :plaque_id="plaque_id"></ArtworkFilters>
    </div>
    <div :style="{ marginTop: '10px', overflowY: 'auto', maxHeight: props.max_height ? `${props.max_height}px` : '' }">
        <div v-if="filtered_token_meta_list.length == 0">No artwork found</div>
        <AddTokenItem v-for="token in filtered_token_meta_list" :token_meta="token"
            :in_list="Boolean(selected_token_meta_set.has(token.id))" @update_token_list="updateSelectedTokenList" :plaque_id="plaque_id">
        </AddTokenItem>
        <hr class="hr" />
    </div>
</template>

<script setup lang="ts">
import AddTokenItem from './AddTokenItem.vue';
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue';
import type { FirestoreDocument, TokenMeta } from '@/types/types';
import ArtworkFilters from "./ArtworkFilters.vue";
import { watch } from 'vue';

interface TokenSelectListProps {
    selected_token_meta_id_list: string[];
    token_meta_list: FirestoreDocument<TokenMeta>[];
    max_height?: number;
    plaque_id?: string; // id of plaque if this is being used to select tokens for the plaque
}

const props = defineProps<TokenSelectListProps>();
const emit = defineEmits(['update:selected_token_meta_id_list'])
const initial_sort_done = ref(false);

const search_filter = ref("");
const filtered_token_meta_list = ref<FirestoreDocument<TokenMeta>[]>([]);
// const sorted_token_meta_list = ref<FirestoreDocument<TokenMeta>[]>([]);

const updateFilteredTokenMetaList = (new_list: FirestoreDocument<TokenMeta>[]) => {
    const filtered_tokens = [];
    // when dialog first loads, put selected tokens in front
    if (!initial_sort_done.value) {
        for (let token of new_list) {
            if (selected_token_meta_set.value.has(token.id)) {
                filtered_tokens.unshift(token)
            } else {
                filtered_tokens.push(token)
            }
        }
        initial_sort_done.value = true;
    } else {
        filtered_tokens.push(...new_list);
    }

    filtered_token_meta_list.value = filtered_tokens;
}

const selected_token_meta_set = computed((): Set<string> => {
    return new Set(props.selected_token_meta_id_list);
});

const updateSelectedTokenList = (new_id: string) => {
    let new_selected_token_list = [...props.selected_token_meta_id_list];
    if (new_selected_token_list.some(id => id === new_id)) {
        new_selected_token_list = new_selected_token_list.filter(id => id != new_id);
    } else {
        new_selected_token_list.push(new_id);
    }
    emit('update:selected_token_meta_id_list', new_selected_token_list);
}
</script>