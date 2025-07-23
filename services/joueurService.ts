import { db } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { Joueur } from "@/entities/Joueur";

const joueursCollection = collection(db, "joueurs");

export const getJoueurs = async (): Promise<Joueur[]> => {
    const snapshot = await getDocs(joueursCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Joueur));
};

export const getJoueursByEquipe = async (equipeId: string): Promise<Joueur[]> => {
    const q = query(joueursCollection, where("equipeId", "==", equipeId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Joueur));
};

export const createJoueur = async (joueur: Omit<Joueur, "id">) => {
    return await addDoc(joueursCollection, joueur);
};

export const updateJoueur = async (id: string, data: Partial<Joueur>) => {
    const ref = doc(db, "joueurs", id);
    await updateDoc(ref, data);
};

// ❌ Supprimer un joueur
export const deleteJoueur = async (id: string) => {
    const ref = doc(db, "joueurs", id);
    await deleteDoc(ref);
};
