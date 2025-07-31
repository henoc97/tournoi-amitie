"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import MatchCard from "@/components/ui/match-card";
import { Calendar, Clock, MapPin, Filter } from "lucide-react";
import { Match } from "@/entities/Match";
import { getMatchs } from "@/services/matchService";
import { PHASES } from "@/entities/phases";

export default function MatchsPage() {
  const [selectedPhase, setSelectedPhase] = useState<string>("ALL");
  const [selectedTab, setSelectedTab] = useState<string>("aujourdhui");
  const [allMatchs, setAllMatchs] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatchs = async () => {
      const matchs = await getMatchs();

      setAllMatchs(matchs);
    };

    fetchMatchs();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const matchsAujourdhui = allMatchs.filter((match) => match.date === today);
  const prochains = allMatchs.filter(
    (match) => match.date > today && !match.termine
  );
  const termines = allMatchs.filter((match) => match.termine);

  const phases = [{ label: "Tous les matchs", value: "ALL" }, ...PHASES];

  const filteredMatchs =
    selectedPhase === "ALL"
      ? allMatchs
      : allMatchs.filter((match) =>
          (match.phase || "")
            .toLowerCase()
            .includes(selectedPhase.toLowerCase())
        );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
          <Calendar className="h-8 w-8 mr-0 sm:mr-3 mb-2 sm:mb-0" />
          <h1 className="text-3xl font-bold">Calendrier des Matchs</h1>
        </div>
        <p className="text-lg opacity-90">Tous les matchs du tournoi</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtrer par phase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {phases.map((phase) => (
              <Badge
                key={phase.value}
                variant={selectedPhase === phase.value ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedPhase(phase.value);
                  setSelectedTab("tous");
                }}
              >
                {phase.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="aujourdhui">Aujourd'hui</TabsTrigger>
          <TabsTrigger value="prochains">À venir</TabsTrigger>
          <TabsTrigger value="resultats">Résultats</TabsTrigger>
          <TabsTrigger value="tous">Tous</TabsTrigger>
        </TabsList>

        <TabsContent value="aujourdhui" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Matchs d'aujourd'hui ({matchsAujourdhui.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {matchsAujourdhui.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchsAujourdhui.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucun match prévu aujourd'hui</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prochains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Matchs à venir ({prochains.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prochains.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resultats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Résultats ({termines.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {termines.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tous" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Tous les matchs ({filteredMatchs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMatchs.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Légende des terrains */}
      <Card>
        <CardHeader>
          <CardTitle>Terrains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="font-medium">Terrain Central</span>
              <span className="text-sm text-gray-500">- Gakpodium</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
