'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Target, 
  Clock,
  ArrowRight,
  Flame,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

// Données mock
const prochainMatchs = [
  { id: 1, domicile: 'FC Lions', exterieur: 'AS Eagles', heure: '14:00', terrain: 'Terrain A' },
  { id: 2, domicile: 'Red Devils', exterieur: 'Blue Sharks', heure: '15:30', terrain: 'Terrain B' },
  { id: 3, domicile: 'Green Panthers', exterieur: 'Golden Tigers', heure: '17:00', terrain: 'Terrain A' },
];

const derniersResultats = [
  { id: 1, domicile: 'FC Lions', exterieur: 'AS Eagles', scoreDomicile: 2, scoreExterieur: 1 },
  { id: 2, domicile: 'Red Devils', exterieur: 'Blue Sharks', scoreDomicile: 0, scoreExterieur: 3 },
  { id: 3, domicile: 'Green Panthers', exterieur: 'Golden Tigers', scoreDomicile: 1, scoreExterieur: 1 },
];

const topButeurs = [
  { nom: 'Antoine Dubois', equipe: 'FC Lions', buts: 8 },
  { nom: 'Marco Silva', equipe: 'Blue Sharks', buts: 7 },
  { nom: 'Jean Martin', equipe: 'AS Eagles', buts: 6 },
];

const stats = [
  { label: 'Équipes', value: '16', icon: Users, color: 'text-gray-700' },
  { label: 'Matchs joués', value: '24', icon: Calendar, color: 'text-yellow-600' },
  { label: 'Buts marqués', value: '78', icon: Target, color: 'text-gray-800' },
  { label: 'Phase', value: 'Groupes', icon: Trophy, color: 'text-yellow-700' },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* En-tête hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-gray-100 px-4 py-2 rounded-full">
          <Flame className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium">Tournoi en cours</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-gray-800 bg-clip-text text-transparent">
          Tournoi de l'Amitié 2025
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Suivez en temps réel les matchs, classements et statistiques de notre tournoi de football
        </p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className={cn("p-2 rounded-lg bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-yellow-100 group-hover:to-gray-100 transition-all", stat.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Prochains matchs */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <CardTitle>Prochains Matchs</CardTitle>
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Aujourd'hui
              </Badge>
            </div>
            <CardDescription>Les matchs à venir aujourd'hui</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {prochainMatchs.map((match) => (
              <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {match.domicile} vs {match.exterieur}
                  </div>
                  <div className="text-xs text-gray-500">
                    {match.terrain}
                  </div>
                </div>
                <div className="text-sm font-mono bg-white px-2 py-1 rounded">
                  {match.heure}
                </div>
              </div>
            ))}
            <Link href="/matchs">
              <Button variant="outline" className="w-full group">
                Voir tous les matchs
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform text-yellow-600" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Derniers résultats */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-gray-700" />
              <CardTitle>Derniers Résultats</CardTitle>
            </div>
            <CardDescription>Résultats des matchs récents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {derniersResultats.map((match) => (
              <div key={match.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {match.domicile} vs {match.exterieur}
                  </div>
                </div>
                <div className="text-lg font-bold">
                  {match.scoreDomicile} - {match.scoreExterieur}
                </div>
              </div>
            ))}
            <Link href="/matchs">
              <Button variant="outline" className="w-full group">
                Voir tous les résultats
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform text-gray-600" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Top buteurs */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-yellow-600" />
            <CardTitle>Meilleurs Buteurs</CardTitle>
          </div>
          <CardDescription>Le classement des buteurs du tournoi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topButeurs.map((buteur, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{buteur.nom}</div>
                  <div className="text-sm text-gray-500">{buteur.equipe}</div>
                </div>
                <div className="text-xl font-bold text-yellow-600">
                  {buteur.buts}
                </div>
              </div>
            ))}
            <Link href="/stats/buteurs">
              <Button variant="outline" className="w-full group">
                Voir le classement complet
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform text-yellow-600" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/poules">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-gray-700 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Classements des Poules</h3>
              <p className="text-sm text-gray-600">Consultez les classements de toutes les poules</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/phases-finales">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-3 text-yellow-600 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Phases Finales</h3>
              <p className="text-sm text-gray-600">Suivez le bracket du tournoi</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-3 text-gray-800 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2">Administration</h3>
              <p className="text-sm text-gray-600">Gérer les résultats et statistiques</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}