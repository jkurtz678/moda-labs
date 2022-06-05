<template>
    <hr class="hr" />
    <div class="card-flex-container">
        <div style="flex: 1">
            <img
                :src="props.detail.entity.public_link"
                class="image"
            />
        </div>
        <div style="flex: 3 1 0%">
            <p class="bold">{{ props.detail.entity.name }}</p>
            <p class="bold">{{ props.detail.entity.artist }}</p>
        </div>
        <el-icon>
            <Plus color="red"></Plus>
        </el-icon>
    </div> 
    
</template>

<script setup lang="ts">
  
import { defineProps, computed } from "vue";
import type { FirestoreDocument,TokenMeta } from "../types/types";
import { ref,reactive } from "vue";
interface AllDetailsProps {
  detail: FirestoreDocument<TokenMeta>;
}
const props = defineProps<AllDetailsProps>();
</script>
