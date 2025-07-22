"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Target, Users, Award, AlertTriangle, Trophy, Flame } from 'lucide-react';

// Mock data pour les statistiques
const mockButeurs = [
  {
    position: 1,
    nom: 'Kevin Martin',
    equipe: 'FC Lions',
    buts: 8,
    matchs: 4,
    moyenne: 2.0
  },
  {
    position: 2,
    nom: 'Alexandre Dubois',
    equipe: 'Barcelona FC',
    buts: 6,
    matchs: 3,
    moyenne: 2.0
  },
  {
    position: 3,
    nom: 'Mohamed Ali',
    equipe: 'Liverpool FC',
    buts: 5,
    matchs: 3,
    moyenne: 1.7
  },
  {
    position: 4,
    nom: 'Carlos Rodriguez',
    equipe: 'AS Eagles',
    buts: 4,
    matchs: 4,
    moyenne: 1.0
  },
  {
    position: 5,
    nom: 'Thomas Müller',
    equipe: 'Bayern Munich',
    buts: 3,
    matchs: 2,
    moyenne: 1.5
  }
];

const mockPasseurs = [
  {
    position: 1,
    nom: 'Luka Modric',
    equipe: 'Real Madrid',
    passes: 5,
    matchs: 3,
    moyenne: 1.7
  },
  {
    position: 2,
    nom: 'Kevin De Bruyne',
    equipe: 'Manchester City',
    passes: 4,
    matchs: 2,
    moyenne: 2.0
  },
  {
    position: 3,
    nom: 'Pedri González',
    equipe: 'Barcelona FC',
    passes: 3,
    matchs: 3,
    moyenne: 1.0
  },
  {
    position: 4,
    nom: 'Bruno Fernandes',
    equipe: 'United FC',
    passes: 3,
    matchs: 4,
    moyenne: 0.8
  },
  {
    position: 5,
    nom: 'Marco Verratti',
    equipe: 'PSG Academy',
    passes: 2,
    matchs: 3,
    moyenne: 0.7
  }
];

const mockCartons = [
  {
    position: 1,
    nom: 'Sergio Ramos',
    equipe: 'Real Madrid',
    jaunes: 3,
    rouges: 1,
    total: 4,
    matchs: 3
  },
  {
    position: 2,
    nom: 'Casemiro Silva',
    equipe: 'Manchester City',
    jaunes: 3,
    rouges: 0,
    total: 3,
    matchs: 2
  },
  {
    position: 3,
    nom: 'Fabinho Santos',
    equipe: 'Liverpool FC',
    jaunes: 2,
    rouges: 1,
    total: 3,
    matchs: 3
  },
  {
    position: 4,
    nom: 'N\'Golo Kanté',
    equipe: 'Chelsea United',
    jaunes: 2,
    rouges: 0,
    total: 2,
    matchs: 3
  }
];

export default function StatsPage() {
  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-orange-600" />;
      default:
        return <span className="text-gray-600 font-medium">{position}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-2">
          <Target className="h-8 w-8 mr-3" />
          <h1 className="text-3xl font-bold">Statistiques du Tournoi</h1>
        </div>
        <p className="text-lg opacity-90">Classements individuels et performances</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-gray-600">Buts marqués</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold">78</div>
            <div className="text-sm text-gray-600">Passes décisives</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <div className="text-2xl font-bold">45</div>
            <div className="text-sm text-gray-600">Cartons jaunes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm text-gray-600">Cartons rouges</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="buteurs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="buteurs">Meilleurs buteurs</TabsTrigger>
          <TabsTrigger value="passeurs">Meilleurs passeurs</TabsTrigger>
          <TabsTrigger value="cartons">Cartons</TabsTrigger>
        </TabsList>

        <TabsContent value="buteurs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-red-600" />
                Classement des buteurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Joueur</TableHead>
                    <TableHead>Équipe</TableHead>
                    <TableHead className="text-center">Buts</TableHead>
                    <TableHead className="text-center">Matchs</TableHead>
                    <TableHead className="text-center">Moyenne</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockButeurs.map((buteur) => (
                    <TableRow key={buteur.position}>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getMedalIcon(buteur.position)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span>{buteur.nom}</span>
                          {buteur.position === 1 && (
                            <Badge className="bg-red-100 text-red-800">
                              <Flame className="h-3 w-3 mr-1" />
                              Leader
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{buteur.equipe}</TableCell>
                      <TableCell className="text-center font-bold text-red-600">
                        {buteur.buts}
                      </TableCell>
                      <TableCell className="text-center">{buteur.matchs}</TableCell>
                      <TableCell className="text-center">
                        {buteur.moyenne.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passeurs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Classement des passeurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Joueur</TableHead>
                    <TableHead>Équipe</TableHead>
                    <TableHead className="text-center">Passes</TableHead>
                    <TableHead className="text-center">Matchs</TableHead>
                    <TableHead className="text-center">Moyenne</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPasseurs.map((passeur) => (
                    <TableRow key={passeur.position}>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getMedalIcon(passeur.position)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span>{passeur.nom}</span>
                          {passeur.position === 1 && (
                            <Badge className="bg-blue-100 text-blue-800">
                              <Users className="h-3 w-3 mr-1" />
                              Meilleur
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{passeur.equipe}</TableCell>
                      <TableCell className="text-center font-bold text-blue-600">
                        {passeur.passes}
                      </TableCell>
                      <TableCell className="text-center">{passeur.matchs}</TableCell>
                      <TableCell className="text-center">
                        {passeur.moyenne.toFixed(1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cartons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                Classement des cartons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Joueur</TableHead>
                    <TableHead>Équipe</TableHead>
                    <TableHead className="text-center">Jaunes</TableHead>
                    <TableHead className="text-center">Rouges</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Matchs</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCartons.map((joueur) => (
                    <TableRow key={joueur.position}>
                      <TableCell className="text-center">
                        {joueur.position}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span>{joueur.nom}</span>
                          {joueur.rouges > 0 && (
                            <Badge variant="destructive">
                              Suspendu
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{joueur.equipe}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          {joueur.jaunes}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {joueur.rouges > 0 ? (
                          <Badge variant="destructive">
                            {joueur.rouges}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {joueur.total}
                      </TableCell>
                      <TableCell className="text-center">{joueur.matchs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fair-play */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-green-600" />
            Classement Fair-Play
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Trophy className="h-12 w-12 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Liverpool FC</h3>
            <p className="text-gray-600">Équipe avec le meilleur comportement</p>
            <Badge className="mt-2 bg-green-100 text-green-800">
              Seulement 2 cartons jaunes
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}