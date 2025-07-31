"use client";

import { useState, useEffect } from "react";
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
import { createJoueur } from "@/services/joueurService";
import { getEquipes } from "@/services/equipeService";
import { Equipe } from "@/entities/Equipe";

type AddJoueurDialogProps = {
  onJoueurCreated?: () => void;
};

export default function AddJoueurDialog({
  onJoueurCreated,
}: AddJoueurDialogProps) {
  const [newJoueur, setNewJoueur] = useState({
    nom: "",
    equipeId: "",
    buts: 0,
    passes: 0,
    cartonsJaunes: 0,
    cartonsRouges: 0,
    matchs: 0,
  });

  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Charger les équipes au montage
  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const data = await getEquipes();
        data.sort((a, b) => a.nom.localeCompare(b.nom));
        setEquipes(data);
      } catch (error) {
        console.error("Erreur en récupérant les équipes", error);
      }
    };

    fetchEquipes();
  }, []);

  const handleSave = async () => {
    if (!newJoueur.nom.trim() || !newJoueur.equipeId) {
      alert("Le nom et l'équipe sont obligatoires !");
      return;
    }

    setLoading(true);

    try {
      await createJoueur({
        nom: newJoueur.nom,
        equipeId: newJoueur.equipeId,
        buts: Number(newJoueur.buts),
        passes: Number(newJoueur.passes),
        cartonsJaunes: Number(newJoueur.cartonsJaunes),
        cartonsRouges: Number(newJoueur.cartonsRouges),
        matchs: Number(newJoueur.matchs),
      });

      alert("Joueur ajouté !");
      setOpen(false);
      setNewJoueur({
        nom: "",
        equipeId: "",
        buts: 0,
        passes: 0,
        cartonsJaunes: 0,
        cartonsRouges: 0,
        matchs: 0,
      });
      onJoueurCreated?.();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du joueur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau joueur
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouveau joueur</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label>Équipe</Label>
          <select
            value={newJoueur.equipeId}
            onChange={(e) =>
              setNewJoueur({ ...newJoueur, equipeId: e.target.value })
            }
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="">-- Sélectionnez une équipe --</option>
            {equipes.map((equipe) => (
              <option key={equipe.id} value={equipe.id}>
                {equipe.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Nom</Label>
          <Input
            value={newJoueur.nom}
            onChange={(e) =>
              setNewJoueur({ ...newJoueur, nom: e.target.value })
            }
            placeholder="Ex. John Doe"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Buts</Label>
            <Input
              type="number"
              value={newJoueur.buts}
              onChange={(e) =>
                setNewJoueur({ ...newJoueur, buts: Number(e.target.value) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Passes</Label>
            <Input
              type="number"
              value={newJoueur.passes}
              onChange={(e) =>
                setNewJoueur({ ...newJoueur, passes: Number(e.target.value) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Cartons jaunes</Label>
            <Input
              type="number"
              value={newJoueur.cartonsJaunes}
              onChange={(e) =>
                setNewJoueur({
                  ...newJoueur,
                  cartonsJaunes: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Cartons rouges</Label>
            <Input
              type="number"
              value={newJoueur.cartonsRouges}
              onChange={(e) =>
                setNewJoueur({
                  ...newJoueur,
                  cartonsRouges: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Matchs joués</Label>
            <Input
              type="number"
              value={newJoueur.matchs}
              onChange={(e) =>
                setNewJoueur({ ...newJoueur, matchs: Number(e.target.value) })
              }
            />
          </div>
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
