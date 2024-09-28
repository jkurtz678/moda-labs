<template>
    <div>
        <div style="padding: 20px 0px; display: flex; gap: 10px; width: 100%;">
            <el-button color="#000000" size="large" @click="tipArtist" style="flex-grow: 1; font-size: 18px;" round>Tip
                Artist</el-button>
            <!-- <el-button v-if="token_meta?.entity.permission_to_sell" color="#000000" size="large"
                    style="flex-grow: 1; font-size: 18px;" round>Place A Bid</el-button> -->
        </div>
        <div style="padding: 12px 0px; ">
            <div style="font-size: var(--el-font-size-extra-small);">Learn More</div>
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


interface ArtPreviewHeaderProps {
    token_meta: FirestoreDocument<TokenMeta>;
}
const props = defineProps<ArtPreviewHeaderProps>();

const goToModaPlaque = () => {
    window.open('https://moda-labs.xyz/', "_blank");
}

const goToProjectBlank = () => {
    window.open('https://www.instagram.com/projekt.______/', "_blank");
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