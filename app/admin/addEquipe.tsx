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
import { createEquipe } from "@/services/equipeService";
import { getPoules, updatePoule } from "@/services/pouleService";
import { ClassementItem, Poule } from "@/entities/Poule";

type AddEquipeDialogProps = {
  onEquipeCreated?: () => void;
};

export default function AddEquipeDialog({
  onEquipeCreated,
}: AddEquipeDialogProps) {
  const [newEquipe, setNewEquipe] = useState({
    nom: "",
    pouleId: "",
    ville: "",
  });

  const [poules, setPoules] = useState<Poule[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Charger les poules au montage
  useEffect(() => {
    const fetchPoules = async () => {
      try {
        const data = await getPoules();
        setPoules(data);
      } catch (error) {
        console.error("Erreur en récupérant les poules", error);
      }
    };

    fetchPoules();
  }, []);

  const handleSave = async () => {
    if (!newEquipe.nom.trim() || !newEquipe.pouleId) {
      alert("Le nom et la poule sont obligatoires !");
      return;
    }

    setLoading(true);

    try {
      const docRef = await createEquipe(newEquipe);

      const poule = poules.find((p) => p.id === newEquipe.pouleId);
      if (!poule) {
        throw new Error("Poule introuvable !");
      }

      const newClassementItem: ClassementItem = {
        position: poule.classement?.length + 1 || 1,
        equipeId: docRef.id,
        points: 0,
        joues: 0,
        gagnes: 0,
        nuls: 0,
        perdus: 0,
        butsPour: 0,
        butsContre: 0,
        difference: 0,
      };

      const classementActuel = Array.isArray(poule.classement)
        ? poule.classement
        : [];
      const newClassement = [...classementActuel, newClassementItem];

      await updatePoule(poule.id!, { classement: newClassement });

      alert("Équipe ajoutée et classement mis à jour !");
      setOpen(false); // Ferme le modal
      setNewEquipe({
        nom: "",
        pouleId: "",
        ville: "",
      });
      onEquipeCreated?.();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de l'équipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle équipe
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle équipe</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label>Nom de l'équipe</Label>
          <Input
            value={newEquipe.nom}
            onChange={(e) =>
              setNewEquipe({ ...newEquipe, nom: e.target.value })
            }
            placeholder="Ex. FC Lions"
          />
        </div>

        <div className="space-y-2">
          <Label>Poule</Label>
          <select
            value={newEquipe.pouleId}
            onChange={(e) =>
              setNewEquipe({ ...newEquipe, pouleId: e.target.value })
            }
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="">-- Sélectionnez une poule --</option>
            {poules.map((poule) => (
              <option key={poule.id} value={poule.id}>
                {poule.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Ville</Label>
          <Input
            value={newEquipe.ville}
            onChange={(e) =>
              setNewEquipe({ ...newEquipe, ville: e.target.value })
            }
            placeholder="Ex. Lomé"
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
