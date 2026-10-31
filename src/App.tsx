/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { MorningThoughtView } from './components/MorningThoughtView';
import { EveningThoughtView } from './components/EveningThoughtView';
import { LibraryView } from './components/LibraryView';
import { BookDetailView } from './components/BookDetailView';
import { ReaderView } from './components/ReaderView';
import { SubscriptionView } from './components/SubscriptionView';
import { DonationView } from './components/DonationView';
import { ProfileView } from './components/ProfileView';
import { AdminView } from './components/AdminView';

// Offline indicator complying with PWA standards
function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-16 md:bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-medium text-white shadow-xl animate-bounce">
      <span className="h-2 w-2 rounded-full bg-white animate-ping" />
      Mode hors-ligne actif · Vos lectures et pensées en cache restent accessibles.
    </div>
  );
}

function MainContent() {
  const { currentView, navigateTo } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#070a13] text-[#e6e8ee]">
      <Navigation />

      <main className="flex-1">
        {currentView === 'accueil' && <HomeView />}
        {currentView === 'pensee-matin' && <MorningThoughtView />}
        {currentView === 'pensee-soir' && <EveningThoughtView />}
        {currentView === 'bibliotheque' && <LibraryView />}
        {currentView === 'livre-detail' && <BookDetailView />}
        {currentView === 'lecteur' && <ReaderView />}
        {currentView === 'abonnement' && <SubscriptionView />}
        {currentView === 'dons' && <DonationView />}
        {currentView === 'profil' && <ProfileView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      {/* Editorial Footer (Hidden during immersive reading) */}
      {currentView !== 'lecteur' && (
        <footer className="border-t border-white/[0.06] bg-[#05070e] py-10 pb-24 md:pb-12 text-slate-400 text-xs">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="font-serif text-base text-white tracking-wide block">
                Les Silences Anonymes
              </span>
              <p className="text-slate-400 mt-1 italic font-serif">
                « Chaque jour, un instant avec Dieu. »
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
              <button
                onClick={() => navigateTo('accueil')}
                className="hover:text-white transition"
              >
                Accueil
              </button>
              <button
                onClick={() => navigateTo('pensee-matin')}
                className="hover:text-white transition"
              >
                Pensée du Matin
              </button>
              <button
                onClick={() => navigateTo('pensee-soir')}
                className="hover:text-white transition"
              >
                Pensée du Soir
              </button>
              <button
                onClick={() => navigateTo('bibliotheque')}
                className="hover:text-white transition"
              >
                Bibliothèque
              </button>
              <button
                onClick={() => navigateTo('dons')}
                className="hover:text-white transition"
              >
                Soutenir la mission
              </button>
              <button
                onClick={() => navigateTo('admin')}
                className="text-amber-400/80 hover:text-amber-300 transition"
              >
                Administration
              </button>
            </div>

            <div className="text-center md:text-right text-slate-500 text-[11px]">
              © {new Date().getFullYear()} Les Silences Anonymes · Tous droits réservés.
            </div>
          </div>
        </footer>
      )}

      <OfflineBanner />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
