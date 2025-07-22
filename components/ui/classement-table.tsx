import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ClassementItem {
  position: number;
  equipe: string;
  points: number;
  joues: number;
  gagnes: number;
  nuls: number;
  perdus: number;
  butsPour: number;
  butsContre: number;
  difference: number;
}

interface ClassementTableProps {
  classement: ClassementItem[];
  showQualification?: boolean;
}

export default function ClassementTable({ 
  classement, 
  showQualification = false 
}: ClassementTableProps) {
  const getQualificationBadge = (position: number) => {
    if (!showQualification) return null;
    
    if (position <= 2) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <Trophy className="h-3 w-3 mr-1" />
          Qualifié
        </Badge>
      );
    }
    return null;
  };

  const getTrendIcon = (difference: number) => {
    if (difference > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (difference < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead>Équipe</TableHead>
            <TableHead className="text-center">Pts</TableHead>
            <TableHead className="text-center">J</TableHead>
            <TableHead className="text-center">G</TableHead>
            <TableHead className="text-center">N</TableHead>
            <TableHead className="text-center">P</TableHead>
            <TableHead className="text-center">BP</TableHead>
            <TableHead className="text-center">BC</TableHead>
            <TableHead className="text-center">Diff</TableHead>
            {showQualification && <TableHead>Statut</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {classement.map((item) => (
            <TableRow key={item.equipe}>
              <TableCell className="text-center font-medium">
                {item.position}
              </TableCell>
              <TableCell className="font-medium">{item.equipe}</TableCell>
              <TableCell className="text-center font-bold">
                {item.points}
              </TableCell>
              <TableCell className="text-center">{item.joues}</TableCell>
              <TableCell className="text-center">{item.gagnes}</TableCell>
              <TableCell className="text-center">{item.nuls}</TableCell>
              <TableCell className="text-center">{item.perdus}</TableCell>
              <TableCell className="text-center">{item.butsPour}</TableCell>
              <TableCell className="text-center">{item.butsContre}</TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  {getTrendIcon(item.difference)}
                  <span className={
                    item.difference > 0 
                      ? 'text-green-600 font-medium' 
                      : item.difference < 0 
                      ? 'text-red-600 font-medium' 
                      : 'text-gray-600'
                  }>
                    {item.difference > 0 ? '+' : ''}{item.difference}
                  </span>
                </div>
              </TableCell>
              {showQualification && (
                <TableCell>
                  {getQualificationBadge(item.position)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}