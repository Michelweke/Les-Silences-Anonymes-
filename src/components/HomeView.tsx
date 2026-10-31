import React from 'react';
import { useApp } from '../context/AppContext';

export const HomeView: React.FC = () => {
  const { thoughts, books, navigateTo, user, toggleFavoriteThought } = useApp();

  // Determine morning vs evening based on local hour
  const currentHour = new Date().getHours();
  const isMorningTime = currentHour < 15; // Morning focus from 00h to 15h, Evening focus after 15h

  const activeThought = thoughts.find((t) =>
    isMorningTime ? t.type === 'morning' && t.status === 'published' : t.type === 'evening' && t.status === 'published'
  ) || thoughts[0];

  const nextAppointmentText = isMorningTime
    ? `Prochain rendez-vous : Silence du soir à ${user.eveningNotif.time}`
    : `Prochain rendez-vous : Silence du matin à ${user.morningNotif.time}`;

  const recommendedBooks = books.slice(0, 3);
  const isFavorite = user.favoriteThoughtIds.includes(activeThought.id);

  return (
    <div className="pb-24 pt-4 sm:pt-8 space-y-12 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Editorial Welcome Header */}
      <section className="text-center pt-2 pb-2 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-400/90 font-medium">
          Les Silences Anonymes
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal tracking-tight mt-2 text-balance">
          Chaque jour, un instant avec Dieu.
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Bienvenue dans ce lieu de recueillement et de paix. Déposez vos fardeaux et laissez Sa Parole renouveler votre âme.
        </p>

        {/* Quiet spiritual appointment indicator */}
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-amber-200/80 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
          <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{nextAppointmentText}</span>
        </div>
      </section>

      {/* Dominant Hero Card: Main Spiritual Thought of the moment */}
      <section>
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.09] bg-[#0c1322] shadow-2xl">
          {/* Evocative background backdrop */}
          <div className="absolute inset-0 z-0">
            <img
              src={
                activeThought.type === 'morning'
                  ? '/src/assets/images/hero_dawn_light_1793440593712.jpg'
                  : '/src/assets/images/night_sky_stars_1793440594481.jpg'
              }
              alt="Atmosphère méditative"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-30 transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-[#0c1322]/85 to-transparent" />
          </div>

          {/* Content container */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 text-xs tracking-wider text-amber-300/90 font-medium uppercase">
                <span>{activeThought.title}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400 capitalize">
                  {new Date(activeThought.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{activeThought.readTimeEstimate} de lecture</span>
              </div>

              <button
                onClick={() => toggleFavoriteThought(activeThought.id)}
                className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full p-2 transition-colors ${
                  isFavorite ? 'text-amber-400 bg-amber-500/15' : 'text-slate-400 hover:text-white bg-white/5'
                }`}
                aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-normal mb-4">
              « {activeThought.subtitle} »
            </h2>

            {/* Scriptural quote */}
            {activeThought.quote && (
              <blockquote className="my-5 pl-4 border-l-2 border-amber-500/40 text-amber-100/95 font-serif italic text-base sm:text-lg leading-relaxed max-w-3xl">
                « {activeThought.quote.text} »
                <cite className="block text-xs font-sans text-amber-300/80 not-italic mt-2 font-normal">
                  — {activeThought.quote.author}
                </cite>
              </blockquote>
            )}

            {/* Excerpt of meditation */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-3xl mb-6">
              {activeThought.meditation}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() =>
                  navigateTo(activeThought.type === 'morning' ? 'pensee-matin' : 'pensee-soir', activeThought.id)
                }
                className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#070a13] font-medium text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2 min-h-[48px]"
              >
                <span>Lire la pensée complète</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={() =>
                  navigateTo(activeThought.type === 'morning' ? 'pensee-soir' : 'pensee-matin')
                }
                className="py-3 px-5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-slate-200 text-sm font-medium transition min-h-[48px]"
              >
                {activeThought.type === 'morning' ? 'Voir la pensée du soir' : 'Voir la pensée du matin'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Two Times of the Day Quick Access Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Morning block */}
        <div
          onClick={() => navigateTo('pensee-matin')}
          className="group cursor-pointer rounded-2xl bg-[#0c1322] border border-white/[0.07] hover:border-amber-500/30 p-6 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-amber-300 mb-2">
              <span className="uppercase tracking-widest font-semibold">Le Silence du Matin</span>
              <span className="text-slate-400">06h00 (ou 05h45)</span>
            </div>
            <h3 className="text-xl font-serif text-white group-hover:text-amber-200 transition-colors">
              Ouvrir sa journée avec Dieu
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Une pensée courte de 60 à 120 mots, une salutation fraternelle, une application concrète et une bénédiction pour guider vos pas.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-amber-300/90 font-medium">
            <span>Méditer le matin</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Evening block */}
        <div
          onClick={() => navigateTo('pensee-soir')}
          className="group cursor-pointer rounded-2xl bg-[#0c1322] border border-white/[0.07] hover:border-amber-500/30 p-6 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-amber-300 mb-2">
              <span className="uppercase tracking-widest font-semibold">Le Silence du Soir</span>
              <span className="text-slate-400">20h00 (ou 21h00)</span>
            </div>
            <h3 className="text-xl font-serif text-white group-hover:text-amber-200 transition-colors">
              Déposer la journée et trouver le repos
            </h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Une minute de lecture apaisante, une question d’introspection, une prière d’abandon et une bénédiction pour la nuit.
            </p>
          </div>
          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-amber-300/90 font-medium">
            <span>Méditer le soir</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/[0.07] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400">
              Littérature Spirituelle
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">
              Livres recommandés
            </h2>
          </div>
          <button
            onClick={() => navigateTo('bibliotheque')}
            className="text-xs font-medium text-amber-300 hover:text-amber-200 flex items-center gap-1 min-h-[44px]"
          >
            <span>Voir toute la bibliothèque ({books.length} ouvrages)</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => navigateTo('livre-detail', book.id)}
              className="group cursor-pointer rounded-2xl bg-[#0c1322] border border-white/[0.07] hover:border-amber-500/30 overflow-hidden flex flex-col transition-all duration-300"
            >
              {/* Cover visual */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="text-[11px] font-medium text-amber-200 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                    {book.category}
                  </span>
                  <span className="font-semibold text-amber-300 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                    {book.isFree ? 'Gratuit' : `${book.priceXof} FCFA`}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Par {book.author}</p>
                  <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                    {book.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-slate-400">{book.pageCount} pages</span>
                  <span className="text-amber-300 font-medium group-hover:underline">
                    Découvrir l'ouvrage
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-[#11192e] via-[#0e1627] to-[#151c2f] border border-amber-500/20 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
            Formule d'Accès Spirituel
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
            Abonnement mensuel : 1 000 FCFA
          </h3>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Accédez en illimité à l'intégralité de nos livres chrétiens, aux enseignements approfondis et aux guides de prière, sans aucune interruption.
          </p>
        </div>
        <button
          onClick={() => navigateTo('abonnement')}
          className="w-full md:w-auto py-3.5 px-7 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm transition shadow-lg shadow-amber-900/30 whitespace-nowrap min-h-[48px]"
        >
          Découvrir l'abonnement
        </button>
      </section>

      {/* Support / Donation Mission Section */}
      <section className="text-center py-6 px-4 rounded-3xl bg-[#0c1322]/80 border border-white/[0.06]">
        <div className="max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif text-white">Soutenir la mission des Silences Anonymes</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Votre soutien volontaire permet d'assurer la rédaction quotidienne des pensées spirituelles et d'enrichir la bibliothèque de nouveaux auteurs chrétiens.
          </p>
          <div className="mt-5">
            <button
              onClick={() => navigateTo('dons')}
              className="py-2.5 px-6 rounded-xl border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 text-xs font-medium transition min-h-[44px]"
            >
              Faire une offrande volontaire
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
