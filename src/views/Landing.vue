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
                experience for viewing Digital art at the quality inteded by the artist.
            </p>
            <br />
            <el-button @click="connect">Connect Wallet</el-button>
            <el-button @click='whatsNew'>What's New</el-button>
        </el-card>
    </el-container>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import web3Interface from "@/composables/web3Interface";

 const { connectWallet, setupWeb3Modal, signature, address, web3_modal } =
      web3Interface();
const router = useRouter();
const whatsNew = () => {
    window.location.assign("https://modadisplay.art/Upcoming-Events")
}
const connect = async () => {
   await setupWeb3Modal();
   await connectWallet(); 
   console.log("address", address.value)
   console.log("signature", signature.value)
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