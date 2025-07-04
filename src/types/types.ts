import { Timestamp } from "firebase/firestore"
import { getDownloadURL, getStorage, ref } from "firebase/storage";

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
    email: string;
    wallet_address?: string; // ethereum account address
    signature?: string; // encoded signature created when user first signs into the app
    ens_name?: string; // ens (ethereum name service) name if it exists, e.g. natemohler.eth
    //admin: boolean;
    //saved_display_ids: Array<string>; // if user is an admin, devices can be saved here and remembered even if another user has assumed control of the device
}

// Plaque is a Moda plaque display which show art and the metadata in TokenMeta
export interface Plaque extends BaseDocument {
    name: string; // name of plaque, given by user in order to remember 
    user_id: string; // user id of user currently paired with display, empty if no user is paired
    token_meta_id_list: string[]; // list of TokenMeta document ids, plaque will attempt to download and play this art in order
    orientation: OrientationType;
    command: Command;
    machine_data: MachineData;
    last_check_in_time: Timestamp;
    vpn_active: boolean;
    uploaded_log_files?: UploadedLogFile[];
    free_space: number; // number of bytes free on the plaque
    local_media_list: PlaqueLocalMedia[];
}

// PlaqueLocalMedia is a media file stored on the plaque
export interface PlaqueLocalMedia {
    file_name: string;
    total_bytes: number;
    bytes_downloaded: number;
}

// UploadedLogFile is a log file uploaded from a plaque
export interface UploadedLogFile {
    file_name: string;
    bytes: number
    UploadTime: Timestamp;
}

export interface Command {
    type: string;
    time_sent: Timestamp;
}

export interface MachineData {
    machine_name: string;
    version: string;
    local_ip: string;
    public_ip: string;
    updated_at: Timestamp;
}

export enum OrientationType {
    Landscape = "landscape" ,
    Portrait = "portrait",
    LandscapeReversed = "landscape_reversed",
    PortraitReversed = "portrait_reversed"
}


// TokenMeta contains metadata about a token stored in the archive
export interface TokenMeta extends BaseDocument {
    name: string; // name of piece
    artist?: string; // name of artist
    artist_social_link?: string; // social media url for artist
    description?: string; // description of artwork
    public_link?: string; // link to public site for art, such as opensea listing. Embedded in plaque qr code link
    media_id: string; // uid of media in firebase storage
    media_type: string; // file extension of media e.g. .mp4
    browser_media_url: string; // browser based art url
    user_id?: string; // wallet address from the associated account 
    blockchain?: Blockchain; // ethereum, off-chain
    asset_contract_address?: string; // contract address for ethereum token
    token_id?: string; // token id for ethereum token
    platform: TokenPlatform; // token id for ethereum token
    external_thumbnail_url?: string; // url to thumbnail image from outside moda archives (e.g. from opensea servers)
    external_media_url?: string; // url to media source file from outside moda archives (e.g. opensea servers)
    //starting_bid?: number; // optional starting bid for token in usd, if it is for sale
    aspect_ratio?: number
    deleted?: boolean; // if true this token meta has been soft deleted and wont be displayed in the UI
    media_size?: number; // size of media in bytes
    permission_to_sell?: boolean;
    price?: number;
    price_unit?: PriceUnit;
    iframe_purchase_url?: string; // url to iframe for purchasing the token, if it is for sale
}

export enum Blockchain {
    Ethereum = "ethereum", // nft on ethereum blockchain, has a asset_contract_adress and token_id that can link it to the token on ethereum
    OffChain = "off_chain" // off chain art, stored in moda archive but cannot be found on chain
}

export enum PriceUnit {
    USD = "usd",
    ETH = "eth"
}

export enum TokenPlatform {
    Archive = "archive", // tokens uploaded directly to the moda archive 
    Opensea = "opensea", // token from opensea api, not stored in moda archive
    OpenseaArchive = "opensea_archive", // token from opensea api that has been added to moda archive
    ArchiveDemo = "archive_demo" // tokens that are available to all users from the archive as demo art
}

// Gallery is a group of users and token metas
export interface Gallery extends BaseDocument {
    name: string;
    //user_id_list: string[];
    //plaque_id_list: string[];
    //token_meta_id_list: string[];
}

