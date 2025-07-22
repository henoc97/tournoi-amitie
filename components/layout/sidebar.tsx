"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Trophy,
  Calendar,
  Users,
  Target,
  Award,
  Settings,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

const navigation = [
  {
    name: 'Accueil',
    href: '/',
    icon: Home,
  },
  {
    name: 'Poules',
    href: '/poules',
    icon: Trophy,
    submenu: [
      { name: 'Poule A', href: '/poules/A' },
      { name: 'Poule B', href: '/poules/B' },
      { name: 'Poule C', href: '/poules/C' },
      { name: 'Poule D', href: '/poules/D' },
    ],
  },
  {
    name: 'Calendrier',
    href: '/matchs',
    icon: Calendar,
    submenu: [
      { name: 'Matchs du jour', href: '/matchs/aujourdhui' },
      { name: 'Tous les matchs', href: '/matchs' },
      { name: 'Résultats', href: '/matchs/resultats' },
    ],
  },
  {
    name: 'Équipes',
    href: '/equipes',
    icon: Users,
  },
  {
    name: 'Statistiques',
    href: '/stats',
    icon: Target,
    submenu: [
      { name: 'Buteurs', href: '/stats' },
      { name: 'Passeurs', href: '/stats' },
      { name: 'Cartons', href: '/stats' },
    ],
  },
  {
    name: 'Phases finales',
    href: '/phases-finales',
    icon: Award,
  },
  {
    name: 'Administration',
    href: '/admin',
    icon: Settings,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg border"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-80 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-6 border-b border-gray-200">
            <Trophy className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">Tournoi</h1>
              <p className="text-sm text-gray-500">Football 2025</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <div>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={() => {
                        if (item.submenu) {
                          toggleExpanded(item.name);
                        } else {
                          setIsOpen(false);
                        }
                      }}
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span className="flex-1">{item.name}</span>
                      {item.submenu && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems.includes(item.name) && "rotate-90"
                          )}
                        />
                      )}
                    </Link>
                  </div>
                  {item.submenu && expandedItems.includes(item.name) && (
                    <ul className="mt-2 ml-8 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "block px-3 py-1 rounded-md text-sm transition-colors",
                              pathname === subItem.href
                                ? "bg-green-50 text-green-600"
                                : "text-gray-600 hover:bg-gray-50"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p>Tournoi de Football 2025</p>
              <p className="mt-1">Powered by Next.js</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}