
import { BaseEntity, type FirestoreDocument, type Gallery } from "@/types/types"
import { Timestamp, addDoc, doc, documentId, getDoc, getFirestore, onSnapshot, setDoc, updateDoc, where } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig"
import { collection, query, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseConfig)
const gallery_ref = collection(db, "gallery")

// // getGalleriesForUserIDWithListener returns a list of galleries for a given user id
// export const getGalleriesForUserIDWithListener = async (user_id: string, onChange: (galleries: FirestoreDocument<Gallery>[]) => void): Promise<void> => {
//     const unsubscribe = await onSnapshot(query(gallery_ref), (query_snapshot) => {
//         const galleries = query_snapshot.docs.map(s => ({
//             id: s.id, entity: s.data() as Gallery,
//         }))
//         onChange(galleries.filter(g => g?.entity?.user_id_list?.includes(user_id)));
//     })
// }

// getAllGalleries returns a list of all galleries
export const getAllGalleries = async (): Promise<FirestoreDocument<Gallery>[]> => {
    const query_snapshot = await getDocs(gallery_ref)
    return query_snapshot.docs.map(s => ({
        id: s.id, entity: s.data() as Gallery,
    }))
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
export const updateGallery = async (gallery_id: string, update_data: Partial<Gallery>): Promise<FirestoreDocument<Gallery>> => {
    update_data.updated_at = Timestamp.now();
    const ref = doc(db, "gallery", gallery_id)
    await updateDoc(ref, update_data)
    const snapshot = await getDoc(ref);
    return { id: snapshot.id, entity: snapshot.data() as Gallery }
}

// getGalleryByID returns a gallery by id
export const getGalleryByID = async (gallery_id: string): Promise<FirestoreDocument<Gallery>> => {
    const snapshot = await getDoc(doc(db, "gallery", gallery_id))
    return { id: snapshot.id, entity: snapshot.data() as Gallery }
}

// // getGalleryListByGalleryIDList returns a list of galleries for a given list of gallery ids
export const getGalleryListByGalleryIDList = async (gallery_id_list: string[]): Promise<FirestoreDocument<Gallery>[]> => {
    const q = query(gallery_ref, where(documentId(), "in", gallery_id_list));
    const query_snapshot = await getDocs(q)
    return query_snapshot.docs.map(s => ({
        id: s.id, entity: s.data() as Gallery,
    }))
}


// // addTokenToGallery adds a token to a gallery
// export const addTokenToGallery = async (gallery_id: string, token_meta_id: string): Promise<FirestoreDocument<Gallery>> => {
//     const gallery = await getGalleryByID(gallery_id);
//     return await updateGallery(gallery_id,
//         { token_meta_id_list: [...gallery.entity.token_meta_id_list, token_meta_id] }
//     );
// }
