import { Timestamp } from "firebase/firestore"

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
    address: string; // ethereum account address
    signature: string; // encoded signature created when user first signs into the app
    //admin: boolean;
    //saved_display_ids: Array<string>; // if user is an admin, devices can be saved here and remembered even if another user has assumed control of the device
}

// Plaque is a Moda plaque display which show art and the metadata in TokenMeta
export interface Plaque extends BaseDocument {
    name: string; // name of plaque, given by user in order to remember 
    account_id: string; // document id of account currently paired with display, empty if no user is paired
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
    account_id?: string; // document id of account
    blockchain?: string; // ethereum, off-chain
    asset_contract_address?: string; // contract address for ethereum token
    token_id?: string; // token id for ethereum token
}




