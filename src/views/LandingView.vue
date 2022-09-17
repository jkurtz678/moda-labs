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
                experience for viewing digital art at the quality intended by the artist.
            </p>
            <br />
            <el-button v-if="metamask_supported" :loading="loading" @click="connect">Connect Wallet</el-button>
            <el-alert v-else type="warning" show-icon title="Install Metamask" style="margin-bottom: 1.5em"
                :closable="false">
                The Metamask extension was not detected on your browser.
                Please
                <el-link type="primary" style="font-size: 12px; vertical-align: top;"
                    href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
                    install Metamask
                </el-link> and then refresh the page.
            </el-alert>
            <el-button @click="continueAsGuest">Continue as Guest</el-button>
            <el-button @click='whatsNew'>What's New</el-button>
        </el-card>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useAccountStore } from "@/stores/account"
import { showError, isMobileBrowser } from "@/util/util";
import { ElLoading } from 'element-plus'
import detectEthereumProvider from '@metamask/detect-provider';

const account_store = useAccountStore();

const loading = ref(false);
const metamask_supported = ref(false);
const route = useRoute()
const router = useRouter();

onMounted(async () => {
    // had difficulties detecting metamask on mobile browsers, always show connect button on mobile for now
    if (isMobileBrowser()) {
        metamask_supported.value = true
        return
    }

    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    const provider = await detectEthereumProvider().catch((err: Error) => {
        showError(`Error detecting ethereum provider - ${err}`)
    });
    metamask_supported.value = Boolean(provider);

    loading.close()
})

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

const continueAsGuest = () => {
    account_store.loginAsGuest();
    if (route.query.redir && typeof route.query.redir === 'string') {
        window.location.assign(route.query.redir);
        return
    }
    router.push({ name: "plaque-list" });
}
</script>

<style scoped>
.landing-card {
    max-width: 400px;
    padding-top: 40px;
    padding-bottom: 40px;
    border: 0px;
}
.el-button {
    margin-right: 16px;
    margin-left: 0px;
    margin-bottom: 16px;
}
</style>