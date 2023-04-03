<template>
    <div class="card-flex-container">
        <div style="flex: 3 1 0%; display: flex; align-items: center; padding: 0px 10px 0px 0px;">
            <p class="bold">{{ props.plaque.entity.name }}</p>
        </div>
        <!-- <div style="margin-right: 35px; opacity: 0.5;">{{ platform }}</div>-->
        <el-checkbox v-model="in_list" style="margin-right: 10px" />
    </div>
    <hr class="hr" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { FirestoreDocument, Plaque } from "@/types/types";

interface AddTokenItemProps {
    in_list: boolean;
    plaque: FirestoreDocument<Plaque>;
}
const props = defineProps<AddTokenItemProps>();

const emit = defineEmits(['update_plaque_list'])

// checkbox computed v-model
const in_list = computed({
    get() {
        return props.in_list
    },
    set() {
        emit('update_plaque_list', props.plaque.id)
    }
})


</script>

<style>
.card-flex-container {
    display: flex;
    flex-wrap: nowrap;
}

.card-flex-container:hover {
    background-color: #f5f5f5;

}
</style>