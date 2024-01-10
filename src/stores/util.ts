import { getUniqueOpenseaID, type FirestoreDocument, type OpenseaToken, type TokenMeta, Blockchain, TokenPlatform } from "@/types/types"

export const convertOpenseaToTokenMeta = (o: OpenseaToken): FirestoreDocument<TokenMeta> => {
    return {
        id: getUniqueOpenseaID(o),
        entity: {
            name: o.name,
            artist: o.creator?.user?.username || "N/A",
            description: o.description,
            public_link: o.permalink,
            blockchain: Blockchain.Ethereum,
            asset_contract_address: o.asset_contract.address,
            token_id: o.token_id,
            platform: TokenPlatform.Opensea,
            external_thumbnail_url: o.image_thumbnail_url,
            external_media_url: o.animation_url ? o.animation_url : o.image_url,
        }
    } as FirestoreDocument<TokenMeta>
}
