import firebaseConfig from "../firebaseConfig"
import type { FirestoreDocument, SalesInquiry} from "@/types/types";
import { BaseEntity } from "@/types/types";
import { addDoc, collection, getDoc, getFirestore } from "firebase/firestore"

const db = getFirestore(firebaseConfig)
const sales_inquiry_ref= collection(db, "sales-inquiry");

export const createSalesInquiry = async (sales_inquiry: SalesInquiry): Promise<FirestoreDocument<SalesInquiry>> => { 
    const document = await addDoc(sales_inquiry_ref, {
        ...BaseEntity.createBaseEntity(),
        ...sales_inquiry
    })
    const snapshot = await getDoc(document)
    return { id: document.id, entity: snapshot.data() as SalesInquiry }
}