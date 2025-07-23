export interface Match {
    id: string;
    date: string;
    heure: string;
    phase: string;
    pouleId?: string;
    equipes: {
        domicile: {
            id: string;
            nom: string;
        };
        exterieur: {
            id: string;
            nom: string;
        };
    };
    score?: {
        domicile: number;
        exterieur: number;
    };
    termine: boolean;
}
