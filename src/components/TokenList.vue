<template>
    <div style="display: flex; justify-content: center; height: 100%;">
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
            <div v-if="filtered_tokens.length == 0">No artwork found</div>
            <div style="overflow-y: auto; height: 100%; padding-bottom: 35px;">
                <PlaqueTokenItem v-for="token in paginated_tokens" :token_meta="token">
                </PlaqueTokenItem>
            </div>
            <div style="position: absolute; bottom: 0px; left: 0px; right: 0px; background-color: white; padding: 5px; 0px">
            <el-pagination  v-model:current-page="page" layout="prev, pager, next" hide-on-single-page :page-size="limit"
                :total="filtered_tokens.length" />
                </div>
        </el-card>
    </div>
    <RouterView></RouterView>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import PlaqueTokenItem from "./PlaqueTokenItem.vue";
import { useTokenMetaStore } from "../stores/token-meta";
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const token_meta_store = useTokenMetaStore()
const search_filter = ref("")
const sort_order = ref(localStorage.getItem('token_list_sort_order') || "name")

const limit = ref(10);
const page = ref(1);

watch(sort_order, (newVal) => {
    localStorage.setItem('token_list_sort_order', newVal)
})

const page_count = computed(() => {
    return Math.ceil(token_meta_store.sorted_all_token_metas.length / limit.value);
})

const all_tokens = computed(() => {
    return token_meta_store.sorted_all_token_metas;
})

const filtered_tokens = computed(() => {
    let filtered_tokens = all_tokens.value.filter((token) =>
        token.entity.artist?.toLowerCase().includes(search_filter.value.toLowerCase()) || token.entity.name?.toLowerCase().includes(search_filter.value.toLowerCase())
    );

    if (sort_order.value === "name") {
        filtered_tokens = filtered_tokens.sort((a, b) => a.entity.name.localeCompare(b.entity.name));
    } else if (sort_order.value === "created_at") {
        filtered_tokens = filtered_tokens.sort((a, b) => {
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
    return filtered_tokens
})

const paginated_tokens = computed(() => {
    const tokens = filtered_tokens.value;

    const start_index = (page.value - 1) * limit.value;
    const end_index = start_index + limit.value;
    const subset = tokens.slice(start_index, end_index);

    return subset;
})

</script>
<style scoped>
.container-card {
    min-width: 750px;
    border-radius: 18px;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

@media only screen and (max-width: 750px) {
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

:deep(.el-card__body) {
    padding-top: 0px;
    padding-bottom: 10px;
    overflow-y: auto;
    flex-grow: 1;
}
</style>
