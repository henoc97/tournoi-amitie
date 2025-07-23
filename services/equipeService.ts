import { db } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { Equipe } from "@/entities/Equipe";

const equipesCollection = collection(db, "equipes");

// 📄 Lire toutes les équipes
export const getEquipes = async (): Promise<Equipe[]> => {
    const snapshot = await getDocs(equipesCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Equipe));
};

// ➕ Créer une nouvelle équipe
export const createEquipe = async (equipe: Omit<Equipe, "id">) => {
    return await addDoc(equipesCollection, equipe);
};

// 🔄 Mettre à jour une équipe
export const updateEquipe = async (id: string, data: Partial<Equipe>) => {
    const ref = doc(db, "equipes", id);
    await updateDoc(ref, data);
};

// ❌ Supprimer une équipe
export const deleteEquipe = async (id: string) => {
    const ref = doc(db, "equipes", id);
    await deleteDoc(ref);
};

/**
 * 📌 Récupérer toutes les équipes d'une poule spécifique
 */
export const getEquipesByPoule = async (pouleId: string): Promise<Equipe[]> => {
    const q = query(equipesCollection, where("pouleId", "==", pouleId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Equipe[];
};