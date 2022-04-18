import firebaseConfig from "../firebaseConfig"
import { getFirestore } from "firebase/firestore";
import type { TokenMeta, FirestoreDocument } from "@/types/types";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { BaseEntity } from "@/types/types";

const db = getFirestore(firebaseConfig)

export const createTokenMeta = async (meta: TokenMeta): Promise<FirestoreDocument<TokenMeta>> => {
    const document = await addDoc(collection(db, "token-meta"), {
        ...BaseEntity.createBaseEntity(),
        ...meta
    })
    const snapshot = await getDoc(document)
    return { id: document.id, entity: snapshot.data() as TokenMeta }
}