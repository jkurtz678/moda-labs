<template>
    <div style="padding-bottom: 80px; padding-top: 8px;">
        <div class="button-container">
            <div class="row">
                <el-button class="action-button" color="#000000" size="large" @click="tipArtist" round>Tip
                    Artist</el-button>
                <el-button class="action-button" color="#000000" size="large" round
                    @click="handlePurchaseArt">Purchase Art</el-button>
            </div>
            <div class="row">
                <el-button class="action-button" color="#000000" size="large" round
                    @click="router.push({ name: 'catalog-gallery-list' })">View Catalog</el-button>
                <el-button class="action-button" v-if="token_meta.entity.public_link" color="#000000" size="large"
                    @click="openArtistLink" round>Artwork Details</el-button>
            </div>

        </div>
        <div style="padding: 12px 0px;">
            <div style="font-size: var(--el-font-size-extra-small);">Powered By</div>
            <div style="display: flex; gap: 10px; width: 100%;">
                <el-button @click="goToModaPlaque" style="flex-grow: 1;">Moda Plaque</el-button>
                <el-button @click="goToProjectBlank" style="flex-grow: 1;">Projekt
                    ______</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FirestoreDocument, TokenMeta } from '@/types/types';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

interface QrLandingActionsProps {
    token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<QrLandingActionsProps>();

const goToModaPlaque = () => {
    window.open('https://moda-labs.xyz/', "_blank");
}

const goToProjectBlank = () => {
    window.open('https://www.instagram.com/projekt.______/', "_blank");
}
const openArtistLink = () => {
    window.open(props.token_meta?.entity?.public_link, "_blank");
}

const handlePurchaseArt = () => {
    // Check if token has iframe_purchase_url, if so route to iframe, otherwise route to sales-inquiry
    if (props.token_meta?.entity?.iframe_purchase_url) {
        router.push({ name: 'iframe' });
    } else {
        router.push({ name: 'sales-inquiry' });
    }
}

const tipArtist = () => {
    const artist_name = props.token_meta?.entity?.artist;
    if (!artist_name) {
        console.log("No artist name found");
        return;
    }
    const encodedArtistName = encodeURIComponent(artist_name);

    // First, try to open the Venmo app using the venmo:// URL scheme
    window.location.href = `venmo://paycharge?txn=pay&recipients=ModaArt&note=Tip%20for%20${encodedArtistName}`;

    // Fallback to the web URL if the Venmo app is not installed
    setTimeout(() => {
        window.open(`https://account.venmo.com/pay?recipients=ModaArt&note=Tip%20for%20${encodedArtistName}`, "_blank");
    }, 1500); // Wait for a short time before redirecting to the web
}

// const tipArtist = () => {
//     //window.open('https://account.venmo.com/u/ModaArt', "_blank");
//     window.open('https://account.venmo.com/pay?recipients=ModaArt&note=Tip%20for%20%3Cartist-name%3E', "_blank");
// }
</script>
<style>
.action-button {
    flex-grow: 1;
    font-size: 18px;
    margin-left: 0px !important;
    flex: 1;
    margin: 0 10px
}

.row {
    display: flex;
    padding: 10px 0px;
}

.button-container {
    padding: 20px 0px;
}
</style>