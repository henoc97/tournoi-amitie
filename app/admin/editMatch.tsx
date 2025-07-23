"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { updateMatch } from "@/services/matchService";

export default function EditMatchDialog({
  match,
  open,
  onOpenChange,
  onMatchUpdated,
}: {
  match: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMatchUpdated?: () => void;
}) {
  const [values, setValues] = useState({ ...match });
  const [loading, setLoading] = useState(false);

  // Recharger quand on change de match
  useEffect(() => {
    setValues(match);
  }, [match]);

  const handleSave = async () => {
    if (!values.date || !values.heure) {
      alert("La date et l'heure sont obligatoires !");
      return;
    }

    setLoading(true);

    try {
      await updateMatch(match.id!, {
        date: values.date,
        heure: values.heure,
      });

      alert("Match mis à jour !");
      onOpenChange(false);
      onMatchUpdated?.();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour du match.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le match</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Heure</Label>
          <Input
            type="time"
            value={values.heure}
            onChange={(e) => setValues({ ...values, heure: e.target.value })}
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
