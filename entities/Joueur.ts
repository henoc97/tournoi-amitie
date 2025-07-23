export interface Joueur {
    id: string;
    nom: string;
    equipeId: string;
    buts?: number;
    passes?: number;
    cartonsJaunes?: number;
    cartonsRouges?: number;
    matchs?: number;
}
