<template>
    <el-input type="text" v-model="search_filter" :prefix-icon="Search"
        placeholder="Search by artwork title or artist name" />
    <div style="margin-top: 10px; overflow-y: auto; max-height: 250px;">
        <div v-if="filtered_token_meta_list.length == 0">No artwork found</div>
        <AddTokenItem v-for="token in filtered_token_meta_list" :token_meta="token"
            :in_list="Boolean(selected_token_meta_set.has(token.id))" @update_token_list="updateSelectedTokenList">
        </AddTokenItem>
        <hr class="hr" />
    </div>
</template>

<script setup lang="ts">
import AddTokenItem from './AddTokenItem.vue';
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue';
import type { FirestoreDocument, TokenMeta } from '@/types/types';

interface TokenSelectListProps {
    selected_token_meta_id_list: string[];
    token_meta_list: FirestoreDocument<TokenMeta>[];
}
const props = defineProps<TokenSelectListProps>();
const emit = defineEmits(['update:selected_token_meta_id_list'])

const search_filter = ref("");
const sorted_token_meta_list = ref<FirestoreDocument<TokenMeta>[]>([]);

onMounted(() => {
    if (!props.token_meta_list) {
        return
    }
    for (let token of props.token_meta_list) {
        if (selected_token_meta_set.value.has(token.id)) {
            sorted_token_meta_list.value.unshift(token)
        } else {
            sorted_token_meta_list.value.push(token)
        }
    }
})

const filtered_token_meta_list = computed(() => {
    if (search_filter.value.trim() !== '') {
        return sorted_token_meta_list.value.filter((token) =>
            token.entity.artist?.toLowerCase().includes(search_filter.value.toLowerCase()) || token.entity.name?.toLowerCase().includes(search_filter.value.toLowerCase())
        );
    }
    return sorted_token_meta_list.value;
})

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