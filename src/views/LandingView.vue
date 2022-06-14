<template>
    <el-container style="display:flex; justify-content: center;">
        <el-card class="landing-card" shadow="never">
            <h1>MoDA LABS</h1>
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
                experience for viewing digital art at the quality inteded by the artist.
            </p>
            <br />
            <el-button :loading="loading" @click="connect">Connect Wallet</el-button>
            <el-button @click='whatsNew'>What's New</el-button>
        </el-card>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { connectWallet } from "@/web3Interface";
import { useAccountStore } from "@/stores/account"
import { showError } from "@/util/util";
const account_store = useAccountStore();

const loading = ref(false);
const route = useRoute()
const router = useRouter();

const whatsNew = () => {
    window.location.assign("https://modadisplay.art/Upcoming-Events")
}

const connect = () => {
    loading.value = true
    account_store.login()
        .then(() => {
            // if redir param is set, user has been sent to the login page from a specific url. Send them back to this page after login
            if (route.query.redir && typeof route.query.redir === 'string') {
                window.location.assign(route.query.redir);
                return
            }

            // if no redir param is set, go to home route by default
            router.push({ name: "plaque-list" })
        }).catch(err => {
            console.error(err);
            showError(`Error connecting to Metamask - ${err.message ? err.message : err}`);
        }).finally(() => {
            loading.value = false;
        });
}
</script>

<style scoped>
.landing-card {
    max-width: 400px;
    padding-top: 40px;
    padding-bottom: 40px;
    border: 0px;
}
</style>