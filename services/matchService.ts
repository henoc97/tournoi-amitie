import { db } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Match } from "@/entities/Match";

const matchsCollection = collection(db, "matchs");

export const getMatchs = async (): Promise<Match[]> => {
    const snapshot = await getDocs(matchsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));
};

export const createMatch = async (match: Omit<Match, "id">) => {
    return await addDoc(matchsCollection, match);
};

export const updateMatch = async (id: string, data: Partial<Match>) => {
    const ref = doc(db, "matchs", id);
    await updateDoc(ref, data);
};

// ❌ Supprimer un match
export const deleteMatch = async (id: string) => {
    const ref = doc(db, "matchs", id);
    await deleteDoc(ref);
};
