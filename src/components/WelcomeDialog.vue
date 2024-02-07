<template>
    <el-dialog v-model="show_dialog" :fullscreen="screen_type == 'xs'" style="text-align:center;" :before-close="close">
        <div style="margin: 0 auto; max-width: 320px; padding-bottom: 8px;">
            <h1>Welcome to MODA LABS</h1>
            <br />
            <p>
                Thank you for supporting our project!
            </p>
            <br />
            <p>
                Create an account to upload Artwork, manage NFT’s and connect your art displays.
            </p>
            <br />
            <p>
                MODA LABS includes a powerful extension framework allowing creators and collectors to better showcase
                complex digital artworks and installations in the physical world.
            </p>
            <br />
            <div>
                <el-button color="#000000" @click="close">Continue</el-button>
            </div>
        </div>

    </el-dialog>
</template>

<script lang="ts" setup>
import useBreakpoints from "@/composables/breakpoints";
import { onMounted } from "vue";
import { ref } from "vue";

const show_dialog = ref(false);
const { screen_type } = useBreakpoints();

onMounted(() => {
    if (localStorage.getItem('hide_welcome_dialog') != 'true') {
        show_dialog.value = true;
    }
})

const close = () => {
    show_dialog.value = false;
    localStorage.setItem('hide_welcome_dialog', 'true');
}
</script>