"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Trophy,
  Calendar,
  Users,
  Target,
  BarChart3,
  Home,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Poules", href: "/poules", icon: Users },
  { name: "Matchs", href: "/matchs", icon: Calendar },
  { name: "Buteurs", href: "/stats", icon: Target },
  { name: "Passeurs", href: "/stats", icon: BarChart3 },
  { name: "Phases Finales", href: "/phases-finales", icon: Trophy },
  { name: "Admin", href: "/admin", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();

  return (
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

          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-white">
              <div className="relative w-6 h-6">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
