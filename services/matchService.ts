import { db } from "./firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Match } from "@/entities/Match";

const matchsCollection = collection(db, "matchs");

export const getMatchs = async (): Promise<Match[]> => {
    const snapshot = await getDocs(matchsCollection);
    const matchs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));

    matchs.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.heure}`);
        const dateB = new Date(`${b.date}T${b.heure}`);
        return dateA.getTime() - dateB.getTime();
    });

    return matchs;
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


/**
   * Récupère tous les matchs et les trie par phase
   */
export const getMatchsParPhase = async (): Promise<{
    poules: Match[];
    quarts: Match[];
    demies: Match[];
    finale: Match[];
}> => {
    const matchs = await getMatchs();

    const poules = matchs.filter((m) =>
        m.phase.toLowerCase().includes("poule")
    );

    const quarts = matchs.filter((m) =>
        m.phase.toLowerCase().includes("quart")
    );

    const demies = matchs.filter((m) =>
        m.phase.toLowerCase().includes("demi")
    );

    const finale = matchs.filter((m) =>
        m.phase.toLowerCase().includes("finale")
    );

    return {
        poules,
        quarts,
        demies,
        finale,
    };
}