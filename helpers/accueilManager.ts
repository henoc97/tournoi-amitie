import { getEquipes } from "@/services/equipeService";
import { getMatchs } from "@/services/matchService";
import { getJoueurs } from "@/services/joueurService";

import { Joueur } from "@/entities/Joueur";
import { Match } from "@/entities/Match";

export class AccueilManager {
    async getProchainsMatchs(): Promise<Match[]> {
        const matchs = await getMatchs();
        const now = new Date();

        return matchs
            .filter((m) => !m.termine)
            .filter((m) => {
                const matchDate = new Date(`${m.date}T${m.heure}`);
                return matchDate > now;
            })
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.heure}`);
                const dateB = new Date(`${b.date}T${b.heure}`);
                return dateA.getTime() - dateB.getTime();
            })
            .slice(0, 3);
    }

    async getDerniersResultats(): Promise<Match[]> {
        const matchs = await getMatchs();
        return matchs
            .filter((m) => m.termine && m.score)
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.heure}`);
                const dateB = new Date(`${b.date}T${b.heure}`);
                return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 3);
    }

    async getTopButeurs(): Promise<Joueur[]> {
        const joueurs = await getJoueurs();
        return joueurs
            .filter((j) => j.buts && j.buts > 0)
            .sort((a, b) => (b.buts ?? 0) - (a.buts ?? 0))
            .slice(0, 3);
    }

    async getStats(): Promise<{
        equipes: number;
        matchs: number;
        buts: number;
    }> {
        const equipes = await getEquipes();
        const matchs = await getMatchs();

        const buts = matchs.reduce((total, match) => {
            if (match.score) {
                return total + match.score.domicile + match.score.exterieur;
            }
            return total;
        }, 0);

        return {
            equipes: equipes.length,
            matchs: matchs.filter((m) => m.termine).length,
            buts,
        };
    }
}


