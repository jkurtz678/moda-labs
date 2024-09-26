import { watchEffect, ref, type Ref } from "vue"
import { getTokenMetaMediumImageURL, type FirestoreDocument, type TokenMeta, getTokenMetaThumbnailImageURL } from "@/types/types"

// use Ref to make token_meta param stay reactive
export function useThumbnail(token_meta: Ref<FirestoreDocument<TokenMeta>> ) {
    const thumbnail_url = ref(new URL(`../assets/logo.png`, import.meta.url).href);
    // needs to be watchEffect because we want it to trigger initially AND we want it to run again when the props.token_meta changes
    watchEffect(async () => {
        thumbnail_url.value = await getTokenMetaThumbnailImageURL(token_meta.value);
        // if firebase archive thumbnail is not found, try again in 5 seconds
        if (thumbnail_url.value.includes("logo.png")) {
            setTimeout(async () => {
                const new_url = await getTokenMetaThumbnailImageURL(token_meta.value);
                if(new_url != thumbnail_url.value) {
                    thumbnail_url.value = new_url;
                }

            }, 12000);
        }
    });

    return thumbnail_url
}

// use Ref to make token_meta param stay reactive
export function useMediumThumbnail(token_meta: Ref<FirestoreDocument<TokenMeta>> ) {
    const thumbnail_url = ref(new URL(`../assets/logo.png`, import.meta.url).href);
    // needs to be watchEffect because we want it to trigger initially AND we want it to run again when the props.token_meta changes
    watchEffect(async () => {
        thumbnail_url.value = await getTokenMetaMediumImageURL(token_meta.value);
        // if firebase archive thumbnail is not found or medium thumbnail is not found, try again in 12 seconds
        if (thumbnail_url.value.includes("logo.png") || thumbnail_url.value.includes("thumb_")) {
            setTimeout(async () => {
                const new_url = await getTokenMetaMediumImageURL(token_meta.value);
                if(new_url != thumbnail_url.value) {
                    thumbnail_url.value = new_url;
                }
            }, 12000);
        }
    });

    return thumbnail_url
}