import React from 'react';
import { useApp } from '../context/AppContext';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const Navigation: React.FC = () => {
  const { currentView, navigateTo } = useApp();
  const { isInstallable, install } = usePWAInstall();

  const isHome = currentView === 'accueil';
  const isMorning = currentView === 'pensee-matin';
  const isEvening = currentView === 'pensee-soir';
  const isLibrary = currentView === 'bibliotheque' || currentView === 'livre-detail' || currentView === 'lecteur';
  const isProfile = currentView === 'profil' || currentView === 'admin';
  const isDonation = currentView === 'dons';

  // If in immersive reading mode, hide standard navigation for complete immersion
  if (currentView === 'lecteur') {
    return null;
  }

  return (
    <>
      {/* Top Bar Contract (Desktop & Tablet) */}
      <header className="sticky top-0 z-40 w-full bg-[#070a13]/90 backdrop-blur-md border-b border-white/[0.07]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line brand wordmark in editorial display face */}
          <button
            onClick={() => navigateTo('accueil')}
            className="flex items-center gap-3 text-left whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 flex items-center justify-center shadow-sm shadow-amber-500/20">
              <div className="w-full h-full rounded-full bg-[#070a13] flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18m-7-11h14" />
                </svg>
              </div>
            </div>
            <span className="font-serif text-lg tracking-wide text-white group-hover:text-amber-200 transition-colors">
              Les Silences Anonymes
            </span>
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => navigateTo('accueil')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px] flex items-center ${
                isHome ? 'text-amber-300 font-semibold' : ''
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => navigateTo('pensee-matin')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px] flex items-center ${
                isMorning ? 'text-amber-300 font-semibold' : ''
              }`}
            >
              Matin (6h)
            </button>
            <button
              onClick={() => navigateTo('pensee-soir')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px] flex items-center ${
                isEvening ? 'text-amber-300 font-semibold' : ''
              }`}
            >
              Soir (20h)
            </button>
            <button
              onClick={() => navigateTo('bibliotheque')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px] flex items-center ${
                isLibrary ? 'text-amber-300 font-semibold' : ''
              }`}
            >
              Bibliothèque
            </button>
            <button
              onClick={() => navigateTo('dons')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 min-h-[44px] flex items-center ${
                isDonation ? 'text-amber-300 font-semibold' : ''
              }`}
            >
              Soutenir
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {isInstallable && (
              <button
                onClick={install}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 text-amber-300 text-xs font-medium hover:bg-amber-500/10 transition whitespace-nowrap shrink-0 min-h-[36px]"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Installer l’app
              </button>
            )}

            <button
              onClick={() => navigateTo('profil')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap shrink-0 flex items-center gap-2 min-h-[40px] ${
                isProfile
                  ? 'bg-amber-500 text-[#070a13] font-semibold'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Mon Espace</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (Optimized for thumb-zone ergonomics) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070a13]/95 backdrop-blur-lg border-t border-white/[0.08] pb-safe">
        <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto">
          {/* Accueil */}
          <button
            onClick={() => navigateTo('accueil')}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
              isHome ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-medium tracking-tight mt-1">Accueil</span>
          </button>

          {/* Matin */}
          <button
            onClick={() => navigateTo('pensee-matin')}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
              isMorning ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-[10px] font-medium tracking-tight mt-1">Matin</span>
          </button>

          {/* Soir */}
          <button
            onClick={() => navigateTo('pensee-soir')}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
              isEvening ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span className="text-[10px] font-medium tracking-tight mt-1">Soir</span>
          </button>

          {/* Bibliothèque */}
          <button
            onClick={() => navigateTo('bibliotheque')}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
              isLibrary ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-[10px] font-medium tracking-tight mt-1">Livres</span>
          </button>

          {/* Profil */}
          <button
            onClick={() => navigateTo('profil')}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
              isProfile ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-[10px] font-medium tracking-tight mt-1">Espace</span>
          </button>
        </div>
      </div>
    </>
  );
};
