import './globals.css';
import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/sonner';


export const metadata: Metadata = {
  title: 'Tournoi de Football - Suivi en temps réel',
  description: 'Application moderne pour suivre votre tournoi de football : classements, matchs, statistiques et phases finales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}