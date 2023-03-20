<template>
    <div style="display: flex; justify-content: center">
        <el-card class="container-card">
            <template #header>
                <div class="card-header">
                    <span style="font-size: 18px;">Artwork</span>
                    <el-button icon="Plus" @click="router.push({ name: 'new-token' })" color="#000000">Add artwork to
                        archive</el-button>
                </div>
                <div style="display: flex; align-items: center; margin-top: 20px;">
                    <el-input v-model="search_filter" :prefix-icon="Search"
                        placeholder="Search by artwork title or artist name"></el-input>
                    <el-select v-model="sort_order" placeholder="Sort by" style="margin-left: 10px;">
                        <el-option label="Sort by name" value="name"></el-option>
                        <el-option label="Sort by newest" value="created_at"></el-option>
                    </el-select>
                </div>
            </template>
            <div v-if="tokens.length == 0">No artwork found</div>
            <PlaqueTokenItem v-for="token in tokens" :token_meta="token">
            </PlaqueTokenItem>
        </el-card>
    </div>
    <RouterView></RouterView>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import PlaqueTokenItem from "./PlaqueTokenItem.vue";
import { useTokenMetaStore } from "../stores/token-meta";
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const token_meta_store = useTokenMetaStore()
const search_filter = ref("")
const sort_order = ref("name")

const tokens = computed(() => {
    const store_tokens = token_meta_store.sorted_all_token_metas;
    const filtered_tokens = store_tokens.filter((token) =>
        token.entity.artist?.toLowerCase().includes(search_filter.value.toLowerCase()) || token.entity.name?.toLowerCase().includes(search_filter.value.toLowerCase())
    );

    if (sort_order.value === "name") {
        return filtered_tokens.sort((a, b) => a.entity.name.localeCompare(b.entity.name));
    } else if (sort_order.value === "created_at") {
        return filtered_tokens.sort((a, b) => {
            // if both art null return 0
            if (a.entity.created_at == null && b.entity.created_at == null) {
                return 0;
            }

            // then if one is null it should go last
            if (a.entity.created_at == null) {
                return 1;
            }
            if (b.entity.created_at == null) {
                return -1;
            }

            return b.entity.created_at.seconds - a.entity.created_at.seconds
        });
    }

    return [];
})

</script>
<style scoped>
.container-card {
    min-width: 700px;
    border-radius: 18px;
    height: 100%;
}

@media only screen and (max-width: 650px) {
    .container-card {
        display: block;
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
