"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  Users,
  Calendar,
  Target,
  Trophy,
  Shield,
  Trash,
  MoreVertical,
  Edit,
} from "lucide-react";
import AddMatchDialog from "./addMatch";
import AddEquipeDialog from "./addEquipe";
import { getMatchStatus } from "@/helpers/getMatchStatus";
import EditMatchDialog from "./editMatch";
import LiveMatchDialog from "./liveMatch";
import AddPouleDialog from "./addPoule";
import { Poule } from "@/entities/Poule";
import { deletePoule, getPoules } from "@/services/pouleService";
import { getEquipes } from "@/services/equipeService";
import { Equipe } from "@/entities/Equipe";
import { Joueur } from "@/entities/Joueur";
import { deleteJoueur, getJoueurs } from "@/services/joueurService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditJoueurDialog from "./editJoueur";
import { deleteMatch, getMatchs } from "@/services/matchService";
import { Match } from "@/entities/Match";
import AddJoueurDialog from "./addJoueur";

export default function AdminPage() {
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
  const [dialogType, setDialogType] = useState<"edit" | "live" | null>(null);
  const [poules, setPoules] = useState<Poule[]>([]);
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [joueurs, setJoueurs] = useState<(Joueur & { equipeNom?: string })[]>(
    []
  );
  const [matchs, setMatchs] = useState<Match[]>([]);
  const [openEdit, setOpenEdit] = useState<any>(false);
  const [openLive, setOpenLive] = useState<any>(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

  const fetchPoules = async () => {
    try {
      const data = await getPoules();
      data.sort((a, b) => a.nom.localeCompare(b.nom));
      setPoules(data);
    } catch (error) {
      console.error("Erreur lors du chargement des poules :", error);
    }
  };

  const fetchEquipes = async () => {
    try {
      const data = await getEquipes();
      data.sort((a, b) => {
        const pouleA = poules.find((p) => p.id === a.pouleId)?.nom || "";
        const pouleB = poules.find((p) => p.id === b.pouleId)?.nom || "";
        return pouleA.localeCompare(pouleB) || a.nom.localeCompare(b.nom);
      });
      setEquipes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des poules :", error);
    }
  };

  const fetchJoueurs = async () => {
    try {
      const joueursData = await getJoueurs();

      const joueursAvecEquipe = joueursData.map((joueur) => {
        const equipe = equipes.find((eq) => eq.id === joueur.equipeId);
        return {
          ...joueur,
          equipeNom: equipe ? equipe.nom : "Équipe inconnue",
        };
      });

      joueursAvecEquipe.sort(
        (a, b) =>
          a.equipeNom!.localeCompare(b.equipeNom!) || a.nom.localeCompare(b.nom)
      );

      setJoueurs(joueursAvecEquipe);
    } catch (error) {
      console.error("Erreur lors du chargement des joueurs :", error);
    }
  };

  const fetchMatchs = async () => {
    try {
      const data = await getMatchs();
      // Tri optionnel par date croissante :
      data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setMatchs(data);
    } catch (error) {
      console.error("Erreur lors du chargement des matchs :", error);
    }
  };

  const handleDeletePoule = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette poule ?")) return;

    try {
      await deletePoule(id);
      // Recharger la liste des poules
      fetchPoules();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Impossible de supprimer la poule. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchPoules();
      await fetchEquipes();
      await fetchJoueurs();
      await fetchMatchs();
    };

    loadData().catch((error) => {
      console.error("Erreur lors du chargement des données :", error);
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-lg shadow-lg border border-yellow-400/20">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-8 w-8 mr-3 text-yellow-400" />
          <h1 className="text-3xl font-bold">Administration</h1>
        </div>
        <p className="text-lg opacity-90">Gestion du tournoi de l'amitié</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-yellow-400/20">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <div className="text-2xl font-bold">16</div>
            <div className="text-sm text-gray-600">Équipes</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-400/20">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto text-gray-700 mb-2" />
            <div className="text-2xl font-bold">32</div>
            <div className="text-sm text-gray-600">Matchs</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-400/20">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-gray-600">Buts</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-400/20">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 mx-auto text-gray-700 mb-2" />
            <div className="text-2xl font-bold">Groupes</div>
            <div className="text-sm text-gray-600">Phase actuelle</div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="matchs" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger
            value="matchs"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
          >
            Matchs
          </TabsTrigger>
          <TabsTrigger
            value="equipes"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
          >
            Équipes
          </TabsTrigger>
          <TabsTrigger
            value="joueurs"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
          >
            Joueurs
          </TabsTrigger>
          <TabsTrigger
            value="poules"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900"
          >
            Poules
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matchs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-yellow-600" />
                  Gestion des matchs
                </div>
                {/* Dialog add new match */}
                <AddMatchDialog onMatchCreated={fetchMatchs} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {matchs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Interface de gestion des matchs</p>
                  <p className="text-sm">
                    Ajouter, modifier ou supprimer des matchs
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead>Match</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matchs.map((match) => {
                      const status = getMatchStatus(match);
                      return (
                        <TableRow key={match.id}>
                          <TableCell>{match.date}</TableCell>
                          <TableCell>{match.heure}</TableCell>
                          <TableCell>
                            {match.equipes.domicile.nom} vs{" "}
                            {match.equipes.exterieur.nom}
                          </TableCell>
                          <TableCell>
                            {match.score ? (
                              <span className="font-bold">
                                {match.score.domicile} - {match.score.exterieur}
                              </span>
                            ) : status === "En cours" ? (
                              <span className="text-gray-400">0 - 0</span>
                            ) : (
                              <span className="text-gray-400">- - -</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={match.termine ? "default" : "secondary"}
                              className={
                                status === "Terminé"
                                  ? "bg-green-100 text-green-800"
                                  : status === "En cours"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : ""
                              }
                            >
                              {status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    setCurrentMatch(match);
                                    if (status === "À venir") {
                                      setOpenEdit(true);
                                    } else if (status === "En cours") {
                                      setOpenLive(true);
                                    }
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  <span className="font-bold">Modifier</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={async () => {
                                    if (confirm("Supprimer ce match ?")) {
                                      await deleteMatch(match.id!);
                                      fetchMatchs();
                                    }
                                  }}
                                  className="text-red-600"
                                >
                                  <Trash className="h-4 w-4 mr-2" />{" "}
                                  <span className="font-bold">Supprimer</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            {/* Dialogs contrôlés */}
                            {status === "À venir" && (
                              <EditMatchDialog
                                match={currentMatch!}
                                open={openEdit}
                                onOpenChange={setOpenEdit}
                                onMatchUpdated={fetchMatchs}
                              />
                            )}

                            {status === "En cours" && (
                              <LiveMatchDialog
                                match={currentMatch!}
                                open={openLive}
                                onOpenChange={setOpenLive}
                                onMatchUpdated={fetchMatchs}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-yellow-600" />
                  Gestion des équipes
                </div>
                {/* Dialog add new team */}
                <AddEquipeDialog onEquipeCreated={fetchEquipes} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {equipes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Interface de gestion des équipes</p>
                  <p className="text-sm">
                    Ajouter, modifier ou supprimer des équipes
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Ville</TableHead>
                      <TableHead>Poule</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipes.map((equipe) => {
                      const poule = poules.find((p) => p.id === equipe.pouleId);
                      return (
                        <TableRow key={equipe.id}>
                          <TableCell>{equipe.nom}</TableCell>
                          <TableCell>{equipe.ville || "-"}</TableCell>
                          <TableCell>
                            {poule ? poule.nom : "Non définie"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="joueurs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-yellow-600" />
                  Gestion des joueurs
                </div>
                {/* Dialog add new player */}
                <AddJoueurDialog onJoueurCreated={fetchJoueurs} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {joueurs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Interface de gestion des joueurs</p>
                  <p className="text-sm">
                    Ajouter des joueurs et gérer leurs statistiques
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Équipe</TableHead>
                      <TableHead>Buts</TableHead>
                      <TableHead>Passes</TableHead>
                      <TableHead>Cartons Jaunes</TableHead>
                      <TableHead>Cartons Rouges</TableHead>
                      <TableHead>Matchs</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {joueurs.map((joueur) => (
                      <TableRow key={joueur.id}>
                        <TableCell>{joueur.nom}</TableCell>
                        <TableCell>{joueur.equipeNom}</TableCell>
                        <TableCell>{joueur.buts}</TableCell>
                        <TableCell>{joueur.passes}</TableCell>
                        <TableCell>{joueur.cartonsJaunes}</TableCell>
                        <TableCell>{joueur.cartonsRouges}</TableCell>
                        <TableCell>{joueur.matchs}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <EditJoueurDialog
                                  joueur={joueur}
                                  onJoueurUpdated={fetchJoueurs}
                                />
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={async () => {
                                  if (confirm("Supprimer ce joueur ?")) {
                                    await deleteJoueur(joueur.id!);
                                    fetchJoueurs();
                                  }
                                }}
                                className="text-red-600"
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                <span className="font-bold">Supprimer</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="poules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-yellow-600" />
                  Gestion des poules
                </div>
                <AddPouleDialog onPouleCreated={fetchPoules} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {poules.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Interface de gestion des poules</p>
                  <p className="text-sm">
                    Créer des poules et gérer leur composition
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom de la poule</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {poules.map((poule) => (
                      <TableRow key={poule.id}>
                        <TableCell>{poule.nom}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeletePoule(poule.id!)}
                            aria-label={`Supprimer la poule ${poule.nom}`}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Actions rapides */}
      <Card className="border-yellow-400/20">
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Programmer un match
            </Button>
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              <Target className="h-4 w-4 mr-2" />
              Saisir un résultat
            </Button>
            <Button
              variant="outline"
              className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Mettre à jour classement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
