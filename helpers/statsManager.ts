// src/managers/StatsManager.ts

import { getEquipeById } from "@/services/equipeService";
import { getJoueurs } from "@/services/joueurService";


export interface Buteur {
    id: string;
    nom: string;
    equipeId: string;
    equipe: string;
    buts: number;
    matchs: number;
    moyenne: number;
}

export interface Passeur {
    id: string;
    nom: string;
    equipeId: string;
    equipe: string;
    passes: number;
    matchs: number;
    moyenne: number;
}

export interface Carton {
    id: string;
    nom: string;
    equipeId: string;
    equipe: string;
    jaunes: number;
    rouges: number;
    total: number;
    matchs: number;
}

export interface EquipeFairPlay {
    equipeId: string;
    equipe: string;
    totalJaunes: number;
    totalRouges: number;
    totalCartons: number;
}

export class StatsManager {
    static async getClassementButeurs(): Promise<Buteur[]> {
        const joueurs = await getJoueurs();

        const buteurs = joueurs.filter((j) => (j.buts ?? 0) > 0);

        const buteursAvecEquipes = await Promise.all(
            buteurs.map(async (j) => {
                const equipe = await getEquipeById(j.equipeId);
                return {
                    id: j.id,
                    nom: j.nom,
                    equipeId: j.equipeId,
                    equipe: equipe ? equipe.nom : "Inconnu",
                    buts: j.buts ?? 0,
                    matchs: j.matchs ?? 0,
                    moyenne: j.matchs && j.matchs > 0 ? (j.buts ?? 0) / j.matchs : 0,
                };
            })
        );

        buteursAvecEquipes.sort((a, b) => b.buts - a.buts);

        return buteursAvecEquipes.map((b, index) => ({ ...b, position: index + 1 }));
    }


    static async getClassementPasseurs(): Promise<Passeur[]> {
        const joueurs = await getJoueurs();

        const passeurs = joueurs
            .filter((j) => (j.passes ?? 0) > 0);

        const passeursAvecEquipes = await Promise.all(
            passeurs.map(async (j) => {
                const equipe = await getEquipeById(j.equipeId);
                return {
                    id: j.id,
                    nom: j.nom,
                    equipeId: j.equipeId,
                    equipe: equipe ? equipe.nom : "Inconnu",
                    passes: j.passes ?? 0,
                    matchs: j.matchs ?? 0,
                    moyenne: j.matchs && j.matchs > 0 ? (j.passes ?? 0) / j.matchs : 0,
                };
            })
        );

        passeursAvecEquipes.sort((a, b) => b.passes - a.passes);

        return passeursAvecEquipes.map((p, index) => ({ ...p, position: index + 1 }));
    }


    static async getClassementCartons(): Promise<Carton[]> {
        const joueurs = await getJoueurs();

        const cartons = joueurs.filter(
            (j) => (j.cartonsJaunes ?? 0) > 0 || (j.cartonsRouges ?? 0) > 0
        );

        const cartonsAvecEquipes = await Promise.all(
            cartons.map(async (j) => {
                const equipe = await getEquipeById(j.equipeId);
                return {
                    id: j.id,
                    nom: j.nom,
                    equipeId: j.equipeId,
                    equipe: equipe ? equipe.nom : "Inconnu",
                    jaunes: j.cartonsJaunes ?? 0,
                    rouges: j.cartonsRouges ?? 0,
                    total: (j.cartonsJaunes ?? 0) + (j.cartonsRouges ?? 0),
                    matchs: j.matchs ?? 0,
                };
            })
        );

        cartonsAvecEquipes.sort((a, b) => b.total - a.total);

        return cartonsAvecEquipes.map((c, index) => ({ ...c, position: index + 1 }));
    }

    static async getTotalButs() {
        const joueurs = await getJoueurs();
        return joueurs.reduce((total, j) => total + (j.buts ?? 0), 0);
    }

    static async getTotalPasses() {
        const joueurs = await getJoueurs();
        return joueurs.reduce((total, j) => total + (j.passes ?? 0), 0);
    }

    static async getTotalCartonsJaunes() {
        const joueurs = await getJoueurs();
        return joueurs.reduce((total, j) => total + (j.cartonsJaunes ?? 0), 0);
    }

    static async getTotalCartonsRouges() {
        const joueurs = await getJoueurs();
        return joueurs.reduce((total, j) => total + (j.cartonsRouges ?? 0), 0);
    }
}
