import { watchEffect, ref, type Ref } from "vue"
import { getTokenMetaMediumImageURL, type FirestoreDocument, type TokenMeta } from "@/types/types"

// use Ref to make token_meta param stay reactive
export default function useThumbnail(token_meta: Ref<FirestoreDocument<TokenMeta>> ) {
    const thumbnail_url = ref(new URL(`../assets/logo.png`, import.meta.url).href);
    // needs to be watchEffect because we want it to trigger initially AND we want it to run again when the props.token_meta changes
    watchEffect(async () => {
        thumbnail_url.value = await getTokenMetaMediumImageURL(token_meta.value);
        // if firebase archive thumbnail is not found, try again in 5 seconds
        if (thumbnail_url.value.includes("logo.png")) {
            setTimeout(async () => {
                thumbnail_url.value = await getTokenMetaMediumImageURL(token_meta.value);
            }, 12000);
        }
    });

    return thumbnail_url
}