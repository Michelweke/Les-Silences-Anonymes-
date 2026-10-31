import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentModal } from './PaymentModal';

export const SubscriptionView: React.FC = () => {
  const { user, navigateTo } = useApp();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const isSubscribed = user.subscription.active;

  return (
    <div className="pb-28 pt-4 sm:pt-8 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-medium">
          Les Silences Anonymes
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-white mt-1">
          Abonnement Spirituel Illimité
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
          Nourrissez votre relation quotidienne avec Dieu grâce à un accès complet à tous les ouvrages de la bibliothèque chrétienne.
        </p>
      </div>

      {/* Main Pricing Card */}
      <div className="rounded-3xl bg-[#0c1322] border border-amber-500/30 p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Offre Mensuelle Complète
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl sm:text-5xl font-serif text-white font-medium">
                1 000
              </span>
              <span className="text-xl font-serif text-amber-300">FCFA</span>
              <span className="text-xs text-slate-400">/ mois</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Règlement simple et sécurisé par Mobile Money (Wave, Orange, MTN, Moov) ou carte.
            </p>
          </div>

          <div>
            {isSubscribed ? (
              <div className="text-left md:text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Abonnement actif
                </span>
                {user.subscription.expiresAt && (
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Valide jusqu'au{' '}
                    {new Date(user.subscription.expiresAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm transition shadow-lg shadow-amber-900/40 min-h-[48px]"
              >
                Activer mon abonnement (1 000 FCFA)
              </button>
            )}
          </div>
        </div>

        {/* Value Proposition List */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              ✓
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Accès illimité à toute la bibliothèque</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Lisez l'ensemble des titres présents et à venir (comprendre le silence de Dieu, combats de nuit, prières...).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              ✓
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Lecture hors-ligne & sauvegarde</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Reprise automatique de lecture, ajustement de la taille du texte et thèmes de nuit apaisants.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              ✓
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Soutien direct aux auteurs chrétiens</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Votre cotisation mensuelle rétribue les auteurs et permet la production de nouvelles pensées chaque jour.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              ✓
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Sans engagement contraignant</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Renouvellement mois par mois sans prélèvement automatique forcé. Vous restez maître de votre engagement.
              </p>
            </div>
          </div>
        </div>

        {isSubscribed && (
          <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
            <button
              onClick={() => navigateTo('bibliotheque')}
              className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#070a13] font-semibold text-xs transition"
            >
              Parcourir mes livres accessibles →
            </button>
          </div>
        )}
      </div>

      {/* Alternative: Individual purchase explanation */}
      <div className="p-6 rounded-2xl bg-[#0c1322]/70 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-serif text-white font-medium">Vous préférez acheter un seul livre ?</h4>
          <p className="text-xs text-slate-400 mt-1">
            Chaque ouvrage peut être acheté à l'unité au tarif de 500 FCFA avec un accès définitif.
          </p>
        </div>
        <button
          onClick={() => navigateTo('bibliotheque')}
          className="px-4 py-2 rounded-xl border border-white/[0.1] hover:bg-white/5 text-xs text-slate-300 whitespace-nowrap min-h-[44px]"
        >
          Voir les livres à 500 FCFA
        </button>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        type="subscription"
        amountXof={1000}
      />
    </div>
  );
};
