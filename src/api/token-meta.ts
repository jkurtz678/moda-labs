import firebaseConfig from "../firebaseConfig"
import { DocumentReference, getFirestore, setDoc, Timestamp} from "firebase/firestore";
import type { TokenMeta, FirestoreDocument } from "@/types/types";
import { collection, addDoc, getDocs, getDoc, documentId, doc, updateDoc, where, query, onSnapshot } from "firebase/firestore";
import { BaseEntity } from "@/types/types";

const db = getFirestore(firebaseConfig)
const token_meta_ref = collection(db, "token-meta")

// createTokenMeta will add a new firestore record for the given token meta and return the newly created record now with an id
export const createTokenMeta = async (meta: TokenMeta): Promise<FirestoreDocument<TokenMeta>> => {
    const document = await addDoc(token_meta_ref, {
        ...BaseEntity.createBaseEntity(),
        ...meta
    })
    const snapshot = await getDoc(document)
    return { id: document.id, entity: snapshot.data() as TokenMeta }
}

// getTokenMetaByID returns a single token meta ref by id
export const getTokenMetaDocumentRef = async (): Promise<DocumentReference> => {
    return doc(token_meta_ref);
}

// createTokenMetaWithReference will add a new firestore record for the given token meta ref
export const createTokenMetaWithReference = async (ref: DocumentReference, meta: TokenMeta): Promise<FirestoreDocument<TokenMeta>> => {
    await setDoc(ref, {
        ...BaseEntity.createBaseEntity(),
        ...meta
    })
    const snapshot = await getDoc(ref)
    return { id: ref.id, entity: snapshot.data() as TokenMeta }
}

// updateTokenMeta updates an existing token meta object
export const updateTokenMeta = async (token_meta_id: string, update_data: Partial<TokenMeta>): Promise<FirestoreDocument<TokenMeta>> => {
    update_data.updated_at = Timestamp.now();
    const ref = doc(db, "token-meta", token_meta_id)
    await updateDoc(ref, update_data)
    const snapshot = await getDoc(ref)
    return { id: snapshot.id, entity: snapshot.data() as TokenMeta }
}

// deleteTokenMeta deletes an existing token meta object using a soft delete flag
export const deleteTokenMeta = async (token_meta_id: string): Promise<void> => {
    const update_data: Partial<TokenMeta> = { deleted: true, updated_at: Timestamp.now()}
    const ref = doc(db, "token-meta", token_meta_id)
    await updateDoc(ref, update_data)
}

// getAllTokenMetasWithListener returns a list of all archive token metas with a firebase listener callback
export const getAllTokenMetasWithListener = async (onChange: (arr: FirestoreDocument<TokenMeta>[]) => void) => {
    const unsubscribe = await onSnapshot(query(token_meta_ref), (query_snapshot) => {
        const token_metas: FirestoreDocument<TokenMeta>[] = [];
        query_snapshot.forEach((doc) => {
            token_metas.push({ id: doc.id, entity: doc.data() as TokenMeta })
        })
        const filtered_tokens = token_metas.filter((token_meta) => !token_meta.entity.deleted);
        onChange(filtered_tokens)
    })
}

// getAllTokenMetasOnSaleWithListener loads all token metas with permission_to_sell = true
export const getAllTokenMetasOnSaleWithListener = async (onChange: (arr: FirestoreDocument<TokenMeta>[]) => void) => {
    const unsubscribe = await onSnapshot(query(token_meta_ref, where("permission_to_sell", "==", true)), (query_snapshot) => {
        const token_metas: FirestoreDocument<TokenMeta>[] = [];
        query_snapshot.forEach((doc) => {
            token_metas.push({ id: doc.id, entity: doc.data() as TokenMeta })
        })
        const filtered_tokens = token_metas.filter((token_meta) => !token_meta.entity.deleted);
        onChange(filtered_tokens)
    })
}

// getTokenMetasWithListener returns a list of archive token metas that match the given wallet address, uses firebase listener callback
export const getTokenMetaListByUserIDWithListener = async (user_id: string, onChange: (arr: Array<FirestoreDocument<TokenMeta>>) => void) => {
    const q = query(token_meta_ref, where("user_id", "==", user_id));
    const unsubscribe = await onSnapshot(q, (query_snapshot) => {
        const token_metas: FirestoreDocument<TokenMeta>[] = [];
        query_snapshot.forEach((doc) => {
            token_metas.push({ id: doc.id, entity: doc.data() as TokenMeta })
        })
        const filtered_tokens = token_metas.filter((token_meta) => !token_meta.entity.deleted);
        onChange(filtered_tokens)
    })
};

// getTokenMetaByIDWithListener returns a single token meta by id, uses firebase listener callback
export const getTokenMetaByIDWithListener = async (token_meta_id: string, onChange: (doc: FirestoreDocument<TokenMeta>) => void) => {
    const unsubscribe = await onSnapshot(doc(db, "token-meta", token_meta_id), (doc) => {
        onChange({ id: doc.id, entity: doc.data() as TokenMeta })
    })
}


/* export const getTokenMetaListByIDListWithListener = async (token_meta_id_list: string[], onChange: (arr: FirestoreDocument<TokenMeta>[]) => void) => {
    // in filters will error if array is empty
    if (token_meta_id_list.length == 0) {
        return;
    }
    const q = query(token_meta_ref, where(documentId(), "in", token_meta_id_list));
    const unsubscribe = await onSnapshot(q, (query_snapshot) => {
        const metas: FirestoreDocument<TokenMeta>[] = [];
        query_snapshot.forEach((doc) => {
            metas.push({ id: doc.id, entity: doc.data() as TokenMeta })
        })
        onChange(metas)
    })
} */ 

export const getTokenMetaListByIDList = async (token_meta_id_list: string[]): Promise<FirestoreDocument<TokenMeta>[]> => {
    // in filters will error if array is empty
    if (token_meta_id_list.length == 0) {
        return [];
    }
    const q = query(token_meta_ref, where(documentId(), "in", token_meta_id_list));
    const query_snapshot = await getDocs(q);
    const metas: FirestoreDocument<TokenMeta>[] = [];
    query_snapshot.forEach((doc) => {
        metas.push({ id: doc.id, entity: doc.data() as TokenMeta })
    })
    const filtered_metas = metas.filter((token_meta) => !token_meta.entity.deleted);
    return filtered_metas;
}