// GalleryTokenUser is a mapping between a gallery and a user
export interface GalleryUser extends BaseDocument {
    gallery_id: string;
    user_id: string;
    role: GalleryUserRole;
}

// GalleryUserRole is the role a user has in a gallery
export enum GalleryUserRole {
    Owner = "owner",
    Editor = "editor",
    Reader = "reader"
}

// GalleryPlaque is a mapping between a gallery and a plaque
export interface GalleryPlaque extends BaseDocument {
    gallery_id: string;
    plaque_id: string;
}

// GalleryTokenMeta is a mapping between a gallery and a token meta
export interface GalleryTokenMeta extends BaseDocument {
    gallery_id: string;
    token_meta_id: string;
}

// OpenseaToken is the structure of tokens returned from the opensea API
// export interface OpenseaTokenOld {
//     image_url: string;
//     image_thumbnail_url: string;
//     animation_url: string;
//     name: string;
//     asset_contract: { address: string; };
//     token_id: string;
//     description: string;
//     permalink: string;
//     creator: { user: { username: string } };
//     orders: Array<any>;
//     external_link: string;
// }

// OpenseaToken is the structure of tokens returned from the opensea API
export interface OpenseaToken {
    identifier: string;
    collection: string;
    contract: string;
    token_standard: string;
    name: string;
    description: string;
    image_url: string;
    metadata_url: string | null;
    opensea_url: string;
    updated_at: string;
    is_disabled: boolean;
    is_nsfw: boolean;
}

// getUniqueOpenseaID returns a unique identifier for opensea tokens
export function getUniqueOpenseaID(opensea_token: OpenseaToken): string {
    return `${opensea_token.contract}/${opensea_token.identifier}`
}

// getTokenMetaUniqueChainID returns a unique identifier for token metas that are on chain
export function getTokenMetaUniqueChainID(t: FirestoreDocument<TokenMeta>): string {
    return `${t.entity.asset_contract_address}/${t.entity.token_id}`
}

// getPlatformDisplay returns a string to display for the platform of a token
export function getPlatformDisplay(plat: TokenPlatform): string {
    switch (plat) {
        case TokenPlatform.Opensea:
            return "Opensea";
        case TokenPlatform.OpenseaArchive:
            return "Opensea Archive";
        default:
            return "Archive"
    }
}

export function priceDisplay(t: FirestoreDocument<TokenMeta>): string {
    if(!t?.entity?.price) {
        return ""
    }
    switch (t?.entity?.price_unit) {
        case PriceUnit.USD:
            return `$${t?.entity?.price}`
        case PriceUnit.ETH:
            return `${t?.entity?.price} ETH`
        default:
            return ""
    }
}

// getTokenMetaThumbnailImageURL returns the url to the thumbnail image for a token meta
export async function getTokenMetaThumbnailImageURL(token_meta: FirestoreDocument<TokenMeta>): Promise<string> {
    // first check if archive thumbnail image exist in firebase storage
    const storage = getStorage();
    const path_ref = ref(storage, `thumb_${token_meta.entity.media_id}.jpg`);
    try {
        const url = await getDownloadURL(path_ref)
        //console.log(`getTokenMetaThumbnailImageURL - found url for image ${token_meta.entity.name}`, url)
        return url
    } catch (err) {
        console.log(`getTokenMetaThumbnailImageURL - failed to find archive thumbnail image ${token_meta.entity.name}`, err)
    }


    // then we check external thumbnail url
    if (token_meta.entity.external_thumbnail_url) {
        return token_meta.entity.external_thumbnail_url
    }

    // if none found return moda logo as placeholder image
    return new URL(`../assets/logo.png`, import.meta.url).href
}

