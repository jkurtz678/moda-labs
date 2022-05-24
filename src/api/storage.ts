import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const storage = getStorage();

export const uploadFile = async (file_name: string, file: File, progressCallback: (progress: number) => void, successCallback: () => void) => {
    console.log("uploadFile - starting file upload for ", file_name);
    const storage_ref = ref(storage, file_name)
    const upload_task = uploadBytesResumable(storage_ref, file);

    upload_task.on('state_changed',
        (snapshot) => {
            console.log("snapshot", snapshot.bytesTransferred, snapshot.totalBytes)
            progressCallback((snapshot.bytesTransferred / snapshot.totalBytes))
        },
        err => {
            console.log("uploadFile error - ", err)
        },
        () => {
            console.log("SUCCESS CALLBACK")
            successCallback();
        }
    )
}