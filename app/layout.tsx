import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Tournoi de l'Amitié - Suivi en temps réel",
  description:
    "Le Tournoi de l'Amitié : application moderne pour suivre votre tournoi de football en temps réel, classements, matchs, statistiques et phases finales.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://tournoi-amitie.vercel.app/"),
  openGraph: {
    title: "Tournoi de l'Amitié - Suivi en temps réel",
    description:
      "Suivez le Tournoi de l'Amitié avec les classements, les matchs en direct, les statistiques et les phases finales.",
    url: "https://tournoi-amitie.vercel.app/",
    siteName: "Tournoi de l'Amitié",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://tournoi-amitie.vercel.app/logo.png",
        secureUrl: "https://tournoi-amitie.vercel.app/logo.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Tournoi de l'Amitié",
      },
      {
        url: "https://tournoi-amitie.vercel.app/price.jpg",
        secureUrl: "https://tournoi-amitie.vercel.app/price.jpg",
        type: "image/jpg",
        width: 1200,
        height: 630,
        alt: "Tournoi de l'Amitié",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tournoi de l'Amitié - Suivi en temps réel",
    description:
      "Suivi en direct du Tournoi de l'Amitié : matchs, scores et classements en temps réel.",
    images: [
      "https://tournoi-amitie.vercel.app/logo.png",
      "https://tournoi-amitie.vercel.app/price.jpg",
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50 flex flex-col">
          <Navigation />
          <main className="container mx-auto px-4 py-8 flex-grow">
            {children}
            <Analytics />
          </main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  );
}
