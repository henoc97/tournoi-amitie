"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MatchCard from '@/components/ui/match-card';
import { Award, Trophy, Crown, Zap } from 'lucide-react';

// Mock data pour les phases finales
const mockBracket = {
  huitiemes: [
    {
      id: '1',
      date: '2025-01-20',
      heure: '15:00',
      terrain: 'Terrain Central',
      phase: '1/8',
      equipes: { domicile: 'FC Lions', exterieur: 'Inter Milan' },
      score: { domicile: 2, exterieur: 1 },
      termine: true
    },
    {
      id: '2',
      date: '2025-01-20',
      heure: '17:00',
      terrain: 'Terrain 1',
      phase: '1/8',
      equipes: { domicile: 'Barcelona FC', exterieur: 'Arsenal FC' },
      score: { domicile: 3, exterieur: 0 },
      termine: true
    },
    {
      id: '3',
      date: '2025-01-21',
      heure: '15:00',
      terrain: 'Terrain 2',
      phase: '1/8',
      equipes: { domicile: 'Liverpool FC', exterieur: 'Chelsea United' },
      termine: false
    },
    {
      id: '4',
      date: '2025-01-21',
      heure: '17:00',
      terrain: 'Terrain Central',
      phase: '1/8',
      equipes: { domicile: 'Manchester City', exterieur: 'AS Eagles' },
      termine: false
    }
  ],
  quarts: [
    {
      id: '5',
      date: '2025-01-25',
      heure: '15:00',
      terrain: 'Terrain Central',
      phase: '1/4',
      equipes: { domicile: 'FC Lions', exterieur: 'Barcelona FC' },
      termine: false
    },
    {
      id: '6',
      date: '2025-01-25',
      heure: '17:00',
      terrain: 'Terrain Central',
      phase: '1/4',
      equipes: { domicile: 'TBD', exterieur: 'TBD' },
      termine: false
    }
  ],
  demies: [
    {
      id: '7',
      date: '2025-01-28',
      heure: '15:00',
      terrain: 'Terrain Central',
      phase: '1/2',
      equipes: { domicile: 'TBD', exterieur: 'TBD' },
      termine: false
    }
  ],
  finale: {
    id: '8',
    date: '2025-02-01',
    heure: '15:00',
    terrain: 'Terrain Central',
    phase: 'finale',
    equipes: { domicile: 'TBD', exterieur: 'TBD' },
    termine: false
  }
};

export default function PhasesFinalesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-yellow-600 to-red-600 text-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-2">
          <Crown className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-bold">Phases Finales</h1>
        </div>
        <p className="text-lg opacity-90">Élimination directe vers la victoire</p>
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
              <div className="text-2xl font-bold text-gray-900">16</div>
              <div className="text-sm text-gray-600">Équipes qualifiées</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">1/8ᵉ de finale</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-gray-600">1/4 de finale</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-gray-600">1/2 finale</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-sm text-gray-600">Champion</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 1/8ème de finale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            1/8ᵉ de finale
            <Badge className="ml-2">Phase actuelle</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBracket.huitiemes.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 1/4 de finale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-green-600" />
            1/4 de finale
            <Badge variant="outline" className="ml-2">À venir</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBracket.quarts.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 1/2 finale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-600" />
            1/2 finale
            <Badge variant="outline" className="ml-2">À venir</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto">
            <MatchCard match={mockBracket.demies[0]} />
          </div>
        </CardContent>
      </Card>

      {/* Finale */}
      <Card className="border-2 border-yellow-400">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center text-2xl">
            <Crown className="h-6 w-6 mr-2" />
            FINALE
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="max-w-md mx-auto">
            <MatchCard match={mockBracket.finale} />
          </div>
          <div className="text-center mt-6 p-4 bg-yellow-50 rounded-lg">
            <Trophy className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <p className="text-lg font-semibold text-gray-900">Match décisif</p>
            <p className="text-gray-600">Le vainqueur remportera le tournoi 2025</p>
          </div>
        </CardContent>
      </Card>

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
                <p className="text-sm text-gray-600">Une seule manche, le perdant est éliminé</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">En cas d'égalité</p>
                <p className="text-sm text-gray-600">Prolongations de 2 x 10 minutes puis séance de tirs au but</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Qualifications</p>
                <p className="text-sm text-gray-600">Les 2 premiers de chaque poule + les 8 meilleurs 3ᵉ</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}