import { db } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { ClassementItem, Poule } from "@/entities/Poule";
import { PHASES } from "@/entities/phases";

const poulesCollection = collection(db, "poules");

// 🔍 Lire toutes les poules
export const getPoules = async (): Promise<Poule[]> => {
    const snapshot = await getDocs(poulesCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Poule));
};

// ➕ Créer une poule
export const createPoule = async (poule: Omit<Poule, "id">) => {
    return await addDoc(poulesCollection, poule);
};

// 🔄 Mettre à jour une poule
export const updatePoule = async (id: string, data: Partial<Poule>) => {
    const ref = doc(db, "poules", id);
    await updateDoc(ref, data);
};

// ❌ Supprimer une poule
export const deletePoule = async (id: string) => {
    const ref = doc(db, "poules", id);
    await deleteDoc(ref);
};