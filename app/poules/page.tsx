"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ClassementTable from '@/components/ui/classement-table';
import { Trophy, Users, Target, Award } from 'lucide-react';

// Mock data pour les poules
const mockPoules = [
  {
    id: 'A',
    nom: 'Poule A',
    classement: [
      {
        position: 1,
        equipe: 'FC Lions',
        points: 9,
        joues: 3,
        gagnes: 3,
        nuls: 0,
        perdus: 0,
        butsPour: 8,
        butsContre: 2,
        difference: 6
      },
      {
        position: 2,
        equipe: 'AS Eagles',
        points: 6,
        joues: 3,
        gagnes: 2,
        nuls: 0,
        perdus: 1,
        butsPour: 5,
        butsContre: 4,
        difference: 1
      },
      {
        position: 3,
        equipe: 'United FC',
        points: 3,
        joues: 3,
        gagnes: 1,
        nuls: 0,
        perdus: 2,
        butsPour: 3,
        butsContre: 5,
        difference: -2
      },
      {
        position: 4,
        equipe: 'Real Madrid',
        points: 0,
        joues: 3,
        gagnes: 0,
        nuls: 0,
        perdus: 3,
        butsPour: 1,
        butsContre: 6,
        difference: -5
      }
    ]
  },
  {
    id: 'B',
    nom: 'Poule B',
    classement: [
      {
        position: 1,
        equipe: 'Barcelona FC',
        points: 7,
        joues: 3,
        gagnes: 2,
        nuls: 1,
        perdus: 0,
        butsPour: 6,
        butsContre: 2,
        difference: 4
      },
      {
        position: 2,
        equipe: 'Chelsea United',
        points: 5,
        joues: 3,
        gagnes: 1,
        nuls: 2,
        perdus: 0,
        butsPour: 4,
        butsContre: 3,
        difference: 1
      },
      {
        position: 3,
        equipe: 'AC Milan',
        points: 4,
        joues: 3,
        gagnes: 1,
        nuls: 1,
        perdus: 1,
        butsPour: 3,
        butsContre: 3,
        difference: 0
      },
      {
        position: 4,
        equipe: 'PSG Academy',
        points: 0,
        joues: 3,
        gagnes: 0,
        nuls: 0,
        perdus: 3,
        butsPour: 2,
        butsContre: 7,
        difference: -5
      }
    ]
  },
  {
    id: 'C',
    nom: 'Poule C',
    classement: [
      {
        position: 1,
        equipe: 'Liverpool FC',
        points: 6,
        joues: 2,
        gagnes: 2,
        nuls: 0,
        perdus: 0,
        butsPour: 5,
        butsContre: 1,
        difference: 4
      },
      {
        position: 2,
        equipe: 'Arsenal FC',
        points: 3,
        joues: 2,
        gagnes: 1,
        nuls: 0,
        perdus: 1,
        butsPour: 3,
        butsContre: 3,
        difference: 0
      },
      {
        position: 3,
        equipe: 'Juventus FC',
        points: 3,
        joues: 2,
        gagnes: 1,
        nuls: 0,
        perdus: 1,
        butsPour: 2,
        butsContre: 3,
        difference: -1
      },
      {
        position: 4,
        equipe: 'Bayern Munich',
        points: 0,
        joues: 2,
        gagnes: 0,
        nuls: 0,
        perdus: 2,
        butsPour: 1,
        butsContre: 4,
        difference: -3
      }
    ]
  },
  {
    id: 'D',
    nom: 'Poule D',
    classement: [
      {
        position: 1,
        equipe: 'Manchester City',
        points: 4,
        joues: 2,
        gagnes: 1,
        nuls: 1,
        perdus: 0,
        butsPour: 3,
        butsContre: 2,
        difference: 1
      },
      {
        position: 2,
        equipe: 'Inter Milan',
        points: 4,
        joues: 2,
        gagnes: 1,
        nuls: 1,
        perdus: 0,
        butsPour: 2,
        butsContre: 1,
        difference: 1
      },
      {
        position: 3,
        equipe: 'Atletico Madrid',
        points: 1,
        joues: 2,
        gagnes: 0,
        nuls: 1,
        perdus: 1,
        butsPour: 1,
        butsContre: 2,
        difference: -1
      },
      {
        position: 4,
        equipe: 'Napoli FC',
        points: 1,
        joues: 2,
        gagnes: 0,
        nuls: 1,
        perdus: 1,
        butsPour: 1,
        butsContre: 2,
        difference: -1
      }
    ]
  }
];

export default function PoulesPage() {
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
            <div className="text-2xl font-bold">16</div>
            <div className="text-sm text-gray-600">Équipes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-gray-600">Poules</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <div className="text-2xl font-bold">24</div>
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
        {mockPoules.map((poule) => (
          <Card key={poule.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                {poule.nom}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClassementTable 
                classement={poule.classement} 
                showQualification={true}
              />
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <Trophy className="h-4 w-4 inline mr-1" />
                  Les 2 premiers se qualifient pour les 1/8ᵉ de finale
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