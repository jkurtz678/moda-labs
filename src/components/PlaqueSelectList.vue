<template>
    <el-input type="text" v-model="search_filter" :prefix-icon="Search" placeholder="Search by plaque name" />
    <div style="margin-top: 10px; overflow-y: auto; max-height: 250px;">
        <div v-if="filtered_plaque_list.length == 0">No plaque found</div>
        <AddPlaqueItem v-for="plaque in filtered_plaque_list" :plaque="plaque"
            :in_list="Boolean(selected_plaque_set.has(plaque.id))" @update_plaque_list="updateSelectedPlaqueList">
        </AddPlaqueItem>
        <hr class="hr" />
    </div>
</template>

<script setup lang="ts">
import AddPlaqueItem from './AddPlaqueItem.vue';
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue';
import type { FirestoreDocument, Plaque } from '@/types/types';

interface PlaqueSelectListProps {
    selected_plaque_id_list: string[];
    plaque_list: FirestoreDocument<Plaque>[];
}
const props = defineProps<PlaqueSelectListProps>();
const emit = defineEmits(['update:selected_plaque_id_list'])

const search_filter = ref("");
const sorted_plaque_list = ref<FirestoreDocument<Plaque>[]>([]);

onMounted(() => {
    if (!props.plaque_list) {
        return
    }
    for (let token of props.plaque_list) {
        if (selected_plaque_set.value.has(token.id)) {
            sorted_plaque_list.value.unshift(token)
        } else {
            sorted_plaque_list.value.push(token)
        }
    }
})

const filtered_plaque_list = computed(() => {
    if (search_filter.value.trim() !== '') {
        return sorted_plaque_list.value.filter((token) =>
            token.entity.name?.toLowerCase().includes(search_filter.value.toLowerCase())
        );
    }
    return sorted_plaque_list.value;
})

const selected_plaque_set = computed((): Set<string> => {
    return new Set(props.selected_plaque_id_list);
});

const updateSelectedPlaqueList = (new_id: string) => {
    let new_selected_plaque_list = [...props.selected_plaque_id_list];
    if (new_selected_plaque_list.some(id => id === new_id)) {
        new_selected_plaque_list = new_selected_plaque_list.filter(id => id != new_id);
    } else {
        new_selected_plaque_list.push(new_id);
    }
    emit('update:selected_plaque_id_list', new_selected_plaque_list);
}
</script>