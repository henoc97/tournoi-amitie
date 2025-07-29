"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import {
  Trophy,
  Calendar,
  Users,
  Target,
  BarChart3,
  Home,
  Settings,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Poules", href: "/poules", icon: Users },
  { name: "Matchs", href: "/matchs", icon: Calendar },
  { name: "Buteurs", href: "/stats", icon: Target },
  { name: "Passeurs", href: "/stats", icon: BarChart3 },
  { name: "Phases Finales", href: "/phases-finales", icon: Trophy },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-900/95 backdrop-blur-md border-b border-yellow-400/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Logo Tournoi de l'Amitié"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl font-bold text-white">
                Tournoi de l'Amitié
              </h1>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "flex items-center space-x-2 transition-all",
                        isActive
                          ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg font-semibold"
                          : "text-gray-300 hover:text-white hover:bg-gray-800"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Menu mobile */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
          <div className="bg-white w-64 h-full shadow-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "flex w-full justify-start space-x-2",
                        isActive
                          ? "bg-yellow-400 text-gray-900 font-semibold"
                          : "text-gray-800 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
