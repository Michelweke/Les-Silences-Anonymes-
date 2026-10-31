import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentMethod } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'book' | 'subscription' | 'donation';
  bookId?: string;
  bookTitle?: string;
  amountXof?: number;
  donorName?: string;
  donorMessage?: string;
  onSuccess?: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  type,
  bookId,
  bookTitle,
  amountXof = 500,
  donorName,
  donorMessage,
  onSuccess
}) => {
  const { purchaseBook, subscribeMonthly, makeDonation } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('wave');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentAmount = type === 'subscription' ? 1000 : amountXof;

  const paymentOptions: { id: PaymentMethod; name: string; desc: string; icon: string }[] = [
    { id: 'wave', name: 'Wave', desc: 'Sans frais supplémentaires', icon: '🌊' },
    { id: 'orange_money', name: 'Orange Money', desc: 'Côte d’Ivoire, Sénégal, Mali...', icon: '🟠' },
    { id: 'mtn_momo', name: 'MTN Mobile Money', desc: 'Bénin, Côte d’Ivoire, Cameroun...', icon: '🟡' },
    { id: 'moov_money', name: 'Moov Money', desc: 'Flooz / Moov Afrique de l’Ouest', icon: '🔵' },
    { id: 'card', name: 'Carte bancaire', desc: 'Visa, Mastercard', icon: '💳' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate verification delay
    setTimeout(async () => {
      let ok = false;
      if (type === 'book' && bookId) {
        ok = await purchaseBook(bookId, selectedMethod, phoneNumber);
      } else if (type === 'subscription') {
        ok = await subscribeMonthly(selectedMethod, phoneNumber);
      } else if (type === 'donation') {
        ok = await makeDonation(currentAmount, selectedMethod, phoneNumber, donorName, donorMessage);
      }

      setIsProcessing(false);
      if (ok) {
        setSuccessReference(`SIL-${Math.floor(100000 + Math.random() * 900000)}`);
        if (onSuccess) onSuccess();
      }
    }, 1200);
  };

  const handleFinish = () => {
    setSuccessReference(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-[#0d1424] border border-amber-500/20 p-6 md:p-8 text-[#f1f3f7] shadow-2xl relative">
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {successReference ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-white mb-2">
              {type === 'donation' ? 'Merci pour votre offrande' : 'Accès activé avec succès'}
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto mb-4">
              {type === 'book'
                ? `L'ouvrage « ${bookTitle} » est désormais accessible dans votre bibliothèque et votre espace « Mes livres » !`
                : type === 'subscription'
                ? 'Votre abonnement mensuel est actif. Vous avez accès à l’ensemble des ouvrages de la bibliothèque.'
                : 'Votre don soutient fidèlement la création de contenus spirituels et le développement de la mission.'}
            </p>

            <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 text-xs text-slate-400 mb-6 inline-block">
              Référence : <span className="font-mono text-amber-300">{successReference}</span> · Montant : <span className="text-white font-medium">{currentAmount.toLocaleString('fr-FR')} FCFA</span>
            </div>

            <div>
              <button
                onClick={handleFinish}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium hover:from-amber-500 hover:to-amber-600 transition min-h-[48px]"
              >
                Continuer
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-amber-400">
                {type === 'book' ? 'Achat de livre' : type === 'subscription' ? 'Abonnement mensuel' : 'Soutenir la mission'}
              </span>
              <h3 className="text-2xl font-serif text-white mt-1">
                {type === 'book' ? bookTitle : type === 'subscription' ? 'Accès illimité à toute la bibliothèque' : 'Offrande volontaire'}
              </h3>
              <p className="text-sm text-amber-300 font-medium mt-1">
                Montant : {currentAmount.toLocaleString('fr-FR')} FCFA
              </p>
            </div>

            {/* Demo Notice Banner */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 mb-5 flex items-start gap-2.5">
              <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs text-amber-200/90 leading-relaxed">
                <strong>Mode Démonstration Sécurisé (Phase 1) :</strong> Le module de paiement Mobile Money est simulé. Aucun débit bancaire réel ne sera effectué. L'accès au contenu sera déverrouillé immédiatement.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Sélectionnez votre moyen de règlement :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {paymentOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setSelectedMethod(opt.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition min-h-[52px] ${
                        selectedMethod === opt.id
                          ? 'border-amber-500/80 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-slate-900/50 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{opt.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{opt.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedMethod !== 'card' && (
                <div>
                  <label htmlFor="payment-phone" className="block text-xs font-medium text-slate-300 mb-1">
                    Numéro de téléphone ({selectedMethod.replace('_', ' ').toUpperCase()})
                  </label>
                  <input
                    id="payment-phone"
                    type="tel"
                    required
                    placeholder="Ex: +225 07 00 00 00 00"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 min-h-[44px]"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Un message de confirmation d'autorisation sera envoyé à ce numéro.
                  </p>
                </div>
              )}

              {selectedMethod === 'card' && (
                <div className="space-y-2">
                  <div>
                    <label htmlFor="card-number" className="block text-xs font-medium text-slate-300 mb-1">
                      Numéro de carte de test
                    </label>
                    <input
                      id="card-number"
                      type="text"
                      placeholder="4000 0000 0000 0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 min-h-[44px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="card-expiry" className="block text-xs font-medium text-slate-300 mb-1">
                        Expiration
                      </label>
                      <input
                        id="card-expiry"
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="card-cvv" className="block text-xs font-medium text-slate-300 mb-1">
                        CVC
                      </label>
                      <input
                        id="card-cvv"
                        type="text"
                        placeholder="123"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 min-h-[44px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm transition shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 min-h-[48px]"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Vérification de la transaction...</span>
                    </>
                  ) : (
                    <span>
                      Confirmer le règlement ({currentAmount.toLocaleString('fr-FR')} FCFA)
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
