<template>
    <div style="display: flex; justify-content: center">
        <el-card class="container-card">
            <template #header>
                <div class="card-header">
                    <span style="font-size: 18px;">Wallet Tokens</span>
                    <el-button icon="Plus" @click="show_dialog = true">Add token to archive</el-button>
                </div>
            </template>
            <div v-if="tokens.length == 0">No tokens found</div>
            <PlaqueTokenItem v-for="token in tokens" :token_meta="token">
            </PlaqueTokenItem>
            <hr class="hr" />
        </el-card>
    </div>
    <el-dialog v-model="show_dialog" title="Submit Moda Archives" top="2vh" :fullscreen="screen_type == 'xs'"
        width="75%">
        <SubmitTokenForm></SubmitTokenForm>
    </el-dialog>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import SubmitTokenForm from "./SubmitTokenForm.vue"
import PlaqueTokenItem from "./PlaqueTokenItem.vue";
import { useTokenMetaStore } from "../stores/token-meta";
import useBreakpoints from "@/composables/breakpoints";

const { width, screen_type } = useBreakpoints();

const token_meta_store = useTokenMetaStore()
const show_dialog = ref(false);
const tokens = computed(() => {
    return Object.values(token_meta_store.all_token_metas);
}) 
</script>
<style scoped>
.container-card {
    min-width: 650px;
    border-radius: 18px;
    height: 100%;
}

@media only screen and (max-width: 650px) {
    .container-card {
        display: block;
        margin: 1em;
        width: 100%;
        min-width: 250px !important;
    }
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>