
import { BaseEntity, type FirestoreDocument, type Gallery } from "@/types/types"
import { addDoc, doc, getDoc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig"
import { collection, query, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const gallery_ref = collection(db, "gallery")

// getGalleriesForUserIDWithListener returns a list of galleries for a given user id
export const getGalleriesForUserIDWithListener = async (user_id: string, onChange: (galleries: FirestoreDocument<Gallery>[]) => void): Promise<void> => {
    const unsubscribe = await onSnapshot(query(gallery_ref), (query_snapshot) => {
        const galleries = query_snapshot.docs.map(s => ({
            id: s.id, entity: s.data() as Gallery,
        }))
        onChange(galleries.filter(g => g?.entity?.user_id_list?.includes(user_id)));
    })
}


// saveGallery saves a gallery to the database
export const saveGallery = async (gallery: Gallery): Promise<FirestoreDocument<Gallery>> => {
    const document = await addDoc(gallery_ref, {
        ...BaseEntity.createBaseEntity(),
        ...gallery
    })    
    const snapshot = await getDoc(document)
    return { id: snapshot.id, entity: snapshot.data() as Gallery }
}

// updateGallery updates a gallery in the database
export const updateGallery = async (gallery_id: string, gallery: Partial<Gallery>): Promise<FirestoreDocument<Gallery>> => {
    await setDoc(doc(db, "gallery", gallery_id), gallery)
    const snapshot = await getDoc(doc(db, "gallery", gallery_id))
    return { id: snapshot.id, entity: snapshot.data() as Gallery }
}
