"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MatchCard from "@/components/ui/match-card";
import { Award, Trophy, Crown, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Match } from "@/entities/Match";
import { getMatchsParPhase } from "@/services/matchService";

export default function PhasesFinalesPage() {
  const [pouleMatchs, setPouleMatchs] = useState<Match[]>([]);
  const [quarts, setQuarts] = useState<Match[]>([]);
  const [demies, setDemies] = useState<Match[]>([]);
  const [finale, setFinale] = useState<Match | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const phases = await getMatchsParPhase();

      setPouleMatchs(phases.poules || []);
      setQuarts(phases.quarts || []);
      setDemies(phases.demies || []);
      setFinale(phases.finale?.[0] || null);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-yellow-600 to-red-600 text-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-2">
          <Crown className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-bold">Phases Finales</h1>
        </div>
        <p className="text-lg opacity-90">
          Élimination directe vers la victoire
        </p>
      </div>

      {/* Progression */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Progression du tournoi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">Équipes qualifiées</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-blue-600">
                {pouleMatchs.length}
              </div>
              <div className="text-sm text-gray-600">Phase de Poule</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-green-600">
                {quarts.length}
              </div>
              <div className="text-sm text-gray-600">1/4 de finale</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-yellow-600">
                {demies.length}
              </div>
              <div className="text-sm text-gray-600">1/2 finale</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-red-600">
                {finale ? 1 : 0}
              </div>
              <div className="text-sm text-gray-600">Champion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase de Poule */}
      {pouleMatchs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-600" />
              Phase de Poule
              <Badge className="ml-2">Phase actuelle</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pouleMatchs.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 1/4 de finale */}
      {quarts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-green-600" />
              1/4 de finale
              <Badge variant="outline" className="ml-2">
                À venir
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quarts.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 1/2 finale */}
      {demies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-600" />
              1/2 finale
              <Badge variant="outline" className="ml-2">
                À venir
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demies.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Finale */}
      {finale && (
        <Card className="border-2 border-yellow-400">
          <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center text-2xl">
              <Crown className="h-6 w-6 mr-2" />
              FINALE
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="max-w-md mx-auto">
              <MatchCard match={finale} />
            </div>
            <div className="text-center mt-6 p-4 bg-yellow-50 rounded-lg">
              <Trophy className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
              <p className="text-lg font-semibold text-gray-900">
                Match décisif
              </p>
              <p className="text-gray-600">
                Le vainqueur remportera le tournoi 2025
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Règlement */}
      <Card>
        <CardHeader>
          <CardTitle>Règlement des phases finales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Élimination directe</p>
                <p className="text-sm text-gray-600">
                  Une seule manche, le perdant est éliminé
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">En cas d'égalité</p>
                <p className="text-sm text-gray-600">
                  Prolongations de 2 x 10 minutes puis séance de tirs au but
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Qualifications</p>
                <p className="text-sm text-gray-600">
                  Les 2 premiers de chaque poule + les 8 meilleurs 3ᵉ
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
