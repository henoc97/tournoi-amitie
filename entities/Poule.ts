export interface ClassementItem {
    position: number;
    equipeId: string;
    equipeNom?: string;
    points: number;
    joues: number;
    gagnes: number;
    nuls: number;
    perdus: number;
    butsPour: number;
    butsContre: number;
    difference: number;
}

export interface Poule {
    id?: string;
    nom: string;
    classement: ClassementItem[];
}
