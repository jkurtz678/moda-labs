<template>
    <div class="background">
        <div class="center">
            <div :class="show_content ? 'container show' : 'container'">
                <div v-show="status == Status.STATUS_LOADING">
                    <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div style="margin-top: 10px; font-size: 30px;">Preparing art</div>
                </div>
                <!-- <div v-show="status == Status.STATUS_QR_SCAN">
                    <div id="scan-qrcode" style="display: flex; justify-content: center;"></div>
                    <div style="margin-top: 10px; font-size: 30px;">Scan to cast art</div>
                </div> -->
                <div v-show="status == Status.STATUS_NO_VALID_TOKENS">
                    <div style="font-size: 30px;">No art selected</div>
                </div>
                <div v-show="status == Status.STATUS_ERROR">
                    <div style="font-size: 30px;">Error loading art. Please try a different piece.</div>
                </div>
                <!-- <div v-show="status == Status.STATUS_NO_INTERNET">
                    <div style="font-size: 30px;">No internet connection. Please connect to wifi.</div>
                </div>
                <div v-show="status == Status.STATUS_INVALID_DISPLAY">
                    <div style="font-size: 30px;">Please connect a secondary monitor to cast art</div>
                </div> -->

                <div v-show="status == Status.STATUS_DISPLAY">
                    <div class="title">{{ active_token_meta?.entity?.name }}</div>
                    <div class="grid">
                        <div class="col" style="max-width:650px; text-align: left;">
                            <div style="margin-bottom: 22px; font-size: 22px;">{{ active_token_meta?.entity?.artist }}</div>
                            <div>{{ active_token_meta?.entity?.description }}</div>
                        </div>
                        <div class="col" style="display: flex; justify-content: center; flex-direction: column; align-items: center; padding-top: 25px;">
                            <QrcodeVue :value="active_token_meta?.entity?.public_link" :size="220" level="H" />
                            <div style="padding-top: 25px; font-size: 22px;">2.88 ETH ($4,948.85)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="position: fixed; bottom: 10px; right: 15px; font-style: italic; opacity: 0.7; font-size: 14px">
            Powered by MoDA Labs
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { FirestoreDocument, Plaque, TokenMeta } from "@/types/types";
import { getPlaqueByPlaqueIDWithListener } from "@/api/plaque";
import { getTokenMetaListByIDList } from "@/api/token-meta";
import { useRoute } from "vue-router";
import QrcodeVue from 'qrcode.vue'

const route = useRoute();

enum Status {
    STATUS_LOADING,
    STATUS_QR_SCAN,
    STATUS_NO_VALID_TOKENS,
    STATUS_ERROR,
    STATUS_NO_INTERNET,
    STATUS_INVALID_DISPLAY,
    STATUS_DISPLAY
}
//const status = ref<Status>(Status.STATUS_LOADING);
const loading = ref(true);
const show_content = ref(true);
const plaque = ref<FirestoreDocument<Plaque>>();
const token_list = ref<FirestoreDocument<TokenMeta>[]>([]);
const active_token_index = ref(0);

const active_token_meta = computed(() => {
    return token_list.value[active_token_index.value]
})

const status = computed(() => {
    if (loading.value) return Status.STATUS_LOADING

    if (!plaque.value || !token_list.value) return Status.STATUS_ERROR

    if (token_list.value.length == 0) return Status.STATUS_NO_VALID_TOKENS

    return Status.STATUS_DISPLAY
})

onMounted(() => {
    const plaque_id = route?.params?.plaque_id;
    if (!plaque_id || typeof plaque_id != "string") return;
    show_content.value = false
    getPlaqueByPlaqueIDWithListener(plaque_id, (p) => {
        loading.value = true
        show_content.value = false
        plaque.value = p;
        getTokenMetaListByIDList(p.entity.token_meta_id_list).then(t_list => {
            //fade in, update data
            setTimeout(() => {
                token_list.value = t_list;
                //this.updateQrCode()
                show_content.value = true;
                loading.value = false;
            }, 500)
        })
    })
})

</script>

<style>
.background {
    background-color: black;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
}

body {
    margin: 0px;
    color: #FFFFFF;
    font-size: 18px;

}

.container {
    opacity: 0;
    transition: opacity 0.5s linear
}

.show {
    opacity: 1;
}

.center {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    padding-left: 4rem;
    padding-right: 4rem;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: left;
    box-sizing: border-box;
    text-align: center;
}

.title {
    text-align: left;
    font-size: 40px;
}

.grid {
    display: flex;
    flex-wrap: wrap;
    margin-right: -0.5rem;
    margin-left: -0.5rem;
    margin-top: -0.5rem;
}

.col {
    flex-grow: 1;
    flex-basis: 0;
    padding: 0.3rem 0.5rem 0.5rem 0.5rem;
}

#scan-qrcode img {
    border: 1.5px solid rgba(255, 255, 255, 1);
}

#plaque-qrcode img {
    border: 1.5px solid rgba(255, 255, 255, 1);
}

.fullscreen-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.fullscreen-btn:hover {
    opacity: 1;
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 3px;
    border: 3px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>