<template>
    <el-dialog v-model="show_dialog" :fullscreen="screen_type == 'xs'" style="text-align:justify;" :before-close="close">
        <div style="margin: 0 auto; max-width: 350px;">
            <h1>Welcome to MoDA LABS</h1>
            <br />
            <p>
                All in one tool that helps artist and collectors showcase their collections in the physical world. Turn
                your
                home into a thriving digital art gallery.
            </p>
            <br />
            <p>
                Zero Hassle.
            </p>
            <br />
            <p>
                MoDA Labs includes a powerful extension frameworks that allows creators to manage and showcase their
                artwork
                in the physical world. Supporting communion with collectors and galleries, MoDA Labs provides a seamless
                experience for viewing digital art at the quality intended by the artist.
            </p>
            <br />
            <div style="text-align: right;">
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