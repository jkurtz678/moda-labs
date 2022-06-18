import { Timestamp } from "firebase/firestore"
import type { StringFormat } from "firebase/storage";

// BaseDocument contains fields that all firestore documents should include
export interface BaseDocument {
    created_at: Timestamp;
    updated_at: Timestamp;
}

// BaseEntity contains functions for creating/updating generic entity objects
export class BaseEntity {

    static createBaseEntity(): BaseDocument {
        const now = Timestamp.now();

        return { created_at: now, updated_at: now };
    }

    static updateBaseEntity(): Partial<BaseDocument> {
        const now = Timestamp.now();

        return { updated_at: now }
    }
}

// FirestoreDocuments are records stored in firestore.
// acts as a wrapper entities stored in firestore.
// e.g. FirestoreDocument<TokenMeta> = {
//   id: document_id,
//   entity: {...token meta fields}
// }
export interface FirestoreDocument<Entity extends BaseDocument> {
    id: string; // unique document id of the firestore document
    entity: Entity; // generic type, any type that extends BaseDocument (Account, Plaque, TokenMeta)
}

// Account is a user account, created when a user first signs into the app through metamask
export interface Account extends BaseDocument {
    wallet_address: string; // ethereum account address
    signature: string; // encoded signature created when user first signs into the app
    ens_name?: string; // ens (ethereum name service) name if it exists, e.g. natemohler.eth
    //admin: boolean;
    //saved_display_ids: Array<string>; // if user is an admin, devices can be saved here and remembered even if another user has assumed control of the device
}

// Plaque is a Moda plaque display which show art and the metadata in TokenMeta
export interface Plaque extends BaseDocument {
    name: string; // name of plaque, given by user in order to remember 
    wallet_address: string; // address of web3 account currently paired with display, empty if no user is paired
    token_meta_id_list: string[]; // list of TokenMeta document ids, plaque will attempt to download and play this art in order
}

// TokenMeta contains metadata about a token stored in the archive
export interface TokenMeta extends BaseDocument {
    name: string; // name of piece
    artist?: string; // name of artist
    description?: string; // description of artwork
    public_link?: string; // link to public site for art, such as opensea listing. Embedded in plaque qr code link
    media_id: string; // uid of media in firebase storage
    media_type: string; // file extension of media e.g. .mp4
    wallet_address?: string; // wallet address from the associated account 
    blockchain?: Blockchain; // ethereum, off-chain
    asset_contract_address?: string; // contract address for ethereum token
    token_id?: string; // token id for ethereum token
    platform: TokenPlatform; // token id for ethereum token
    thumbnail_url?: string; // url to thumbnail image 
    media_url?: string; // url to media
}

export enum Blockchain {
    Ethereum = "ethereum", // nft on ethereum blockchain, has a asset_contract_adress and token_id that can link it to the token on ethereum
    OffChain = "off-chain" // off chain art, stored in moda archive but cannot be found on chain
}

export enum TokenPlatform {
    Archive = "archive", // tokens uploaded directly to the moda archive 
    Opensea = "opensea", // token from opensea api, not stored in moda archive
    OpenseaArchive = "opensea_archive" // token from opensea api that has been added to moda archive
}

// OpenseaToken is the structure of tokens returned from the opensea API
export interface OpenseaToken {
    image_url: string;
    image_thumbnail_url: string;
    animation_url: string;
    name: string;
    asset_contract: { address: string; };
    token_id: string;
    description: string;
    permalink: string;
    creator: { user: {username: string}};
    orders: Array<any>;
    external_link: string; 
}

// getUniqueOpenseaID returns a unique identifier for opensea tokens
export function getUniqueOpenseaID(opensea_token: OpenseaToken): string {
    return `${opensea_token.asset_contract.address}/${opensea_token.token_id}`
}

export function getTokenMetaUniqueChainID(t: FirestoreDocument<TokenMeta>): string {
    return `${t.entity.asset_contract_address}/${t.entity.token_id}`
}