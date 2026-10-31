import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentModal } from './PaymentModal';

export const BookDetailView: React.FC = () => {
  const { books, selectedBookId, navigateTo, hasAccessToBook, user } = useApp();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const book = books.find((b) => b.id === selectedBookId) || books[0];
  const hasAccess = hasAccessToBook(book.id);
  const progress = user.readingProgress[book.id];

  return (
    <div className="pb-28 pt-4 sm:pt-8 max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('bibliotheque')}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition py-2 min-h-[44px]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Retour à la bibliothèque</span>
        </button>
      </div>

      {/* Main Presentation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Cover Column */}
        <div className="md:col-span-5">
          <div className="rounded-3xl overflow-hidden bg-slate-900 border border-white/[0.08] shadow-2xl relative aspect-[3/4]">
            <img
              src={book.coverImage}
              alt={book.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
              <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-amber-200">
                {book.category}
              </span>
              <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg font-semibold text-amber-300">
                {book.isFree ? 'Gratuit' : `${book.priceXof} FCFA`}
              </span>
            </div>
          </div>

          {/* Quick reading progress if already reading */}
          {progress && (
            <div className="mt-4 p-4 rounded-2xl bg-[#0c1322] border border-white/[0.07] text-xs">
              <div className="flex justify-between text-slate-300 mb-1.5">
                <span>Progression de lecture</span>
                <span className="font-semibold text-amber-300">{progress.percentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="md:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium">
              <span>{book.category}</span>
              <span>·</span>
              <span>Édition {book.publishedYear}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-white font-normal mt-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-sm text-slate-400 mt-1">Ouvrage spirituel par {book.author}</p>
          </div>

          {/* Access status box */}
          <div className="p-5 rounded-2xl bg-[#0c1322] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Tarif unitaire</span>
                <span className="text-2xl font-serif text-amber-300 font-medium">
                  {book.isFree ? 'Gratuit' : `${book.priceXof} FCFA`}
                </span>
              </div>

              <div>
                {hasAccess ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Livre accessible
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">
                    Achat définitif ou inclus dans l’abonnement
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {hasAccess ? (
                <button
                  onClick={() => navigateTo('lecteur', book.id)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm transition shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{progress ? 'Reprendre la lecture' : 'Ouvrir le lecteur'}</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm transition shadow-lg shadow-amber-900/30 min-h-[48px]"
                  >
                    Acheter ce livre (500 FCFA)
                  </button>

                  <button
                    onClick={() => setShowPreviewModal(true)}
                    className="py-3.5 px-5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-slate-200 text-sm font-medium transition min-h-[48px]"
                  >
                    Lire un extrait gratuit
                  </button>
                </>
              )}
            </div>

            {!hasAccess && (
              <div className="pt-2 text-center border-t border-white/[0.06]">
                <button
                  onClick={() => navigateTo('abonnement')}
                  className="text-xs text-amber-300 hover:text-amber-200 transition"
                >
                  Ou accédez à tous les livres avec l’abonnement à 1 000 FCFA / mois →
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-white">Présentation de l'ouvrage</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {book.fullDescription}
            </p>
          </div>

          {/* Chapter Outline */}
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-serif text-white">Sommaire des chapitres</h3>
            <div className="space-y-2">
              {book.chapters.map((chap) => (
                <div
                  key={chap.id}
                  className="p-3.5 rounded-xl bg-[#0c1322] border border-white/[0.06] flex items-center justify-between text-xs"
                >
                  <span className="text-slate-300 font-medium">
                    {chap.title}
                  </span>
                  <span className="text-slate-500">
                    {hasAccess ? 'Disponible' : 'Verrouillé'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Excerpt Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0d1424] border border-amber-500/25 p-6 md:p-8 text-[#f1f3f7] shadow-2xl relative">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="text-xs uppercase tracking-widest text-amber-400">Extrait de lecture</span>
            <h3 className="text-xl font-serif text-white mt-1 mb-4">{book.title}</h3>

            <div className="my-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 font-serif text-base leading-relaxed italic">
              « {book.sampleExcerpt} »
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Pour poursuivre la lecture complète des {book.chapters.length} chapitres, activez votre accès individuel (500 FCFA) ou l'abonnement mensuel (1 000 FCFA).
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  setShowPaymentModal(true);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#070a13] font-medium text-xs transition min-h-[44px]"
              >
                Acheter le livre (500 FCFA)
              </button>
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  navigateTo('abonnement');
                }}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition min-h-[44px]"
              >
                S'abonner (1 000 FCFA)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        type="book"
        bookId={book.id}
        bookTitle={book.title}
        amountXof={book.priceXof}
      />
    </div>
  );
};
