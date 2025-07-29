"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Match } from "@/entities/Match";

interface MatchCardProps {
  match: Match;
  className?: string;
}

export default function MatchCard({ match, className }: MatchCardProps) {
  const isToday =
    new Date(match.date).toDateString() === new Date().toDateString();

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{match.heure}</span>
            {isToday && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Aujourd'hui
              </Badge>
            )}
          </div>
          <Badge
            variant={match.termine ? "default" : "outline"}
            className={match.termine ? "bg-blue-100 text-blue-800" : ""}
          >
            {match.phase === "groupes" ? "Phase de poules" : match.phase}
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-center flex-1">
            <div className="font-medium text-gray-900 mb-1">
              {match.equipes.domicile.nom}
            </div>
            <div className="w-8 h-8 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <Trophy className="h-4 w-4 text-blue-600" />
            </div>
          </div>

          <div className="px-4">
            {match.termine && match.score ? (
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {match.score.domicile} - {match.score.exterieur}
                </div>
                <div className="text-xs text-gray-500 mt-1">Terminé</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-xl font-medium text-gray-400">VS</div>
                <div className="text-xs text-gray-500 mt-1">{match.heure}</div>
              </div>
            )}
          </div>

          <div className="text-center flex-1">
            <div className="font-medium text-gray-900 mb-1">
              {match.equipes.exterieur.nom}
            </div>
            <div className="w-8 h-8 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <Trophy className="h-4 w-4 text-red-600" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
