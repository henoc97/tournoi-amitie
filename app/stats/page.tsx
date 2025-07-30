"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Target,
  Users,
  Award,
  AlertTriangle,
  Trophy,
  Flame,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Buteur,
  Carton,
  EquipeFairPlay,
  Passeur,
  StatsManager,
} from "@/helpers/statsManager";

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
  const [buteurs, setButeurs] = useState<Buteur[]>([]);
  const [passeurs, setPasseurs] = useState<Passeur[]>([]);
  const [cartons, setCartons] = useState<Carton[]>([]);
  const [totalButs, setTotalButs] = useState(0);
  const [totalPasses, setTotalPasses] = useState(0);
  const [totalCartonsJaunes, setTotalCartonsJaunes] = useState(0);
  const [totalCartonsRouges, setTotalCartonsRouges] = useState(0);
  const [fairPlay, setFairPlay] = useState<EquipeFairPlay | null>();

  useEffect(() => {
    const fetchData = async () => {
      setButeurs(await StatsManager.getClassementButeurs());
      setPasseurs(await StatsManager.getClassementPasseurs());
      setCartons(await StatsManager.getClassementCartons());

      setTotalButs(await StatsManager.getTotalButs());
      setTotalPasses(await StatsManager.getTotalPasses());
      setTotalCartonsJaunes(await StatsManager.getTotalCartonsJaunes());
      setTotalCartonsRouges(await StatsManager.getTotalCartonsRouges());

      setFairPlay(await StatsManager.getClassementFairPlay());
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-2">
          <Target className="h-8 w-8 mr-0 sm:mr-3 mb-2 sm:mb-0" />
          <h1 className="text-3xl font-bold">Statistiques du Tournoi</h1>
        </div>
        <p className="text-lg opacity-90">
          Classements individuels et performances
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <div className="text-2xl font-bold">{totalButs}</div>
            <div className="text-sm text-gray-600">Buts marqués</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold">{totalPasses}</div>
            <div className="text-sm text-gray-600">Passes décisives</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <div className="text-2xl font-bold">{totalCartonsJaunes}</div>
            <div className="text-sm text-gray-600">Cartons jaunes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-red-600 mb-2" />
            <div className="text-2xl font-bold">{totalCartonsRouges}</div>
            <div className="text-sm text-gray-600">Cartons rouges</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="buteurs" className="w-full">
        <div className="flex flex-wrap gap-2 mb-10">
          <TabsList className="flex flex-wrap w-full gap-2">
            <TabsTrigger value="buteurs" className="flex-1 text-center">
              Meilleurs buteurs
            </TabsTrigger>
            <TabsTrigger value="passeurs" className="flex-1 text-center">
              Meilleurs passeurs
            </TabsTrigger>
            <TabsTrigger value="cartons" className="flex-1 text-center">
              Cartons
            </TabsTrigger>
          </TabsList>
        </div>

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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buteurs.map((buteur, index) => (
                    <TableRow key={buteur.id}>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getMedalIcon(index + 1)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span>{buteur.nom}</span>
                          {index + 1 === 1 && (
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {passeurs.map((passeur, index) => (
                    <TableRow key={passeur.id}>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getMedalIcon(index + 1)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span>{passeur.nom}</span>
                          {index + 1 === 1 && (
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartons.map((joueur, index) => (
                    <TableRow key={joueur.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span>{joueur.nom}</span>
                          {joueur.rouges > 0 && (
                            <Badge variant="destructive">Suspendu</Badge>
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
                          <Badge variant="destructive">{joueur.rouges}</Badge>
                        ) : (
                          <span className="text-gray-400">0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {joueur.total}
                      </TableCell>
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
            <h3 className="text-xl font-semibold mb-2">
              {fairPlay?.equipe ?? "Aucune équipe"}
            </h3>
            <p className="text-gray-600">
              Équipe avec le meilleur comportement
            </p>

            {/* Badges dynamiques */}
            <div className="mt-2 flex justify-center gap-2 flex-wrap">
              {fairPlay?.totalJaunes && fairPlay.totalJaunes > 0 && (
                <Badge className="bg-green-100 text-green-800">
                  Seulement {fairPlay.totalJaunes} carton
                  {fairPlay.totalJaunes > 1 ? "s" : ""} jaune
                  {fairPlay.totalJaunes > 1 ? "s" : ""}
                </Badge>
              )}
              {fairPlay?.totalRouges && fairPlay.totalRouges > 0 && (
                <Badge className="bg-green-100 text-green-800">
                  Seulement {fairPlay.totalRouges} carton
                  {fairPlay.totalRouges > 1 ? "s" : ""} rouge
                  {fairPlay.totalRouges > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
