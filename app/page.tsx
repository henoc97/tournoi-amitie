"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Trophy,
  Calendar,
  Users,
  Target,
  Clock,
  ArrowRight,
  Flame,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { AccueilManager } from "@/helpers/accueilManager";
import { getEquipeById } from "@/services/equipeService";

const manager = new AccueilManager();

export default function Home() {
  const [prochainMatchs, setProchainMatchs] = useState<any[]>([]);
  const [derniersResultats, setDerniersResultats] = useState<any[]>([]);
  const [topButeurs, setTopButeurs] = useState<any[]>([]);
  const [stats, setStats] = useState<
    { label: string; value: string; icon: any; color: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const prochains = await manager.getProchainsMatchs();
      const resultats = await manager.getDerniersResultats();
      const buteurs = await manager.getTopButeurs();
      const rawStats = await manager.getStats();

      setProchainMatchs(
        prochains.map((m) => ({
          id: m.id,
          domicile: m.equipes.domicile.nom,
          exterieur: m.equipes.exterieur.nom,
          heure: m.heure,
          date: m.date.split("-").reverse().join("-"),
        }))
      );

      setDerniersResultats(
        resultats.map((m) => ({
          id: m.id,
          domicile: m.equipes.domicile.nom,
          exterieur: m.equipes.exterieur.nom,
          scoreDomicile: m.score?.domicile ?? 0,
          scoreExterieur: m.score?.exterieur ?? 0,
        }))
      );

      // Suppose que `buteurs` est ton tableau de Joueur[]
      const loadTopButeurs = async () => {
        const buteursWithEquipe = await Promise.all(
          buteurs.map(async (j) => {
            const equipe = await getEquipeById(j.equipeId);
            return {
              nom: j.nom,
              equipe: equipe ? equipe.nom : "Inconnu",
              buts: j.buts ?? 0,
            };
          })
        );

        setTopButeurs(buteursWithEquipe);
      };
      loadTopButeurs();

      setStats([
        {
          label: "Équipes",
          value: String(rawStats.equipes),
          icon: Users,
          color: "text-gray-700",
        },
        {
          label: "Matchs joués",
          value: String(rawStats.matchs),
          icon: Calendar,
          color: "text-yellow-600",
        },
        {
          label: "Buts marqués",
          value: String(rawStats.buts),
          icon: Target,
          color: "text-gray-800",
        },
        {
          label: "Phase",
          value: "Groupes",
          icon: Trophy,
          color: "text-yellow-700",
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* En-tête hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-gray-100 px-4 py-2 rounded-full">
          <Flame className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium">Tournoi en cours</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-gray-800 bg-clip-text text-transparent">
          Tournoi de l&apos;Amitié 2025
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Suivez en temps réel les matchs, classements et statistiques de notre
          tournoi de football
        </p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="relative overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-yellow-100 group-hover:to-gray-100 transition-all",
                      stat.color
                    )}
                  >
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
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                {"à venir".toLocaleUpperCase()}
              </Badge>
            </div>
            <CardDescription>Les matchs à venir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {prochainMatchs.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {match.domicile} vs {match.exterieur}
                  </div>
                  <div className="text-xs text-gray-500">{match.date}</div>
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
              <div
                key={match.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
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
          <CardDescription>
            Le classement des buteurs du tournoi
          </CardDescription>
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
            <Link href="/stats">
              <Button variant="outline" className="w-full group">
                Voir le classement complet
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform text-yellow-600" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
