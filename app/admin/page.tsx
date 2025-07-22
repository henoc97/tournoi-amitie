"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Settings, 
  Plus, 
  Edit, 
  Save, 
  Users, 
  Calendar, 
  Target,
  Trophy,
  Shield
} from 'lucide-react';

export default function AdminPage() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  // Mock data pour l'administration
  const mockMatchs = [
    {
      id: '1',
      date: '2025-01-16',
      heure: '15:30',
      equipes: { domicile: 'FC Lions', exterieur: 'AS Eagles' },
      score: { domicile: 0, exterieur: 0 },
      termine: false
    },
    {
      id: '2',
      date: '2025-01-16',
      heure: '17:00',
      equipes: { domicile: 'United FC', exterieur: 'Real Madrid' },
      score: { domicile: 2, exterieur: 1 },
      termine: true
    }
  ];

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
          <TabsTrigger value="matchs" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">
            Matchs
          </TabsTrigger>
          <TabsTrigger value="equipes" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">
            Équipes
          </TabsTrigger>
          <TabsTrigger value="joueurs" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">
            Joueurs
          </TabsTrigger>
          <TabsTrigger value="tournoi" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">
            Tournoi
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
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau match
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                  {mockMatchs.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell>{match.date}</TableCell>
                      <TableCell>{match.heure}</TableCell>
                      <TableCell>
                        {match.equipes.domicile} vs {match.equipes.exterieur}
                      </TableCell>
                      <TableCell>
                        {match.termine ? (
                          <span className="font-bold">
                            {match.score.domicile} - {match.score.exterieur}
                          </span>
                        ) : (
                          <span className="text-gray-400">- - -</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={match.termine ? "default" : "secondary"}
                          className={match.termine ? "bg-green-100 text-green-800" : ""}
                        >
                          {match.termine ? "Terminé" : "À venir"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle équipe
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Interface de gestion des équipes</p>
                <p className="text-sm">Ajouter, modifier ou supprimer des équipes</p>
              </div>
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
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau joueur
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Interface de gestion des joueurs</p>
                <p className="text-sm">Ajouter des joueurs et gérer leurs statistiques</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tournoi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-yellow-600" />
                Configuration du tournoi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tournoi-nom">Nom du tournoi</Label>
                    <Input 
                      id="tournoi-nom" 
                      defaultValue="Tournoi de l'Amitié 2025"
                      className="border-yellow-400/30 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date-debut">Date de début</Label>
                    <Input 
                      id="date-debut" 
                      type="date" 
                      defaultValue="2025-01-15"
                      className="border-yellow-400/30 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date-fin">Date de fin</Label>
                    <Input 
                      id="date-fin" 
                      type="date" 
                      defaultValue="2025-02-01"
                      className="border-yellow-400/30 focus:border-yellow-400"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="lieu">Lieu</Label>
                    <Input 
                      id="lieu" 
                      defaultValue="Complexe Sportif Municipal"
                      className="border-yellow-400/30 focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phase">Phase actuelle</Label>
                    <Input 
                      id="phase" 
                      defaultValue="Phase de groupes"
                      className="border-yellow-400/30 focus:border-yellow-400"
                    />
                  </div>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder les modifications
                  </Button>
                </div>
              </div>
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
            <Button variant="outline" className="border-yellow-400 text-yellow-600 hover:bg-yellow-50">
              <Calendar className="h-4 w-4 mr-2" />
              Programmer un match
            </Button>
            <Button variant="outline" className="border-yellow-400 text-yellow-600 hover:bg-yellow-50">
              <Target className="h-4 w-4 mr-2" />
              Saisir un résultat
            </Button>
            <Button variant="outline" className="border-yellow-400 text-yellow-600 hover:bg-yellow-50">
              <Trophy className="h-4 w-4 mr-2" />
              Mettre à jour classement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}