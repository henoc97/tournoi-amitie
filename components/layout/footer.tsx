import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et titre */}
          <div className="text-center md:text-left">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-16 h-16">
                  <Image
                    src="/logo.png"
                    alt="Tournoi de l'Amitié"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400">
                    Tournoi de l'Amitié
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Football • Amitié • Excellence
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                Le tournoi qui unit les passionnés de football dans un esprit de
                camaraderie et de fair-play.
              </p>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-300">+228 90 54 98 16</p>
                  <p className="text-sm text-gray-300">+228 98 20 36 44</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <p className="text-sm text-gray-300">amitietournoi@gmail.com</p>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <p className="text-sm text-gray-300">Stade Gakpodium, Kohé</p>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">
              Suivez-nous
            </h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://facebook.com/tournoi-amitie"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://vm.tiktok.com/ZMSTt7dFw/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 text-white p-3 rounded-full transition-colors duration-200"
                aria-label="TikTok"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
            <div className="mt-6 text-center md:text-left">
              <p className="text-gray-400 text-sm">
                Restez connectés pour les dernières actualités
              </p>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Tournoi de l'Amitié. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
