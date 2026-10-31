import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookCategory } from '../types';

export const LibraryView: React.FC = () => {
  const { books, navigateTo, hasAccessToBook } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'free' | 'owned'>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Toutes les catégories' },
    { id: 'Comprendre le silence de Dieu', label: 'Comprendre le silence de Dieu' },
    { id: 'Les combats de nuit', label: 'Les combats de nuit' },
    { id: 'Apprendre à connaître Dieu', label: 'Apprendre à connaître Dieu' },
    { id: 'Apprendre à aimer Dieu', label: 'Apprendre à aimer Dieu' },
    { id: 'Témoignages de foi', label: 'Témoignages de foi' },
    { id: 'Prières et méditations', label: 'Prières et méditations' },
    { id: 'Croissance spirituelle', label: 'Croissance spirituelle' },
  ];

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Category match
      if (selectedCategory !== 'all' && book.category !== selectedCategory) {
        return false;
      }
      // Text search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(q);
        const matchesAuthor = book.author.toLowerCase().includes(q);
        const matchesDesc = book.shortDescription.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesDesc) return false;
      }
      // Access filter
      if (filterType === 'free' && !book.isFree) {
        return false;
      }
      if (filterType === 'owned' && !hasAccessToBook(book.id)) {
        return false;
      }
      return true;
    });
  }, [books, selectedCategory, searchQuery, filterType, hasAccessToBook]);

  return (
    <div className="pb-28 pt-4 sm:pt-8 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
            Édition Spirituelle
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-white mt-1">
            Bibliothèque chrétienne
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
            Des ouvrages ancrés dans les Écritures pour nourrir votre foi, traverser le silence de Dieu et grandir dans l'amour du Christ.
          </p>
        </div>

        {/* Subscription callout pill-less */}
        <div className="bg-[#0c1322] border border-amber-500/25 p-3.5 rounded-2xl flex items-center gap-3 shrink-0">
          <div>
            <div className="text-xs text-amber-300 font-medium">Formule illimitée</div>
            <div className="text-xs text-slate-400">1 000 FCFA / mois</div>
          </div>
          <button
            onClick={() => navigateTo('abonnement')}
            className="py-1.5 px-3 rounded-lg bg-amber-500 text-[#070a13] text-xs font-semibold hover:bg-amber-400 transition min-h-[36px]"
          >
            S'abonner
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher par titre, auteur ou thème..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#0c1322] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 min-h-[48px]"
          />
          <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Categories scrollable rail */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition min-h-[44px] ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-[#0c1322] text-slate-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary quick filters */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Filtrer par :</span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-lg transition min-h-[36px] ${
              filterType === 'all' ? 'text-amber-300 bg-white/5 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tous les livres
          </button>
          <button
            onClick={() => setFilterType('free')}
            className={`px-2.5 py-1 rounded-lg transition min-h-[36px] ${
              filterType === 'free' ? 'text-amber-300 bg-white/5 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Gratuits
          </button>
          <button
            onClick={() => setFilterType('owned')}
            className={`px-2.5 py-1 rounded-lg transition min-h-[36px] ${
              filterType === 'owned' ? 'text-amber-300 bg-white/5 font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Déjà accessibles
          </button>
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-[#0c1322] rounded-3xl border border-white/[0.06] p-8">
          <p className="text-base text-slate-300 font-serif">Aucun livre ne correspond à votre recherche.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setFilterType('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-medium min-h-[44px]"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const hasAccess = hasAccessToBook(book.id);

            return (
              <div
                key={book.id}
                onClick={() => navigateTo('livre-detail', book.id)}
                className="group cursor-pointer rounded-2xl bg-[#0c1322] border border-white/[0.07] hover:border-amber-500/40 overflow-hidden flex flex-col transition-all duration-300 shadow-lg"
              >
                {/* Book Cover */}
                <div className="aspect-[4/3] w-full bg-slate-900 relative overflow-hidden">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1322] via-transparent to-transparent opacity-80" />

                  {/* Badges on cover */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {book.featured && (
                      <span className="text-[10px] uppercase font-semibold text-amber-300 bg-black/75 px-2 py-0.5 rounded backdrop-blur-sm">
                        Recommandé
                      </span>
                    )}
                    {book.isNew && (
                      <span className="text-[10px] uppercase font-semibold text-emerald-300 bg-black/75 px-2 py-0.5 rounded backdrop-blur-sm">
                        Nouveauté
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm truncate max-w-[65%]">
                      {book.category}
                    </span>
                    <span className="font-semibold text-amber-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                      {book.isFree ? 'Gratuit' : `${book.priceXof} FCFA`}
                    </span>
                  </div>
                </div>

                {/* Content details */}
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
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span>{book.pageCount} p.</span>
                      <span>·</span>
                      <span>{book.chapters.length} chapitres</span>
                    </div>

                    <div>
                      {hasAccess ? (
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Accessible
                        </span>
                      ) : (
                        <span className="text-amber-300 font-medium group-hover:underline">
                          Voir l’ouvrage
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
