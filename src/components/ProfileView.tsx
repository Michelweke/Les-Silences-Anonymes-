import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ProfileView: React.FC = () => {
  const {
    user,
    thoughts,
    books,
    orders,
    navigateTo,
    updateUserProfile,
    requestNotificationPermission,
    sendTestNotification,
    notificationPermission
  } = useApp();

  const [name, setName] = useState(user.name);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const favoriteThoughts = thoughts.filter((t) => user.favoriteThoughtIds.includes(t.id));
  const myPurchasedBooks = books.filter((b) => user.purchasedBookIds.includes(b.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, city, country });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleTestNotification = async (type: 'morning' | 'evening') => {
    if (notificationPermission !== 'granted') {
      const granted = await requestNotificationPermission();
      if (!granted) return;
    }
    sendTestNotification(type);
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 4000);
  };

  return (
    <div className="pb-28 pt-4 sm:pt-8 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
            Espace Personnel
          </span>
          <h1 className="text-3xl font-serif text-white mt-1">
            Mon Sanctuaire Spirituel
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gérez vos préférences de prière, vos lectures et vos notifications quotidiennes.
          </p>
        </div>

        {/* Admin Access Quick Link */}
        <button
          onClick={() => navigateTo('admin')}
          className="text-xs text-slate-400 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 min-h-[40px] shrink-0"
        >
          <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Espace Administrateur</span>
        </button>
      </div>

      {isSavedNotice && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 text-center">
          Profil mis à jour avec succès.
        </div>
      )}

      {/* 1. Daily Notification Settings Section */}
      <section className="rounded-3xl bg-[#0c1322] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Rendez-vous Quotidiens
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded ${
                  notificationPermission === 'granted'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : notificationPermission === 'denied'
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {notificationPermission === 'granted'
                  ? 'Notifications activées dans le navigateur'
                  : notificationPermission === 'denied'
                  ? 'Notifications bloquées dans le navigateur'
                  : 'Autorisation en attente'}
              </span>
            </div>
            <h2 className="text-xl font-serif text-white mt-1">
              Configuration des Notifications
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
              Pour ne jamais manquer votre temps de silence avec Dieu, choisissez vos horaires de réception. Vous pourrez ouvrir directement la pensée en appuyant sur la notification.
            </p>
          </div>

          {notificationPermission !== 'granted' && (
            <button
              onClick={() => requestNotificationPermission()}
              className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition shrink-0 min-h-[44px]"
            >
              Autoriser les notifications
            </button>
          )}
        </div>

        {/* Morning & Evening Preferences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Morning Notif Card */}
          <div className="p-4 rounded-2xl bg-[#11192a] border border-white/[0.05] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white">Pensée du Matin</span>
                <p className="text-[11px] text-slate-400">Pour éveiller l'âme avant la journée</p>
              </div>
              <input
                type="checkbox"
                checked={user.morningNotif.enabled}
                onChange={(e) =>
                  updateUserProfile({
                    morningNotif: { ...user.morningNotif, enabled: e.target.checked }
                  })
                }
                className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            {user.morningNotif.enabled && (
              <div className="pt-2 border-t border-white/[0.05]">
                <label className="block text-[11px] text-slate-400 mb-1.5">Horaire de réception :</label>
                <div className="flex gap-2">
                  {(['05:45', '06:00'] as const).map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() =>
                        updateUserProfile({
                          morningNotif: { ...user.morningNotif, time }
                        })
                      }
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition min-h-[40px] ${
                        user.morningNotif.time === time
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {time.replace(':', ' h ')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Evening Notif Card */}
          <div className="p-4 rounded-2xl bg-[#11192a] border border-white/[0.05] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white">Pensée du Soir</span>
                <p className="text-[11px] text-slate-400">Pour déposer les soucis et dormir en paix</p>
              </div>
              <input
                type="checkbox"
                checked={user.eveningNotif.enabled}
                onChange={(e) =>
                  updateUserProfile({
                    eveningNotif: { ...user.eveningNotif, enabled: e.target.checked }
                  })
                }
                className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            {user.eveningNotif.enabled && (
              <div className="pt-2 border-t border-white/[0.05]">
                <label className="block text-[11px] text-slate-400 mb-1.5">Horaire de réception :</label>
                <div className="flex gap-2">
                  {(['20:00', '21:00'] as const).map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() =>
                        updateUserProfile({
                          eveningNotif: { ...user.eveningNotif, time }
                        })
                      }
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition min-h-[40px] ${
                        user.eveningNotif.time === time
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {time.replace(':', ' h ')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timezone & Direct test trigger */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/[0.06] text-xs">
          <div className="text-slate-400">
            <span>Fuseau horaire : </span>
            <span className="text-white font-medium">{user.timezone}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleTestNotification('morning')}
              className="py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition min-h-[40px]"
            >
              Tester notification matin
            </button>
            <button
              onClick={() => handleTestNotification('evening')}
              className="py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition min-h-[40px]"
            >
              Tester notification soir
            </button>
          </div>
        </div>

        {testNotificationSent && (
          <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-xs text-amber-200 text-center animate-fade-in">
            Notification système envoyée au navigateur. Si elle n'apparaît pas, vérifiez les réglages système de votre appareil.
          </div>
        )}
      </section>

      {/* 2. Subscription Status */}
      <section className="rounded-3xl bg-[#0c1322] border border-white/[0.08] p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Statut de Lecture
            </span>
            <h2 className="text-xl font-serif text-white mt-1">Mon Abonnement</h2>
          </div>

          {user.subscription.active ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                Actif (1 000 FCFA/mois)
              </span>
              <button
                onClick={() => navigateTo('bibliotheque')}
                className="py-1.5 px-3 rounded-lg bg-amber-500 text-black text-xs font-semibold hover:bg-amber-400 transition"
              >
                Lire
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigateTo('abonnement')}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-white text-xs font-semibold transition"
            >
              S'abonner (1 000 FCFA / mois)
            </button>
          )}
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {user.subscription.active
            ? `Votre formule mensuelle est en cours. Tous les livres de la bibliothèque vous sont ouverts sans restriction.`
            : 'Vous n’avez pas d’abonnement actif pour le moment. Vous pouvez acquérir les livres à l’unité (500 FCFA) ou souscrire à la formule illimitée.'}
        </p>
      </section>

      {/* 3. My Books */}
      <section className="rounded-3xl bg-[#0c1322] border border-white/[0.08] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Mes Ouvrages
            </span>
            <h2 className="text-xl font-serif text-white mt-1">Mes Livres Achetés</h2>
          </div>
          <button
            onClick={() => navigateTo('bibliotheque')}
            className="text-xs text-amber-300 hover:underline"
          >
            Explorer la boutique →
          </button>
        </div>

        {myPurchasedBooks.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2">
            Aucun livre acheté à l'unité pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {myPurchasedBooks.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-[#11192a] border border-white/[0.05] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <h4 className="text-sm font-serif font-medium text-white truncate">{b.title}</h4>
                  <p className="text-[11px] text-slate-400">{b.author}</p>
                </div>
                <button
                  onClick={() => navigateTo('lecteur', b.id)}
                  className="py-1.5 px-3.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/30 transition shrink-0 min-h-[36px]"
                >
                  Lire
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Favorite Thoughts & Bookmarks */}
      <section className="rounded-3xl bg-[#0c1322] border border-white/[0.08] p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Favoris & Mémoire
          </span>
          <h2 className="text-xl font-serif text-white mt-1">Pensées Préférées ({favoriteThoughts.length})</h2>
        </div>

        {favoriteThoughts.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2">
            Aucune pensée enregistrée en favoris pour l'instant.
          </p>
        ) : (
          <div className="space-y-2 pt-2">
            {favoriteThoughts.map((t) => (
              <div
                key={t.id}
                onClick={() => navigateTo(t.type === 'morning' ? 'pensee-matin' : 'pensee-soir', t.id)}
                className="p-3.5 rounded-xl bg-[#11192a] border border-white/[0.05] hover:border-amber-500/30 cursor-pointer flex items-center justify-between text-xs transition"
              >
                <div>
                  <span className="text-amber-400 font-medium">
                    {t.type === 'morning' ? 'Matin' : 'Soir'} · {t.title}
                  </span>
                  <p className="text-sm font-serif text-white mt-0.5">{t.subtitle}</p>
                </div>
                <span className="text-slate-400">Consulter →</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Orders & Donations History */}
      <section className="rounded-3xl bg-[#0c1322] border border-white/[0.08] p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Transactions
          </span>
          <h2 className="text-xl font-serif text-white mt-1">Historique des Commandes & Offrandes</h2>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-2">Aucune transaction enregistrée.</p>
        ) : (
          <div className="space-y-2 pt-2">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 rounded-xl bg-[#11192a] border border-white/[0.05] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{ord.targetTitle}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Réf : {ord.reference} · Moyen : {ord.paymentMethod.replace('_', ' ').toUpperCase()} ·{' '}
                    {new Date(ord.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-serif font-medium text-amber-300">
                    {ord.amountXof.toLocaleString('fr-FR')} FCFA
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Edit Profile Data Form */}
      <form onSubmit={handleSaveProfile} className="rounded-3xl bg-[#0c1322] border border-white/[0.08] p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Identité
          </span>
          <h2 className="text-xl font-serif text-white mt-1">Informations du Profil</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label htmlFor="user-name" className="block text-xs text-slate-400 mb-1">
              Prénom ou Nom
            </label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 min-h-[44px]"
            />
          </div>

          <div>
            <label htmlFor="user-city" className="block text-xs text-slate-400 mb-1">
              Ville
            </label>
            <input
              id="user-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 min-h-[44px]"
            />
          </div>

          <div>
            <label htmlFor="user-country" className="block text-xs text-slate-400 mb-1">
              Pays
            </label>
            <input
              id="user-country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500 min-h-[44px]"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition min-h-[44px]"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>

      {/* Account Deletion / Reset Option */}
      <div className="pt-4 border-t border-white/[0.06] text-center">
        {showDeleteConfirm ? (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 max-w-md mx-auto space-y-3">
            <p className="text-xs text-red-200">
              Êtes-vous sûr de vouloir réinitialiser vos données locales et vos préférences ?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="py-1.5 px-4 rounded-lg bg-red-600 text-white text-xs font-medium min-h-[40px]"
              >
                Confirmer la réinitialisation
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="py-1.5 px-4 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium min-h-[40px]"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-xs text-slate-500 hover:text-red-400 transition"
          >
            Réinitialiser mes données locales et préférences
          </button>
        )}
      </div>
    </div>
  );
};
