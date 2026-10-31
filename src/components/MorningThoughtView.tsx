import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ContemplationModal } from './ContemplationModal';

export const MorningThoughtView: React.FC = () => {
  const { thoughts, selectedThoughtId, toggleFavoriteThought, user } = useApp();
  const [showContemplation, setShowContemplation] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filter morning thoughts
  const morningThoughts = thoughts.filter((t) => t.type === 'morning');

  // Selected thought or latest published
  const currentThought =
    morningThoughts.find((t) => t.id === selectedThoughtId) ||
    morningThoughts.find((t) => t.status === 'published') ||
    morningThoughts[0];

  const [activeId, setActiveId] = useState(currentThought?.id || '');
  const activeThought = morningThoughts.find((t) => t.id === activeId) || currentThought;

  const isFavorite = user.favoriteThoughtIds.includes(activeThought.id);

  const handleShare = async () => {
    const textToShare = `Les Silences Anonymes — ${activeThought.title} : « ${activeThought.subtitle} »\n\n« ${activeThought.quote?.text || ''} » (${activeThought.quote?.author || ''})\n\n${activeThought.meditation}\n\n${window.location.origin}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Les Silences Anonymes — ${activeThought.subtitle}`,
          text: textToShare
        });
        return;
      } catch (err) {
        console.log('Share error or cancelled:', err);
      }
    }
    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignored
    }
  };

  return (
    <div className="pb-28 pt-4 sm:pt-8 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Top Banner & Date Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium">
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>L’instant du matin · {user.morningNotif.time}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white mt-1">
            Pensée du Jour
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowContemplation(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium hover:bg-amber-500/25 transition min-h-[44px]"
            title="Prendre 1 à 5 minutes de recueillement silencieux"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Silence & Prière</span>
          </button>

          <button
            onClick={() => toggleFavoriteThought(activeThought.id)}
            className={`p-2.5 rounded-xl border min-h-[44px] min-w-[44px] flex items-center justify-center transition ${
              isFavorite
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-white/5 border-white/[0.08] text-slate-400 hover:text-white'
            }`}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Enregistrer en favoris'}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white/5 border border-white/[0.08] text-slate-300 hover:text-white transition min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Partager"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {copied && (
        <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-xs text-amber-200 text-center animate-fade-in">
          Texte de la pensée copié dans le presse-papiers avec succès.
        </div>
      )}

      {/* Main Meditation Paper */}
      <article className="rounded-3xl bg-[#0c1322] border border-white/[0.09] p-6 sm:p-10 md:p-12 text-[#f1f3f7] shadow-xl relative overflow-hidden">
        {/* Subtle decorative aura */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header & Title */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2">
          <span className="font-semibold uppercase tracking-widest text-amber-400">
            {activeThought.title}
          </span>
          <span className="capitalize">
            {new Date(activeThought.date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-white mb-6">
          {activeThought.subtitle}
        </h2>

        {/* 2. Strong scriptural citation with attribution */}
        {activeThought.quote && (
          <div className="my-6 p-5 sm:p-6 rounded-2xl bg-[#101828]/70 border border-amber-500/25">
            <blockquote className="font-serif italic text-lg sm:text-xl text-amber-100/95 leading-relaxed">
              « {activeThought.quote.text} »
            </blockquote>
            <cite className="block text-xs font-sans text-amber-300 font-medium not-italic mt-3">
              — {activeThought.quote.author} {activeThought.quote.source ? `(${activeThought.quote.source})` : ''}
            </cite>
          </div>
        )}

        {/* 3. Brotherly greeting & gratitude */}
        {activeThought.greeting && (
          <p className="text-amber-200/90 font-medium text-sm sm:text-base leading-relaxed mb-6 italic">
            {activeThought.greeting}
          </p>
        )}

        {/* 4. Short meditation around a single idea (60 to 120 words) */}
        <div className="space-y-4 my-6 text-slate-200 text-base sm:text-lg font-serif leading-relaxed">
          <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-amber-400 first-letter:float-left first-letter:mr-2">
            {activeThought.meditation}
          </p>
        </div>

        {/* 5. Concrete daily application */}
        {activeThought.application && (
          <div className="my-6 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
              Application concrète pour ta journée
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeThought.application}
            </p>
          </div>
        )}

        {/* 6. Short prayer & blessing */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
              Courte prière
            </span>
            <p className="text-sm sm:text-base text-amber-100/90 font-serif italic">
              « {activeThought.prayer} »
            </p>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
              Bénédiction
            </span>
            <p className="text-xs sm:text-sm text-slate-300 font-serif">
              {activeThought.blessing}
            </p>
          </div>
        </div>
      </article>

      {/* History of morning thoughts */}
      <section className="space-y-4 pt-4">
        <h3 className="text-lg font-serif text-white">
          Historique des pensées du matin
        </h3>
        <div className="space-y-3">
          {morningThoughts.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between min-h-[56px] ${
                activeId === t.id
                  ? 'bg-amber-500/10 border-amber-500/40 text-white'
                  : 'bg-[#0c1322] border-white/[0.06] text-slate-300 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="text-xs text-amber-400 font-medium">
                  {new Date(t.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-sm font-serif font-medium mt-0.5 text-white">
                  {t.subtitle}
                </div>
              </div>

              <span className="text-xs text-slate-400">
                {activeId === t.id ? 'En cours de lecture' : 'Lire'}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Contemplation silence modal */}
      <ContemplationModal
        isOpen={showContemplation}
        onClose={() => setShowContemplation(false)}
        title="Silence du Matin"
      />
    </div>
  );
};
