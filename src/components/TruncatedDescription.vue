<template>
    <div>{{ optionally_truncated_description }}</div>
    <div>
        <a v-if="description && description.length > max_description_length"
            @click="show_full_description = !show_full_description" class="link">
            <span v-if="show_full_description">Less</span>
            <span v-else>More</span>
        </a>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface TruncatedDescriptionProps {
    description?: string;
}
const props = defineProps<TruncatedDescriptionProps>();

const show_full_description = ref(false);
const max_description_length = 150;

const optionally_truncated_description = computed(() => {
    if (!props.description) {
        return "";
    }

    if (show_full_description.value || props.description.length < max_description_length) {
        return props.description;
    }

    return `${props.description.substring(0, max_description_length)}...`;
});
</script>

<style>
.link {
    text-decoration: underline;
}
</style>
