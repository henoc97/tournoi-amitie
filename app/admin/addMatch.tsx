"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save } from "lucide-react";
import { createMatch } from "@/services/matchService";
import { getPoules } from "@/services/pouleService";
import { getEquipesByPoule } from "@/services/equipeService";
import { PHASES } from "@/entities/phases";
import { ClassementItem } from "@/entities/Poule";

type Poule = {
  id: string;
  nom: string;
  classement: ClassementItem[];
};

type Equipe = {
  id: string;
  nom: string;
  pairEquipe?: { id: string; nom: string };
};

type AddMatchDialogProps = {
  onMatchCreated?: () => void;
};

export default function AddMatchDialog({
  onMatchCreated,
}: AddMatchDialogProps) {
  const [newMatch, setNewMatch] = useState({
    date: "",
    heure: "",
    domicile: { id: "", nom: "" },
    exterieur: { id: "", nom: "" },
    phase: "",
    pouleId: "",
  });

  const [poules, setPoules] = useState<Poule[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Charger toutes les poules une fois pour les poules classiques
  useEffect(() => {
    const fetchPoules = async () => {
      const res = await getPoules();
      setPoules(res as Poule[]);
    };
    fetchPoules();
  }, []);

  // Charger les équipes si phase de poule
  useEffect(() => {
    if (newMatch.phase === "POULE" && newMatch.pouleId) {
      const fetchEquipes = async () => {
        const res = await getEquipesByPoule(newMatch.pouleId);
        setEquipes(res);
      };
      fetchEquipes();
    } else if (newMatch.phase === "QUART") {
      fetchQuartEquipes();
    } else {
      setEquipes([]);
    }
  }, [newMatch.phase, newMatch.pouleId]);

  // Fonction pour préparer les quarts
  const fetchQuartEquipes = async () => {
    const poulesRes = await getPoules();
    // poulesRes.sort((a, b) => a.nom.localeCompare(b.nom));
    const poules = poulesRes as Poule[];
    const paires: { poule1: Poule; poule2: Poule }[] = [];

    for (let i = 0; i < poules.length; i += 2) {
      if (i + 1 < poules.length) {
        paires.push({ poule1: poules[i], poule2: poules[i + 1] });
      }
    }

    const candidats: Equipe[] = [];

    paires.forEach(({ poule1, poule2 }) => {
      const p1 = poule1.classement.find((c) => c.position === 1);
      const d2 = poule2.classement.find((c) => c.position === 2);

      const p2 = poule2.classement.find((c) => c.position === 1);
      const d1 = poule1.classement.find((c) => c.position === 2);

      if (p1 && d2) {
        candidats.push({
          id: p1.equipeId,
          nom: `1er ${poule1.nom}`,
          pairEquipe: {
            id: d2.equipeId,
            nom: `2e ${poule2.nom}`,
          },
        });
      }

      if (p2 && d1) {
        candidats.push({
          id: p2.equipeId,
          nom: `1er ${poule2.nom}`,
          pairEquipe: {
            id: d1.equipeId,
            nom: `2e ${poule1.nom}`,
          },
        });
      }
    });

    setEquipes(candidats);
  };

  const handleSave = async () => {
    if (
      !newMatch.date ||
      !newMatch.heure ||
      !newMatch.domicile.id ||
      !newMatch.exterieur.id
    ) {
      alert("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    setLoading(true);

    try {
      await createMatch({
        date: newMatch.date,
        heure: newMatch.heure,
        phase: newMatch.phase,
        pouleId: newMatch.pouleId || "0",
        equipes: {
          domicile: newMatch.domicile,
          exterieur: newMatch.exterieur,
        },
        termine: false,
      });

      alert("Match créé !");
      setOpen(false);
      setNewMatch({
        date: "",
        heure: "",
        domicile: { id: "", nom: "" },
        exterieur: { id: "", nom: "" },
        phase: "",
        pouleId: "",
      });
      setEquipes([]);
      onMatchCreated?.();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du match.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau match
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouveau match</DialogTitle>
        </DialogHeader>

        {/* Phase */}
        <div className="space-y-2">
          <Label>Phase</Label>
          <select
            value={newMatch.phase}
            onChange={(e) =>
              setNewMatch({
                ...newMatch,
                phase: e.target.value,
                pouleId: "",
                domicile: { id: "", nom: "" },
                exterieur: { id: "", nom: "" },
              })
            }
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="">-- Sélectionner une phase --</option>
            {PHASES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Poule */}
        {newMatch.phase === "POULE" && (
          <div className="space-y-2">
            <Label>Poule</Label>
            <select
              value={newMatch.pouleId}
              onChange={(e) =>
                setNewMatch({
                  ...newMatch,
                  pouleId: e.target.value,
                  domicile: { id: "", nom: "" },
                  exterieur: { id: "", nom: "" },
                })
              }
              className="w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">-- Sélectionner une poule --</option>
              {poules.map((poule) => (
                <option key={poule.id} value={poule.id}>
                  {poule.nom}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Équipe domicile */}
        {equipes.length > 0 && (
          <div className="space-y-2">
            <Label>Équipe domicile</Label>
            <select
              value={newMatch.domicile.id}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedEquipe = equipes.find(
                  (eq) => eq.id === selectedId
                );
                if (!selectedEquipe) return;

                let exterieur = { id: "", nom: "" };
                if (newMatch.phase === "QUART" && selectedEquipe.pairEquipe) {
                  exterieur = {
                    id: selectedEquipe.pairEquipe.id,
                    nom: selectedEquipe.pairEquipe.nom,
                  };
                }

                setNewMatch({
                  ...newMatch,
                  domicile: { id: selectedEquipe.id, nom: selectedEquipe.nom },
                  exterieur,
                });
              }}
              className="w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">-- Choisir l'équipe domicile --</option>
              {equipes.map((equipe) => (
                <option key={equipe.id} value={equipe.id}>
                  {equipe.nom}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Équipe extérieur */}
        {equipes.length > 0 && newMatch.domicile.id && (
          <div className="space-y-2">
            <Label>Équipe extérieur</Label>
            <select
              value={newMatch.exterieur.id}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedEquipe = equipes.find(
                  (eq) => eq.id === selectedId
                );
                if (selectedEquipe) {
                  setNewMatch({
                    ...newMatch,
                    exterieur: {
                      id: selectedEquipe.id,
                      nom: selectedEquipe.nom,
                    },
                  });
                }
              }}
              className="w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">-- Choisir l'équipe extérieur --</option>
              {equipes
                .filter((e) => e.id !== newMatch.domicile.id)
                .map((equipe) => (
                  <option key={equipe.id} value={equipe.id}>
                    {equipe.nom}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Date */}
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={newMatch.date}
            onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
          />
        </div>

        {/* Heure */}
        <div className="space-y-2">
          <Label>Heure</Label>
          <Input
            type="time"
            value={newMatch.heure}
            onChange={(e) =>
              setNewMatch({ ...newMatch, heure: e.target.value })
            }
          />
        </div>

        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          onClick={handleSave}
          disabled={loading}
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Enregistrement..." : "Sauvegarder"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
