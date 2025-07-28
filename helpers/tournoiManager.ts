import { getEquipes, getEquipesByPoule } from "@/services/equipeService";
import { getMatchs } from "@/services/matchService";
import { getPoules } from "@/services/pouleService";
import { PHASES } from "@/entities/phases";
import { Equipe } from "@/entities/Equipe";
import { ClassementItem, Poule } from "@/entities/Poule";
import { Match } from "@/entities/Match";

export class TournoiManager {
    /** 🔁 Méthode 1 - Récupérer les équipes d’une poule donnée */
    async getEquipesByPouleId(pouleId: string): Promise<Equipe[]> {
        return await getEquipesByPoule(pouleId);
    }

    /** 🎯 Méthode 2 - Récupérer les 2 premiers de chaque poule pour les quarts */
    async getQualifiesPourQuarts(): Promise<Equipe[]> {
        const poules = await getPoules();
        const matchs = await getMatchs();
        const equipes = await getEquipes();
        const resultats: Equipe[] = [];

        for (const poule of poules) {
            const classement = this.calculerClassementPoule(poule.id!, matchs, equipes);
            const top2 = classement.slice(0, 2);

            top2.forEach(item => {
                const eq = equipes.find(e => e.id === item.equipeId);
                if (eq) resultats.push(eq);
            });
        }

        return resultats;
    }

    /** 🥈 Méthode 3 - Obtenir les qualifiés pour les demi-finales */
    async getQualifiesPourDemi(): Promise<Equipe[]> {
        return await this.getGagnantsDePhase("QUART");
    }

    /** 🥇 Méthode 4 - Obtenir les qualifiés pour la finale */
    async getQualifiesPourFinale(): Promise<Equipe[]> {
        return await this.getGagnantsDePhase("DEMI");
    }

    /** 📊 Méthode 5 - Classement des équipes par poule en temps réel */
    async getClassementParPoule(): Promise<{ poule: Poule; classement: ClassementItem[] }[]> {
        const poules = await getPoules();
        const matchs = await getMatchs();
        const equipes = await getEquipes();

        return poules.map(poule => ({
            poule,
            classement: this.calculerClassementPoule(poule.id!, matchs, equipes)
        }));
    }

    /** 🔧 Utilitaire interne - Calcul de classement pour une poule spécifique */
    private calculerClassementPoule(
        pouleId: string,
        matchs: Match[],
        equipes: Equipe[]
    ): ClassementItem[] {
        const equipesPoule = equipes.filter(e => e.pouleId === pouleId);
        const matchsPoule = matchs.filter(
            m => m.pouleId === pouleId && m.phase === "POULE" && m.termine && m.score
        );

        const classement: Record<string, ClassementItem> = {};

        for (const equipe of equipesPoule) {
            classement[equipe.id] = {
                equipeId: equipe.id,
                equipeNom: equipe.nom,
                position: 0,
                points: 0,
                joues: 0,
                gagnes: 0,
                nuls: 0,
                perdus: 0,
                butsPour: 0,
                butsContre: 0,
                difference: 0
            };
        }

        for (const match of matchsPoule) {
            const { domicile, exterieur } = match.equipes;
            const { domicile: scoreDom, exterieur: scoreExt } = match.score!;

            const equipeDom = classement[domicile.id];
            const equipeExt = classement[exterieur.id];

            equipeDom.joues += 1;
            equipeExt.joues += 1;

            equipeDom.butsPour += scoreDom;
            equipeDom.butsContre += scoreExt;
            equipeExt.butsPour += scoreExt;
            equipeExt.butsContre += scoreDom;

            if (scoreDom > scoreExt) {
                equipeDom.points += 3;
                equipeDom.gagnes += 1;
                equipeExt.perdus += 1;
            } else if (scoreExt > scoreDom) {
                equipeExt.points += 3;
                equipeExt.gagnes += 1;
                equipeDom.perdus += 1;
            } else {
                equipeDom.points += 1;
                equipeExt.points += 1;
                equipeDom.nuls += 1;
                equipeExt.nuls += 1;
            }
        }

        for (const item of Object.values(classement)) {
            item.difference = item.butsPour - item.butsContre;
        }

        const classementArray = Object.values(classement).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.difference !== a.difference) return b.difference - a.difference;
            return b.butsPour - a.butsPour;
        });

        classementArray.forEach((item, index) => {
            item.position = index + 1;
        });

        return classementArray;
    }

    /** 🧠 Utilitaire - Gagnants d’une phase (quart, demi, etc.) */
    private async getGagnantsDePhase(phase: string): Promise<Equipe[]> {
        const matchs = await getMatchs();
        const equipes = await getEquipes();

        const gagnants: Equipe[] = [];

        const matchsPhase = matchs.filter(m => m.phase === phase && m.termine && m.score);

        for (const match of matchsPhase) {
            const { domicile, exterieur } = match.equipes;
            const { domicile: scoreDom, exterieur: scoreExt } = match.score!;
            let gagnantId: string | null = null;

            if (scoreDom > scoreExt) gagnantId = domicile.id;
            else if (scoreExt > scoreDom) gagnantId = exterieur.id;

            if (gagnantId) {
                const gagnant = equipes.find(e => e.id === gagnantId);
                if (gagnant) gagnants.push(gagnant);
            }
        }

        return gagnants;
    }
}
