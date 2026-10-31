import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Book, BookCategory, Thought } from '../types';

export const AdminView: React.FC = () => {
  const {
    thoughts,
    books,
    orders,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    adminAddOrUpdateThought,
    adminDeleteThought,
    adminAddOrUpdateBook,
    adminDeleteBook,
    navigateTo
  } = useApp();

  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [adminTab, setAdminTab] = useState<'thoughts' | 'books' | 'orders'>('thoughts');

  // Thought editor state
  const [editingThought, setEditingThought] = useState<Thought | null>(null);
  const [previewThought, setPreviewThought] = useState<Thought | null>(null);

  // Book editor state
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const categories: BookCategory[] = [
    'Apprendre à connaître Dieu',
    'Comprendre le silence de Dieu',
    'Apprendre à aimer Dieu',
    'Les combats de nuit',
    'Témoignages de foi',
    'Prières et méditations',
    'Croissance spirituelle'
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(passcode);
    if (!ok) {
      setAuthError(true);
    } else {
      setAuthError(false);
    }
  };

  // If not authenticated, show passcode screen
  if (!isAdminAuthenticated) {
    return (
      <div className="pb-28 pt-8 max-w-md mx-auto px-4">
        <div className="rounded-3xl bg-[#0c1322] border border-white/[0.08] p-8 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Espace Administrateur
            </span>
            <h2 className="text-2xl font-serif text-white mt-1">Connexion Sécurisée</h2>
            <p className="text-xs text-slate-400 mt-2">
              Accès réservé aux pasteurs, éditeurs et administrateurs des Silences Anonymes.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-passcode" className="block text-xs text-slate-300 text-left mb-1">
                Code d’accès secret
              </label>
              <input
                id="admin-passcode"
                type="password"
                placeholder="Entrez le code d'accès"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 min-h-[44px]"
              />
              <p className="text-[11px] text-slate-500 text-left mt-1">
                Code de démonstration pour la phase 1 : <code className="text-amber-300 font-mono">silence2026</code>
              </p>
            </div>

            {authError && (
              <p className="text-xs text-red-400">
                Code d'accès incorrect. Veuillez réessayer.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition min-h-[44px]"
            >
              Déverrouiller la console
            </button>
          </form>

          <button
            onClick={() => navigateTo('accueil')}
            className="text-xs text-slate-400 hover:text-white underline pt-2 block"
          >
            ← Retourner à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // Handle New Thought Creation
  const handleStartNewThought = (type: 'morning' | 'evening') => {
    const isMorning = type === 'morning';
    const newThought: Thought = {
      id: `${type}-${Date.now()}`,
      type,
      title: isMorning ? 'PENSÉE DU JOUR' : 'PENSÉE DU SOIR',
      subtitle: '',
      date: new Date().toISOString().split('T')[0],
      scheduledTime: isMorning ? '06:00' : '20:00',
      quote: {
        text: '',
        author: '',
        source: ''
      },
      greeting: isMorning ? 'Bonjour mon frère, bonjour ma sœur.' : undefined,
      meditation: '',
      introspectionQuestion: isMorning ? undefined : '',
      application: isMorning ? '' : undefined,
      prayer: '',
      blessing: '',
      status: 'draft',
      readTimeEstimate: '1 min'
    };
    setEditingThought(newThought);
  };

  // Handle Save Thought
  const handleSaveThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingThought) return;
    adminAddOrUpdateThought(editingThought);
    setEditingThought(null);
  };

  // Handle New Book Creation
  const handleStartNewBook = () => {
    const newBook: Book = {
      id: `book-${Date.now()}`,
      title: '',
      author: '',
      category: 'Apprendre à connaître Dieu',
      shortDescription: '',
      fullDescription: '',
      coverImage: '/src/assets/images/open_bible_candle_1793440595151.jpg',
      priceXof: 500,
      isFree: false,
      isSubscriptionIncluded: true,
      sampleExcerpt: '',
      chapters: [
        {
          id: `chap-${Date.now()}-1`,
          chapterNumber: 1,
          title: 'Chapitre 1 : L’aube de la foi',
          content: 'Texte d’introduction du chapitre...'
        }
      ],
      pageCount: 80,
      publishedYear: new Date().getFullYear(),
      featured: false,
      isNew: true
    };
    setEditingBook(newBook);
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;
    adminAddOrUpdateBook(editingBook);
    setEditingBook(null);
  };

  return (
    <div className="pb-28 pt-4 sm:pt-8 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Console d'Administration
            </span>
            <span className="text-[10px] bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
              Session vérifiée
            </span>
          </div>
          <h1 className="text-3xl font-serif text-white mt-1">
            Gestion des Silences Anonymes
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('accueil')}
            className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 min-h-[40px]"
          >
            Voir l'application
          </button>
          <button
            onClick={logoutAdmin}
            className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/30 hover:bg-red-500/10 min-h-[40px]"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 text-xs">
        <button
          onClick={() => setAdminTab('thoughts')}
          className={`py-2 px-4 rounded-xl font-medium transition min-h-[44px] ${
            adminTab === 'thoughts'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Pensées Matin & Soir ({thoughts.length})
        </button>
        <button
          onClick={() => setAdminTab('books')}
          className={`py-2 px-4 rounded-xl font-medium transition min-h-[44px] ${
            adminTab === 'books'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Livres & Chapitres ({books.length})
        </button>
        <button
          onClick={() => setAdminTab('orders')}
          className={`py-2 px-4 rounded-xl font-medium transition min-h-[44px] ${
            adminTab === 'orders'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Commandes & Dons ({orders.length})
        </button>
      </div>

      {/* TAB 1: THOUGHTS */}
      {adminTab === 'thoughts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif text-white">Pensées spirituelles</h2>
              <p className="text-xs text-slate-400">
                Créez, programmez et publiez les réflexions du matin et du soir.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleStartNewThought('morning')}
                className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition min-h-[40px]"
              >
                + Pensée du Matin
              </button>
              <button
                onClick={() => handleStartNewThought('evening')}
                className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition min-h-[40px]"
              >
                + Pensée du Soir
              </button>
            </div>
          </div>

          {/* List of thoughts */}
          <div className="space-y-3">
            {thoughts.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-[#0c1322] border border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`font-semibold ${
                        t.type === 'morning' ? 'text-amber-400' : 'text-indigo-400'
                      }`}
                    >
                      {t.type === 'morning' ? 'MATIN (6h)' : 'SOIR (20h)'}
                    </span>
                    <span>·</span>
                    <span className="text-slate-400">{t.date}</span>
                    <span>·</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded ${
                        t.status === 'published'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : t.status === 'scheduled'
                          ? 'bg-blue-500/15 text-blue-400'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {t.status === 'published'
                        ? 'Publié'
                        : t.status === 'scheduled'
                        ? 'Programmé'
                        : 'Brouillon'}
                    </span>
                  </div>
                  <h3 className="text-base font-serif text-white font-medium">{t.subtitle}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1 italic">
                    « {t.quote?.text} » — {t.quote?.author}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewThought(t)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs min-h-[36px]"
                  >
                    Aperçu
                  </button>
                  <button
                    onClick={() => setEditingThought(t)}
                    className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs min-h-[36px]"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => adminDeleteThought(t.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs min-h-[36px]"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BOOKS */}
      {adminTab === 'books' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif text-white">Catalogue des Livres</h2>
              <p className="text-xs text-slate-400">
                Gérez les ouvrages chrétiens, leurs chapitres, prix et extraits de démonstration.
              </p>
            </div>
            <button
              onClick={handleStartNewBook}
              className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition min-h-[40px]"
            >
              + Ajouter un Livre
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {books.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-[#0c1322] border border-white/[0.06] flex items-start gap-4"
              >
                <div className="w-16 h-20 bg-slate-900 rounded-lg overflow-hidden shrink-0">
                  <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-amber-300 uppercase tracking-wide block truncate">
                    {b.category}
                  </span>
                  <h3 className="font-serif text-sm text-white font-medium truncate">{b.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{b.author}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                    <span className="font-semibold text-amber-300">
                      {b.isFree ? 'Gratuit' : `${b.priceXof} FCFA`}
                    </span>
                    <span>·</span>
                    <span>{b.chapters.length} chapitres</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setEditingBook(b)}
                      className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => adminDeleteBook(b.id)}
                      className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 text-xs"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS & DONATIONS */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-serif text-white">Suivi des Transactions</h2>
            <p className="text-xs text-slate-400">
              Achats de livres, abonnements mensuels (1 000 FCFA) et offrandes de soutien.
            </p>
          </div>

          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-[#0c1322] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-white text-sm">{ord.targetTitle}</div>
                  <div className="text-slate-400 mt-0.5">
                    Réf : <span className="font-mono text-amber-300">{ord.reference}</span> · Type : {ord.type} · Méthode : {ord.paymentMethod}
                    {ord.donorName ? ` · Donateur : ${ord.donorName}` : ''}
                  </div>
                  {ord.donorMessage && (
                    <div className="text-slate-300 mt-1 italic">
                      « {ord.donorMessage} »
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-serif text-base text-amber-300 font-semibold">
                    {ord.amountXof.toLocaleString('fr-FR')} FCFA
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* THOUGHT EDITOR MODAL */}
      {editingThought && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-[#0d1424] border border-amber-500/25 p-6 md:p-8 text-[#f1f3f7] shadow-2xl relative my-8">
            <button
              onClick={() => setEditingThought(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              ✕
            </button>

            <h2 className="text-xl font-serif text-white mb-4">
              {editingThought.type === 'morning' ? 'Éditer la Pensée du Matin' : 'Éditer la Pensée du Soir'}
            </h2>

            <form onSubmit={handleSaveThought} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="edit-thought-subtitle" className="block text-slate-400 mb-1">Titre de la méditation</label>
                  <input
                    id="edit-thought-subtitle"
                    type="text"
                    required
                    value={editingThought.subtitle}
                    onChange={(e) => setEditingThought({ ...editingThought, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label htmlFor="edit-thought-date" className="block text-slate-400 mb-1">Date</label>
                  <input
                    id="edit-thought-date"
                    type="date"
                    required
                    value={editingThought.date}
                    onChange={(e) => setEditingThought({ ...editingThought, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label htmlFor="edit-thought-status" className="block text-slate-400 mb-1">Statut</label>
                  <select
                    id="edit-thought-status"
                    value={editingThought.status}
                    onChange={(e) =>
                      setEditingThought({ ...editingThought, status: e.target.value as Thought['status'] })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="scheduled">Programmé</option>
                    <option value="published">Publié</option>
                  </select>
                </div>
              </div>

              {/* Quote */}
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="font-semibold text-amber-300 block">Citation & Source</span>
                <div>
                  <label htmlFor="edit-quote-text" className="block text-slate-400 mb-1">Texte de la citation</label>
                  <textarea
                    id="edit-quote-text"
                    rows={2}
                    value={editingThought.quote?.text || ''}
                    onChange={(e) =>
                      setEditingThought({
                        ...editingThought,
                        quote: { ...editingThought.quote, text: e.target.value, author: editingThought.quote?.author || '' }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="edit-quote-author" className="block text-slate-400 mb-1">Auteur / Référence biblique</label>
                  <input
                    id="edit-quote-author"
                    type="text"
                    value={editingThought.quote?.author || ''}
                    onChange={(e) =>
                      setEditingThought({
                        ...editingThought,
                        quote: { ...editingThought.quote, author: e.target.value, text: editingThought.quote?.text || '' }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
              </div>

              {/* Meditation Text */}
              <div>
                <label htmlFor="edit-meditation-text" className="block text-slate-400 mb-1">
                  Méditation (Format court 60 à 120 mots)
                </label>
                <textarea
                  id="edit-meditation-text"
                  rows={4}
                  required
                  value={editingThought.meditation}
                  onChange={(e) => setEditingThought({ ...editingThought, meditation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-serif text-sm"
                />
              </div>

              {editingThought.type === 'morning' ? (
                <div>
                  <label htmlFor="edit-thought-application" className="block text-slate-400 mb-1">Application concrète à la vie quotidienne</label>
                  <input
                    id="edit-thought-application"
                    type="text"
                    value={editingThought.application || ''}
                    onChange={(e) => setEditingThought({ ...editingThought, application: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="edit-thought-introspection" className="block text-slate-400 mb-1">Question d’introspection du soir</label>
                  <input
                    id="edit-thought-introspection"
                    type="text"
                    value={editingThought.introspectionQuestion || ''}
                    onChange={(e) => setEditingThought({ ...editingThought, introspectionQuestion: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="edit-thought-prayer" className="block text-slate-400 mb-1">Courte prière</label>
                  <input
                    id="edit-thought-prayer"
                    type="text"
                    required
                    value={editingThought.prayer}
                    onChange={(e) => setEditingThought({ ...editingThought, prayer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label htmlFor="edit-thought-blessing" className="block text-slate-400 mb-1">Bénédiction</label>
                  <input
                    id="edit-thought-blessing"
                    type="text"
                    required
                    value={editingThought.blessing}
                    onChange={(e) => setEditingThought({ ...editingThought, blessing: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingThought(null)}
                  className="py-2 px-4 rounded-xl border border-slate-700 text-slate-300 min-h-[40px]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold min-h-[40px]"
                >
                  Enregistrer la pensée
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOOK EDITOR MODAL */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-[#0d1424] border border-amber-500/25 p-6 md:p-8 text-[#f1f3f7] shadow-2xl relative my-8">
            <button
              onClick={() => setEditingBook(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              ✕
            </button>

            <h2 className="text-xl font-serif text-white mb-4">Éditer l'ouvrage</h2>

            <form onSubmit={handleSaveBook} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="edit-book-title" className="block text-slate-400 mb-1">Titre du livre</label>
                  <input
                    id="edit-book-title"
                    type="text"
                    required
                    value={editingBook.title}
                    onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label htmlFor="edit-book-author" className="block text-slate-400 mb-1">Auteur</label>
                  <input
                    id="edit-book-author"
                    type="text"
                    required
                    value={editingBook.author}
                    onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="edit-book-category" className="block text-slate-400 mb-1">Catégorie</label>
                  <select
                    id="edit-book-category"
                    value={editingBook.category}
                    onChange={(e) =>
                      setEditingBook({ ...editingBook, category: e.target.value as BookCategory })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="edit-book-price" className="block text-slate-400 mb-1">Prix (FCFA)</label>
                  <input
                    id="edit-book-price"
                    type="number"
                    value={editingBook.priceXof}
                    onChange={(e) => setEditingBook({ ...editingBook, priceXof: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label htmlFor="edit-book-pages" className="block text-slate-400 mb-1">Nombre de pages</label>
                  <input
                    id="edit-book-pages"
                    type="number"
                    value={editingBook.pageCount}
                    onChange={(e) => setEditingBook({ ...editingBook, pageCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-book-short-desc" className="block text-slate-400 mb-1">Description courte</label>
                <input
                  id="edit-book-short-desc"
                  type="text"
                  required
                  value={editingBook.shortDescription}
                  onChange={(e) => setEditingBook({ ...editingBook, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white min-h-[40px]"
                />
              </div>

              <div>
                <label htmlFor="edit-book-full-desc" className="block text-slate-400 mb-1">Présentation complète</label>
                <textarea
                  id="edit-book-full-desc"
                  rows={3}
                  value={editingBook.fullDescription}
                  onChange={(e) => setEditingBook({ ...editingBook, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label htmlFor="edit-book-sample-excerpt" className="block text-slate-400 mb-1">Extrait d’aperçu gratuit</label>
                <textarea
                  id="edit-book-sample-excerpt"
                  rows={2}
                  value={editingBook.sampleExcerpt}
                  onChange={(e) => setEditingBook({ ...editingBook, sampleExcerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="py-2 px-4 rounded-xl border border-slate-700 text-slate-300 min-h-[40px]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold min-h-[40px]"
                >
                  Enregistrer le livre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewThought && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0c1322] border border-amber-500/30 p-6 md:p-8 text-[#f1f3f7] shadow-2xl relative">
            <button
              onClick={() => setPreviewThought(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
            >
              ✕
            </button>
            <span className="text-xs uppercase tracking-widest text-amber-400">
              Prévisualisation Éditoriale
            </span>
            <h3 className="text-2xl font-serif text-white mt-1 mb-4">{previewThought.subtitle}</h3>

            {previewThought.quote && (
              <blockquote className="my-4 p-4 rounded-xl bg-[#101828] border border-amber-500/20 font-serif italic text-amber-100">
                « {previewThought.quote.text} »
                <cite className="block text-xs font-sans not-italic text-amber-300 mt-2 font-normal">
                  — {previewThought.quote.author}
                </cite>
              </blockquote>
            )}

            <p className="text-sm text-slate-200 font-serif leading-relaxed mb-4">
              {previewThought.meditation}
            </p>

            <div className="p-3 bg-white/5 rounded-xl text-xs space-y-1">
              <p className="text-amber-300 italic">Prière : « {previewThought.prayer} »</p>
              <p className="text-slate-400">Bénédiction : {previewThought.blessing}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
