"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { createPoule } from "@/services/pouleService";
import { Poule } from "@/entities/Poule";

type AddPouleDialogProps = {
  onPouleCreated?: () => void;
};

export default function AddPouleDialog({
  onPouleCreated,
}: AddPouleDialogProps) {
  const [newPoule, setNewPoule] = useState({
    nom: "",
    classement: [],
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!newPoule.nom.trim()) {
      alert("Veuillez saisir un nom de poule.");
      return;
    }

    setLoading(true);

    try {
      await createPoule(newPoule as Poule); // Appel Firestore
      alert("Poule créée !");
      setOpen(false); // Ferme le modal
      setNewPoule({ nom: "", classement: [] });
      onPouleCreated?.();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de la poule.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle poule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle poule</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label>Nom</Label>
          <Input
            value={newPoule.nom}
            onChange={(e) => setNewPoule({ ...newPoule, nom: e.target.value })}
            placeholder="Ex. Poule A"
          />
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 mt-4"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Enregistrement..." : "Sauvegarder"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
