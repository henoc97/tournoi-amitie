"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { getJoueursByEquipe } from "@/services/joueurService";
import { updateMatch } from "@/services/matchService";
import { updateJoueur } from "@/services/joueurService";
import { updateClassement } from "@/services/pouleService";
import { Match } from "@/entities/Match";

export default function LiveMatchDialog({
  match,
  open,
  onOpenChange,
  onMatchUpdated,
}: {
  match: Match;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMatchUpdated?: () => void;
}) {
  const [score, setScore] = useState({
    domicile: match.score?.domicile || 0,
    exterieur: match.score?.exterieur || 0,
  });
  const [termine, setTermine] = useState(match.termine || false);

  const [equipeSelectionnee, setEquipeSelectionnee] = useState<
    "domicile" | "exterieur"
  >("domicile");
  const [joueurs, setJoueurs] = useState<any[]>([]);
  const [buteur, setButeur] = useState("");
  const [passeur, setPasseur] = useState("");
  const [carton, setCarton] = useState<{ joueurId: string; type: string }>({
    joueurId: "",
    type: "jaune",
  });

  // Charger joueurs quand l’équipe sélectionnée change
  useEffect(() => {
    const equipeId =
      equipeSelectionnee === "domicile"
        ? match.equipes.domicile.id
        : match.equipes.exterieur.id;

    if (!equipeId) {
      console.warn("Pas d'équipe ID pour getJoueursByEquipe !");
      return; // ⏪ Ne lance pas la requête Firestore si pas d'ID.
    }

    const fetch = async () => {
      const data = await getJoueursByEquipe(equipeId);
      setJoueurs(data);
    };
    fetch();
  }, [equipeSelectionnee, match]);

  useEffect(() => {
    if (open) {
      setScore({
        domicile: match.score?.domicile || 0,
        exterieur: match.score?.exterieur || 0,
      });
      setTermine(match.termine || false);
      setEquipeSelectionnee("domicile");
      setButeur("");
      setPasseur("");
      setCarton({ joueurId: "", type: "jaune" });
    }
  }, [open, match]);

  const handleBut = () => {
    setScore({
      ...score,
      [equipeSelectionnee]: score[equipeSelectionnee] + 1,
    });
  };

  const handleSave = async () => {
    try {
      // ✅ MAJ du match
      await updateMatch(match.id, {
        score,
        termine,
      });

      // ✅ MAJ du buteur
      if (buteur) {
        await updateJoueur(buteur, { buts: 1 }); // ⏪ incrément côté service
      }
      if (passeur) {
        await updateJoueur(passeur, { passes: 1 });
      }

      // ✅ MAJ du carton
      if (carton.joueurId) {
        const key = carton.type === "rouge" ? "cartonsRouges" : "cartonsJaunes";
        await updateJoueur(carton.joueurId, { [key]: 1 });
      }

      // ✅ MAJ classement (logique à ajuster)
      await updateClassement(
        match.pouleId!,
        match.phase,
        match.equipes,
        score,
        termine
      );

      alert("Match mis à jour !");
      onOpenChange(false);
      onMatchUpdated?.();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour du match.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Match en direct</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <Label>Match terminé ?</Label>
          <Switch checked={termine} onCheckedChange={setTermine} />
        </div>

        <div className="text-center font-bold text-lg">
          {match.equipes.domicile.nom} {score.domicile} vs {score.exterieur}{" "}
          {match.equipes.exterieur.nom}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => setEquipeSelectionnee("domicile")}
            className={equipeSelectionnee === "domicile" ? "bg-yellow-400" : ""}
          >
            {match.equipes.domicile.nom}
          </Button>
          <Button
            onClick={() => setEquipeSelectionnee("exterieur")}
            className={
              equipeSelectionnee === "exterieur" ? "bg-yellow-400" : ""
            }
          >
            {match.equipes.exterieur.nom}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleBut}
            className="flex-1 bg-green-500 text-white"
          >
            +1 But{" "}
            {equipeSelectionnee === "domicile"
              ? match.equipes.domicile.nom
              : match.equipes.exterieur.nom}
          </Button>
          <Button
            onClick={() =>
              setScore({
                ...score,
                [equipeSelectionnee]: Math.max(
                  score[equipeSelectionnee] - 1,
                  0
                ),
              })
            }
            className="flex-1 bg-red-500 text-white"
          >
            -1 But{" "}
            {equipeSelectionnee === "domicile"
              ? match.equipes.domicile.nom
              : match.equipes.exterieur.nom}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Buteur</Label>
          <select
            value={buteur}
            onChange={(e) => setButeur(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Choisir buteur --</option>
            {joueurs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Passeur</Label>
          <select
            value={passeur}
            onChange={(e) => setPasseur(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Choisir passeur --</option>
            {joueurs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Carton</Label>
          <div className="flex gap-2">
            <select
              value={carton.joueurId}
              onChange={(e) =>
                setCarton({ ...carton, joueurId: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Joueur --</option>
              {joueurs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.nom}
                </option>
              ))}
            </select>
            <select
              value={carton.type}
              onChange={(e) => setCarton({ ...carton, type: e.target.value })}
              className="border rounded px-3 py-2"
            >
              <option value="jaune">Jaune</option>
              <option value="rouge">Rouge</option>
            </select>
          </div>
        </div>

        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900"
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-2" /> Sauvegarder
        </Button>
      </DialogContent>
    </Dialog>
  );
}
