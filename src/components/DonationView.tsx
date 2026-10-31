import React, { useState } from 'react';
import { PaymentModal } from './PaymentModal';

export const DonationView: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const suggestedAmounts = [1000, 2500, 5000, 10000];

  const effectiveAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  const handleStartDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount > 0) {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="pb-28 pt-4 sm:pt-8 max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Editorial Header */}
      <div className="text-center">
        <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-medium">
          Les Silences Anonymes
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-white mt-1">
          Soutenir la Mission Spirituelle
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-lg mx-auto leading-relaxed">
          « Que chacun donne comme il l’a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie. » (2 Corinthiens 9:7)
        </p>
      </div>

      {/* Theological & Practical Impact Card */}
      <div className="rounded-3xl bg-[#0c1322] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-serif text-white">À quoi sert votre offrande ?</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Les dons reçus sont entièrement consacrés au développement de l'œuvre :
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-2">
              1
            </div>
            <h4 className="font-semibold text-white mb-1">Méditations gratuites</h4>
            <p className="text-slate-400 leading-relaxed">
              Diffusion quotidienne et sans publicité des pensées du matin et du soir à des milliers d’âmes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-2">
              2
            </div>
            <h4 className="font-semibold text-white mb-1">Édition chrétienne</h4>
            <p className="text-slate-400 leading-relaxed">
              Accompagnement et publication d’auteurs chrétiens africains et francophones sur le combat spirituel et la paix.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.04]">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-2">
              3
            </div>
            <h4 className="font-semibold text-white mb-1">Infrastructure technique</h4>
            <p className="text-slate-400 leading-relaxed">
              Maintien des serveurs, serveurs de notifications quotidiennes programmées et sécurité des données.
            </p>
          </div>
        </div>
      </div>

      {/* Donation Form */}
      <form onSubmit={handleStartDonation} className="rounded-3xl bg-[#0c1322] border border-amber-500/20 p-6 sm:p-8 space-y-6 shadow-xl">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            Choisissez le montant de votre offrande :
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {suggestedAmounts.map((amt) => (
              <button
                type="button"
                key={amt}
                onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount('');
                }}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold transition min-h-[48px] ${
                  selectedAmount === amt && !customAmount
                    ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                    : 'bg-slate-900/60 border-slate-700 text-white hover:border-slate-500'
                }`}
              >
                {amt.toLocaleString('fr-FR')} FCFA
              </button>
            ))}
          </div>
        </div>

        {/* Custom amount */}
        <div>
          <label htmlFor="custom-amount" className="block text-xs text-slate-300 mb-1">
            Ou saisir un montant libre (FCFA) :
          </label>
          <input
            id="custom-amount"
            type="number"
            min="100"
            step="100"
            placeholder="Ex: 15000"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
            }}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 min-h-[44px]"
          />
        </div>

        {/* Optional Donor Information */}
        <div className="space-y-4 pt-2 border-t border-white/[0.06]">
          <div>
            <label htmlFor="donor-name" className="block text-xs text-slate-300 mb-1">
              Votre prénom ou nom (facultatif, laissez vide pour rester anonyme) :
            </label>
            <input
              id="donor-name"
              type="text"
              placeholder="Ex: Frère anonyme"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 min-h-[44px]"
            />
          </div>

          <div>
            <label htmlFor="donor-message" className="block text-xs text-slate-300 mb-1">
              Un mot d'encouragement ou une intention de prière (facultatif) :
            </label>
            <textarea
              id="donor-message"
              rows={2}
              placeholder="Que le Seigneur continue de bénir ce ministère..."
              value={donorMessage}
              onChange={(e) => setDonorMessage(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={effectiveAmount <= 0}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm transition shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 min-h-[48px]"
          >
            <span>
              Continuer vers le paiement ({effectiveAmount.toLocaleString('fr-FR')} FCFA)
            </span>
          </button>
          <p className="text-[11px] text-slate-500 text-center mt-2">
            Moyens acceptés : Wave, Orange Money, MTN MoMo, Moov Money et Cartes bancaires.
          </p>
        </div>
      </form>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        type="donation"
        amountXof={effectiveAmount}
        donorName={donorName}
        donorMessage={donorMessage}
      />
    </div>
  );
};
