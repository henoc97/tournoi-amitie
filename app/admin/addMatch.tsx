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
import { PHASES } from "@/entities/phases";
import { Equipe } from "@/entities/Equipe";
import { Poule } from "@/entities/Poule";
import { TournoiManager } from "@/helpers/tournoiManager";
import { getPoules } from "@/services/pouleService";

const manager = new TournoiManager();

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

  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [poules, setPoules] = useState<Poule[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Charger les poules une seule fois
  useEffect(() => {
    const loadPoules = async () => {
      const allPoules = await getPoules();
      setPoules(allPoules);
    };
    loadPoules();
  }, []);

  // Charger les équipes selon la phase/poule
  useEffect(() => {
    const loadEquipes = async () => {
      if (newMatch.phase === "POULE" && newMatch.pouleId) {
        const equipes = await manager.getEquipesByPouleId(newMatch.pouleId);
        setEquipes(equipes);
      } else if (newMatch.phase === "QUART") {
        const equipes = await manager.getQualifiesPourQuarts();
        setEquipes(equipes);
      } else if (newMatch.phase === "DEMI") {
        const equipes = await manager.getQualifiesPourDemi();
        setEquipes(equipes);
      } else if (newMatch.phase === "FINALE") {
        const equipes = await manager.getQualifiesPourFinale();
        setEquipes(equipes);
      } else {
        setEquipes([]);
      }
    };
    loadEquipes();
  }, [newMatch.phase, newMatch.pouleId]);

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
          <Plus className="h-4 w-4 mr-2" /> Nouveau match
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouveau match</DialogTitle>
        </DialogHeader>

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

        {newMatch.phase === "POULE" && (
          <div className="space-y-2">
            <Label>Poule</Label>
            <select
              value={newMatch.pouleId}
              onChange={(e) =>
                setNewMatch({ ...newMatch, pouleId: e.target.value })
              }
              className="w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">-- Sélectionner une poule --</option>
              {poules.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nom}
                </option>
              ))}
            </select>
          </div>
        )}

        {equipes.length > 0 && (
          <>
            <div className="space-y-2">
              <Label>Équipe domicile</Label>
              <select
                value={newMatch.domicile.id}
                onChange={(e) => {
                  const selected = equipes.find(
                    (eq) => eq.id === e.target.value
                  );
                  setNewMatch({
                    ...newMatch,
                    domicile: selected || { id: "", nom: "" },
                  });
                }}
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="">-- Sélectionner l'équipe domicile --</option>
                {equipes.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nom}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Équipe extérieur</Label>
              <select
                value={newMatch.exterieur.id}
                onChange={(e) => {
                  const selected = equipes.find(
                    (eq) => eq.id === e.target.value
                  );
                  setNewMatch({
                    ...newMatch,
                    exterieur: selected || { id: "", nom: "" },
                  });
                }}
                className="w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="">-- Sélectionner l'équipe extérieur --</option>
                {equipes
                  .filter((e) => e.id !== newMatch.domicile.id)
                  .map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nom}
                    </option>
                  ))}
              </select>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={newMatch.date}
            onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
          />
        </div>

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
