"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import MatchCard from '@/components/ui/match-card';
import { Calendar, Clock, MapPin, Filter } from 'lucide-react';

// Mock data pour les matchs
const mockMatchs = [
  {
    id: '1',
    date: '2025-01-16',
    heure: '15:30',
    terrain: 'Terrain Central',
    phase: 'groupes',
    poule: 'A',
    equipes: {
      domicile: 'FC Lions',
      exterieur: 'AS Eagles'
    },
    termine: false
  },
  {
    id: '2',
    date: '2025-01-16',
    heure: '17:00',
    terrain: 'Terrain 2',
    phase: 'groupes',
    poule: 'A',
    equipes: {
      domicile: 'United FC',
      exterieur: 'Real Madrid'
    },
    score: {
      domicile: 2,
      exterieur: 1
    },
    termine: true
  },
  {
    id: '3',
    date: '2025-01-17',
    heure: '14:00',
    terrain: 'Terrain 1',
    phase: 'groupes',
    poule: 'B',
    equipes: {
      domicile: 'Barcelona FC',
      exterieur: 'Chelsea United'
    },
    termine: false
  },
  {
    id: '4',
    date: '2025-01-17',
    heure: '16:30',
    terrain: 'Terrain Central',
    phase: 'groupes',
    poule: 'B',
    equipes: {
      domicile: 'AC Milan',
      exterieur: 'PSG Academy'
    },
    score: {
      domicile: 3,
      exterieur: 0
    },
    termine: true
  },
  {
    id: '5',
    date: '2025-01-18',
    heure: '15:00',
    terrain: 'Terrain 3',
    phase: '1/8',
    equipes: {
      domicile: 'FC Lions',
      exterieur: 'Barcelona FC'
    },
    termine: false
  }
];

export default function MatchsPage() {
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  
  const today = new Date().toISOString().split('T')[0];
  const matchsAujourdhui = mockMatchs.filter(match => match.date === today);
  const prochains = mockMatchs.filter(match => match.date > today && !match.termine);
  const termines = mockMatchs.filter(match => match.termine);

  const filteredMatchs = selectedPhase === 'all' 
    ? mockMatchs 
    : mockMatchs.filter(match => match.phase === selectedPhase);

  const phases = ['all', 'groupes', '1/8', '1/4', '1/2', 'finale'];
  const phaseLabels: Record<string, string> = {
    'all': 'Tous les matchs',
    'groupes': 'Phase de poules',
    '1/8': '1/8ᵉ de finale',
    '1/4': '1/4 de finale',
    '1/2': '1/2 finale',
    'finale': 'Finale'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-2">
          <Calendar className="h-8 w-8 mr-3" />
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
                key={phase}
                variant={selectedPhase === phase ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedPhase(phase)}
              >
                {phaseLabels[phase]}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="aujourdhui" className="w-full">
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
              <span className="text-sm text-gray-500">- Principal</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Terrain 1</span>
              <span className="text-sm text-gray-500">- Nord</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-red-600" />
              <span className="font-medium">Terrain 2</span>
              <span className="text-sm text-gray-500">- Sud</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}