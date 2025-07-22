export interface Equipe {
  id: string;
  nom: string;
  logoUrl?: string;
  pouleId: string;
  couleurPrincipale?: string;
}

export interface Joueur {
  id: string;
  nom: string;
  prenom: string;
  equipeId: string;
  numero?: number;
  buts: number;
  passes: number;
  cartonJaunes: number;
  cartonRouges: number;
}

export interface Match {
  id: string;
  date: string;
  heure: string;
  terrain: string;
  pouleId?: string;
  phase: 'groupes' | '1/16' | '1/8' | '1/4' | '1/2' | 'finale';
  equipes: {
    domicile: string;
    exterieur: string;
  };
  score: {
    domicile: number;
    exterieur: number;
  };
  termine: boolean;
  buteurs: Array<{
    joueurId: string;
    minute: number;
  }>;
  passeurs: Array<{
    joueurId: string;
    minute: number;
  }>;
}

export interface Poule {
  id: string;
  nom: string;
  equipes: string[];
  classement: Array<{
    teamId: string;
    points: number;
    joues: number;
    gagnes: number;
    nuls: number;
    perdus: number;
    butsPour: number;
    butsContre: number;
    difference: number;
  }>;
}

export interface PhaseFinale {
  id: string;
  phase: '1/16' | '1/8' | '1/4' | '1/2' | 'finale';
  matchId: string;
  equipes: [string, string];
  vainqueurId?: string;
  position: number;
}

export interface Tournoi {
  id: string;
  nom: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  description?: string;
  statut: 'preparation' | 'en_cours' | 'termine';
}