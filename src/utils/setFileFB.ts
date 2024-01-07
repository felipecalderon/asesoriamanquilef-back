import { ref, uploadBytes, StorageReference, FirebaseStorage, getDownloadURL } from "firebase/storage";

export const subirPDFaFirebase = async (pdfData: Buffer, nombreArchivo: string, storage: FirebaseStorage): Promise<string> => {
    const storageRef: StorageReference = ref(storage, `docs/${nombreArchivo}`);
    try {
        await uploadBytes(storageRef, pdfData);
        const url = getDownloadURL(storageRef)
        return url
    } catch (error) {
        console.error("Error al subir el archivo: ", error);
        throw error;
    }
};