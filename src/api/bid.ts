import firebaseConfig from "../firebaseConfig"
import { getFirestore } from "firebase/firestore";
import type { FirestoreDocument, Bid} from "@/types/types";
import { BaseEntity } from "@/types/types";
import { collection, where, addDoc, getDoc, query, onSnapshot } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const bid_ref = collection(db, "bid");

// getBidListByTokenMetaIDWithListener returns a list of bids that match the given token meta id, uses firebase listener callback
export const getBidListByTokenMetaIDWithListener = async (token_meta_id: string, onChange: (arr: Array<FirestoreDocument<Bid>>) => void) => {
    const q = query(bid_ref, where("token_meta_id", "==", token_meta_id));
    const unsubscribe = await onSnapshot(q, (query_snapshot) => {
        const bids: FirestoreDocument<Bid>[] = [];
        query_snapshot.forEach((doc) => {
            bids.push({ id: doc.id, entity: doc.data() as Bid })
        })
        onChange(bids)
    })
}

// createBid will add a new firestore record for the given bid and return the newly created record now with an id
export const createBid = async (bid: Bid): Promise<FirestoreDocument<Bid>> => {
    const document = await addDoc(bid_ref, {
        ...BaseEntity.createBaseEntity(),
        ...bid
    })
    const snapshot = await getDoc(document)
    return { id: document.id, entity: snapshot.data() as Bid }
}

// getAllBidsWithListener returns a list of all bids with a firebase listener callback
export const getAllBidsWithListener = async (onChange: (arr: FirestoreDocument<Bid>[]) => void) => {
    const unsubscribe = await onSnapshot(query(bid_ref), (query_snapshot) => {
        const bids: FirestoreDocument<Bid>[] = [];
        query_snapshot.forEach((doc) => {
            bids.push({ id: doc.id, entity: doc.data() as Bid})
        })
        onChange(bids)
    })
}