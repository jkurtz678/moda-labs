import { BaseEntity, type FirestoreDocument, type Plaque } from "@/types/types"
import firebaseConfig from "../firebaseConfig"
import { getFirestore } from "firebase/firestore";
import { collection, getDoc, where, query, doc, onSnapshot, updateDoc, addDoc } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const plaques_ref = collection(db, "plaque")

// getPlaquesByUserIDWithListener returns a list of plaques for a given user id
export const getPlaquesByUserIDWithListener = async (user_id: string, onChange: (arr: Array<FirestoreDocument<Plaque>>) => void) => {
    const q = query(plaques_ref, where("user_id", "==", user_id));
    const unsubscribe = await onSnapshot(q, (query_snapshot) => {
        const plaques: FirestoreDocument<Plaque>[] = [];
        query_snapshot.forEach((doc) => {
            plaques.push({ id: doc.id, entity: doc.data() as Plaque })
        })
        onChange(plaques)
    })
};

// getPlaquesByUserIDListWithListener returns a list of plaques for a given user id
export const getPlaquesByUserIDListWithListener = async (user_id_list: string[], onChange: (arr: Array<FirestoreDocument<Plaque>>) => void) => {
    const q = query(plaques_ref, where("user_id", "in", user_id_list));
    const unsubscribe = await onSnapshot(q, (query_snapshot) => {
        const plaques: FirestoreDocument<Plaque>[] = [];
        query_snapshot.forEach((doc) => {
            plaques.push({ id: doc.id, entity: doc.data() as Plaque })
        })
        onChange(plaques)
    })
};

// createPlaque creates a new plaque
export const createPlaque = async (plaque: Plaque): Promise<FirestoreDocument<Plaque>> => {
    const document = await addDoc(plaques_ref, {
        ...BaseEntity.createBaseEntity(),
        ...plaque
    })
    const snapshot = await getDoc(document)
    return { id: snapshot.id, entity: snapshot.data() as Plaque }
}

// updatePlaque updates a plaque
export const updatePlaque = async (plaque_id: string, update_data: Partial<Plaque>): Promise<FirestoreDocument<Plaque>> => {
    const ref = doc(db, "plaque", plaque_id)
    await updateDoc(ref, update_data)
    const snapshot = await getDoc(ref)
    return { id: snapshot.id, entity: snapshot.data() as Plaque }
}