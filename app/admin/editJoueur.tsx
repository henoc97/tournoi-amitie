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
import { Edit, Save } from "lucide-react";
import { getEquipes } from "@/services/equipeService";
import { Equipe } from "@/entities/Equipe";
import { Joueur } from "@/entities/Joueur";
import { updateJoueur } from "@/services/joueurService";

type EditJoueurDialogProps = {
  joueur: Joueur;
  onJoueurUpdated?: () => void;
};

export default function EditJoueurDialog({
  joueur,
  onJoueurUpdated,
}: EditJoueurDialogProps) {
  const [form, setForm] = useState<Joueur>(joueur);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Recharger form quand on ouvre
  useEffect(() => {
    setForm(joueur);
  }, [joueur]);

  // Charger équipes
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
    if (!form.nom.trim() || !form.equipeId) {
      alert("Le nom et l'équipe sont obligatoires !");
      return;
    }

    setLoading(true);

    try {
      await updateJoueur(joueur.id!, {
        ...form,
        buts: Number(form.buts),
        passes: Number(form.passes),
        cartonsJaunes: Number(form.cartonsJaunes),
        cartonsRouges: Number(form.cartonsRouges),
        matchs: Number(form.matchs),
      });

      alert("Joueur mis à jour !");
      setOpen(false);
      onJoueurUpdated?.();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification du joueur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Edit className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier joueur </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label>Équipe </Label>
          <select
            value={form.equipeId}
            onChange={(e) => setForm({ ...form, equipeId: e.target.value })}
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value=""> --Sélectionnez une équipe-- </option>
            {equipes.map((equipe) => (
              <option key={equipe.id} value={equipe.id}>
                {equipe.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label>Nom </Label>
          <Input
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            placeholder="Ex. John Doe"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Buts </Label>
            <Input
              type="number"
              value={form.buts}
              onChange={(e) =>
                setForm({ ...form, buts: Number(e.target.value) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Passes </Label>
            <Input
              type="number"
              value={form.passes}
              onChange={(e) =>
                setForm({ ...form, passes: Number(e.target.value) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Cartons jaunes </Label>
            <Input
              type="number"
              value={form.cartonsJaunes}
              onChange={(e) =>
                setForm({
                  ...form,
                  cartonsJaunes: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Cartons rouges </Label>
            <Input
              type="number"
              value={form.cartonsRouges}
              onChange={(e) =>
                setForm({
                  ...form,
                  cartonsRouges: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Matchs joués </Label>
            <Input
              type="number"
              value={form.matchs}
              onChange={(e) =>
                setForm({ ...form, matchs: Number(e.target.value) })
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
