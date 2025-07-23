import { db } from "./firebase";
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { Bracket } from "@/entities/Bracket";

const bracketDoc = doc(db, "phasesFinales", "bracket");

// 🔍 Récupérer le bracket complet
export const getBracket = async (): Promise<Bracket | null> => {
    const snapshot = await getDoc(bracketDoc);
    if (!snapshot.exists()) return null;
    return snapshot.data() as Bracket;
};

// 💾 Créer ou remplace le bracket complet
export const createOrUpdateBracket = async (bracket: Bracket) => {
    await setDoc(bracketDoc, bracket);
};

// 🔄 Mettre à jour une phase spécifique
export const updateBracketPhase = async (phase: keyof Bracket, data: any) => {
    await updateDoc(bracketDoc, { [phase]: data });
};

export const deleteBracket = async () => {
    await deleteDoc(bracketDoc);
};
