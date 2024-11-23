<template>
    <div class="wrapper" style="overflow-y: auto; height: 100%">
        <CatalogHeader></CatalogHeader>
        <div class="container">
            <router-view></router-view>
            <!-- <div v-for="artist of artist_list_sorted" :key="artist" style="margin: 20px 0px;">
                <h1 style="font-weight: bold; font-size: 2.8em; padding: 48px 0px 24px 0px;">{{ artist }}</h1>
                <div style="display: flex; margin: -12px; flex-wrap: wrap;">
                    <CatalogArtTile v-for="t of artist_to_token_list_map[artist]" :token_meta="t">
                    </CatalogArtTile>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script lang="ts" setup>
import CatalogHeader from '@/components/catalog/CatalogHeader.vue';

</script>

<style scoped>
.container {
    max-width: 1250px;
    padding: 80px 20px 20px 20px;
    margin: 0 auto;
}
.wrapper {
  font-family: "K2D", sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::v-deep .el-button {
    font-family: "K2D", sans-serif;
}
</style>