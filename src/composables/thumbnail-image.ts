import { watchEffect, ref } from "vue"
import { getTokenMetaThumbnailImageURL, type FirestoreDocument, type TokenMeta } from "@/types/types"

export default function useThumbnail(token_meta: FirestoreDocument<TokenMeta>) {
    const thumbnail_url = ref(new URL(`../assets/logo.png`, import.meta.url).href);
    // needs to be watchEffect because we want it to trigger initially AND we want it to run again when the props.token_meta changes
    watchEffect(async () => {
        thumbnail_url.value = await getTokenMetaThumbnailImageURL(token_meta);
        // if firebase archive thumbnail is not found, try again in 5 seconds
        if (thumbnail_url.value.includes("logo.png")) {
            setTimeout(async () => {
                thumbnail_url.value = await getTokenMetaThumbnailImageURL(token_meta);
            }, 12000);
        }
    });

    return thumbnail_url
}