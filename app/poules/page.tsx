"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ClassementTable from "@/components/ui/classement-table";
import { Trophy, Users, Target, Award } from "lucide-react";
import { TournoiManager } from "@/helpers/tournoiManager"; // adapte le chemin !
import { ClassementItem, Poule } from "@/entities/Poule";
import { AccueilManager } from "@/helpers/accueilManager";

const managerStats = new AccueilManager();

export default function PoulesPage() {
  const [poules, setPoules] = useState<
    { poule: Poule; classement: ClassementItem[] }[]
  >([]);
  const [stats, setStats] = useState<{
    equipes: number;
    matchs: number;
    buts: number;
  }>();

  useEffect(() => {
    const fetchClassements = async () => {
      const manager = new TournoiManager();
      const data = await manager.getClassementParPoule();
      data.sort((a, b) => a.poule.nom.localeCompare(b.poule.nom));
      setPoules(data);
    };

    const fetchStats = async () => {
      const rawStats = await managerStats.getStats();

      setStats(rawStats);
    };

    fetchClassements();
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-2">
          <Trophy className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-bold">Phase de Poules</h1>
        </div>
        <p className="text-lg opacity-90">Classements et qualifications</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold">{stats?.equipes}</div>
            <div className="text-sm text-gray-600">Équipes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold">{poules.length}</div>
            <div className="text-sm text-gray-600">Poules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <div className="text-2xl font-bold">{stats?.matchs}</div>
            <div className="text-sm text-gray-600">Matchs joués</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-gray-600">Qualifiés</div>
          </CardContent>
        </Card>
      </div>

      {/* Poules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {poules.map(({ poule, classement }) => (
          <Card key={poule.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                {poule.nom}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClassementTable
                classement={classement}
                showQualification={true}
              />
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <Trophy className="h-4 w-4 inline mr-1" />
                  Les 2 premiers se qualifient pour les 1/4ᵉ de finale
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Légende */}
      <Card>
        <CardHeader>
          <CardTitle>Légende</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <strong>Pts</strong> : Points
            </div>
            <div>
              <strong>J</strong> : Matchs joués
            </div>
            <div>
              <strong>G</strong> : Victoires
            </div>
            <div>
              <strong>N</strong> : Matchs nuls
            </div>
            <div>
              <strong>P</strong> : Défaites
            </div>
            <div>
              <strong>BP</strong> : Buts pour
            </div>
            <div>
              <strong>BC</strong> : Buts contre
            </div>
            <div>
              <strong>Diff</strong> : Différence de buts
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
