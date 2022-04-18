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
}