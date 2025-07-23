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


// 🔥 Exemple de mise à jour du classement :
export const updateClassement = async (
    pouleId: string,
    phase: string,
    equipes: {
        domicile: {
            id: string;
            nom: string
        }; exterieur: {
            id: string;
            nom: string
        }
    },
    score: { domicile: number; exterieur: number },
    termine: boolean
) => {
    if (!termine) return; // Mettre à jour seulement si match terminé

    const pouleRef = doc(db, "poules", pouleId);
    const pouleSnap = await getDoc(pouleRef);

    if (!pouleSnap.exists()) throw new Error("Poule non trouvée");

    const pouleData = pouleSnap.data() as Poule;
    const classement = [...pouleData.classement];


    const _domicile = classement.find((c) => c.equipeId === equipes.domicile.id);
    const _exterieur = classement.find((c) => c.equipeId === equipes.exterieur.id);

    const domicile: ClassementItem = {
        ..._domicile!,
        equipeNom: equipes.domicile.nom || "Équipe Domicile",
    };
    const exterieur: ClassementItem = {
        ..._exterieur!,
        equipeNom: equipes.domicile.nom || "Équipe Domicile",
    };

    if (!domicile || !exterieur) throw new Error("Equipes non trouvées dans le classement");

    // Incrément des matches joués
    domicile.joues += 1;
    exterieur.joues += 1;

    // Ajout des buts
    domicile.butsPour += score.domicile;
    domicile.butsContre += score.exterieur;

    exterieur.butsPour += score.exterieur;
    exterieur.butsContre += score.domicile;

    domicile.difference = domicile.butsPour - domicile.butsContre;
    exterieur.difference = exterieur.butsPour - exterieur.butsContre;

    // Calcul Win/Draw/Loss + points
    if (score.domicile > score.exterieur) {
        domicile.gagnes += 1;
        exterieur.perdus += 1;
        domicile.points += 3;
    } else if (score.exterieur > score.domicile) {
        exterieur.gagnes += 1;
        domicile.perdus += 1;
        exterieur.points += 3;
    } else {
        domicile.nuls += 1;
        exterieur.nuls += 1;
        domicile.points += 1;
        exterieur.points += 1;
    }

    if (phase === PHASES.find(p => p.value === "POULE")?.value) {
        // Re-ordonner par points, puis diff de buts si égalité
        classement.sort((a, b) => {
            if (b.points === a.points) {
                return b.difference - a.difference;
            }
            return b.points - a.points;
        });

        // Mettre à jour les positions
        classement.forEach((item, index) => {
            item.position = index + 1;
        });
    }

    // ✅ Sauvegarde
    await updateDoc(pouleRef, { classement });

    console.log("Classement mis à jour");
};