// Bid represents an individual bid for an art piece, associated with a token meta
export interface Bid extends BaseDocument{
    token_meta_id: string; // token_meta the bid is associated with
    phone_number: string; // phone number for contact
    email: string; // email for contact
    bidding_name: string; // public bidding name for display on plaque and form
    amount: number; // bid amount in usd 
    amount_unit: PriceUnit; // currency of bid amount
}
// getTokenMetaThumbnailImageURL returns the url to the thumbnail image for a token meta
export async function getTokenMetaMediumImageURL(token_meta: FirestoreDocument<TokenMeta>): Promise<string> {
    // first check if archive medium image exist in firebase storage
    const storage = getStorage();
    const medium_path_ref = ref(storage, `medium_${token_meta.entity.media_id}.jpg`);
    try {
        const url = await getDownloadURL(medium_path_ref)
        //console.log(`getTokenMetaThumbnailImageURL - found url for image ${token_meta.entity.name}`, url)
        return url
    } catch (err) {
        console.log(`getTokenMetaThumbnailImageURL - failed to find archive medium image ${token_meta.entity.name}`, err)
    }

    // then fallback to thumbnail if it exists
    const thumbnail_path_ref = ref(storage, `thumb_${token_meta.entity.media_id}.jpg`);
    try {
        const url = await getDownloadURL(thumbnail_path_ref)
        //console.log(`getTokenMetaThumbnailImageURL - found url for image ${token_meta.entity.name}`, url)
        return url
    } catch (err) {
        console.log(`getTokenMetaThumbnailImageURL - failed to find archive thumbnail image ${token_meta.entity.name}`, err)
    } 


    // then we check external thumbnail url
    if (token_meta.entity.external_thumbnail_url) {
        return token_meta.entity.external_thumbnail_url
    }

    // if none found return moda logo as placeholder image
    return new URL(`../assets/logo.png`, import.meta.url).href
}

export async function getSourceFile(token_meta: FirestoreDocument<TokenMeta>): Promise<string> {
    const storage = getStorage();
    let path;
    if(token_meta.entity?.media_id) {
        path = getTokenMetaFileName(token_meta)
    } else if (token_meta.entity?.external_media_url) {
        return token_meta.entity.external_media_url;
    }

    const path_ref = ref(storage, path);

    try {
        const url = await getDownloadURL(path_ref)
        return url
    } catch (err) {
        console.log(`getTokenMetaThumbnailImageURL - failed to find archive thumbnail image ${token_meta.entity.name}`, err)
    }
    return ""
}

export function getTokenMetaFileName(token_meta: FirestoreDocument<TokenMeta>): string {
    return `${token_meta.entity.media_id}${token_meta.entity.media_type}`
}

export async function getTokenMetaAnimationURL(token_meta: FirestoreDocument<TokenMeta>): Promise<string> {
    const storage = getStorage();

    // First check if user uploaded webp exists in Firebase Storage
     const user_upload_path_ref = ref(storage, `user-upload/user-upload_${token_meta.entity.media_id}.webp`);
    try {
        const url = await getDownloadURL(user_upload_path_ref);
        return url;
    } catch (err) {
        console.log(`getTokenMetaMediumImageURL - failed to find tile image ${token_meta.entity.name}`, err);
    }

    // next best is tile image
    const tile_path_ref = ref(storage, `tile/tile_${token_meta.entity.media_id}.webp`);
    try {
        const url = await getDownloadURL(tile_path_ref);
        return url;
    } catch (err) {
        console.log(`getTokenMetaMediumImageURL - failed to find tile image ${token_meta.entity.name}`, err);
    }

    // Fallback to medium image
    const medium_path_ref = ref(storage, `medium_${token_meta.entity.media_id}.jpg`);
    try {
        const url = await getDownloadURL(medium_path_ref);
        return url;
    } catch (err) {
        console.log(`getTokenMetaMediumImageURL - failed to find medium image ${token_meta.entity.name}`, err);
    }

    // Then fallback to thumbnail if it exists
    const thumbnail_path_ref = ref(storage, `thumb_${token_meta.entity.media_id}.jpg`);
    try {
        const url = await getDownloadURL(thumbnail_path_ref);
        return url;
    } catch (err) {
        console.log(`getTokenMetaMediumImageURL - failed to find thumbnail image ${token_meta.entity.name}`, err);
    }

    // Check external thumbnail URL
    if (token_meta.entity.external_thumbnail_url) {
        return token_meta.entity.external_thumbnail_url;
    }

    // Return placeholder image as a last resort
    return new URL(`../assets/logo.png`, import.meta.url).href;
}

// SalesInquiry represents an inquiry about the sale of a token meta
export interface SalesInquiry extends BaseDocument {
    token_meta_id: string; // ID of the token meta the inquiry is associated with
    phone_number: string; // contact phone number of the inquirer
    email: string; // contact email of the inquirer
    name: string; // name of the inquirer
    message: string; // message from the inquirer
}