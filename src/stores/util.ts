import { getUniqueOpenseaID, type FirestoreDocument, type OpenseaToken, type TokenMeta, Blockchain, TokenPlatform } from "@/types/types"

export const convertOpenseaToTokenMeta = (o: OpenseaToken): FirestoreDocument<TokenMeta> => {
    return {
        id: getUniqueOpenseaID(o),
        entity: {
            name: o.name,
            artist: "",
            description: o.description,
            public_link: o.opensea_url,
            blockchain: Blockchain.Ethereum,
            asset_contract_address: o.contract,
            token_id: o.identifier,
            platform: TokenPlatform.Opensea,
            external_thumbnail_url: o.image_url,
            external_media_url: o.image_url,
        }
    } as FirestoreDocument<TokenMeta>
}
