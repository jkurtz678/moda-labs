import { Timestamp } from "firebase/firestore"

export interface BaseDocument {
    created_at: Timestamp;
    updated_at: Timestamp;
}

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

export interface FirestoreDocument<Entity extends BaseDocument> {
    entity: Entity;
    id: string;
}

export interface TokenMeta extends BaseDocument {
    name: string;
    artist?: string;
    description?: string;
    public_link?: string;
    media_id: string;
    media_type: string; 
}

export interface Plaque extends BaseDocument {
    name: string;
    account_id: string;
    token_meta_id_list: string[];
}

export interface Account extends BaseDocument {
    address: string;
    signature: string; 
    admin: boolean;
    saved_display_ids: Array<string>; // if user is an admin, devices can be saved here and remembered even if another user has assumed control of the device
}