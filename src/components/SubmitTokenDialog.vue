<template>
    <el-dialog v-model="show_dialog" title="Submit To Moda Archives" top="2vh" :fullscreen="screen_type == 'xs'"
        width="75%" @close="router.push({name: 'token-list'})">
        <SubmitTokenForm :token_meta_id="(route.params.token_meta_id as string)"></SubmitTokenForm>
    </el-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import SubmitTokenForm from "./SubmitTokenForm.vue";
import useBreakpoints from "@/composables/breakpoints";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const show_dialog = ref(true);
const { screen_type } = useBreakpoints();
</script>