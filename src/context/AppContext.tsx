import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_BOOKS, INITIAL_THOUGHTS, INITIAL_USER } from '../data/mockData';
import { Book, Order, PaymentMethod, Thought, UserProfile } from '../types';

export type ViewState =
  | 'accueil'
  | 'pensee-matin'
  | 'pensee-soir'
  | 'historique-pensees'
  | 'bibliotheque'
  | 'livre-detail'
  | 'lecteur'
  | 'abonnement'
  | 'dons'
  | 'profil'
  | 'admin';

interface AppContextType {
  thoughts: Thought[];
  books: Book[];
  user: UserProfile;
  orders: Order[];
  currentView: ViewState;
  selectedBookId: string | null;
  selectedThoughtId: string | null;
  notificationPermission: NotificationPermission | 'unsupported';
  isAdminAuthenticated: boolean;
  navigateTo: (view: ViewState, id?: string) => void;
  requestNotificationPermission: () => Promise<boolean>;
  sendTestNotification: (type?: 'morning' | 'evening') => void;
  toggleFavoriteThought: (id: string) => void;
  purchaseBook: (bookId: string, paymentMethod: PaymentMethod, phoneNumber: string) => Promise<boolean>;
  subscribeMonthly: (paymentMethod: PaymentMethod, phoneNumber: string) => Promise<boolean>;
  makeDonation: (
    amountXof: number,
    paymentMethod: PaymentMethod,
    phoneNumber: string,
    donorName?: string,
    donorMessage?: string
  ) => Promise<boolean>;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  saveReadingProgress: (bookId: string, chapterId: string, percentage: number) => void;
  addBookmark: (bookmark: { bookId: string; chapterId: string; textSnippet: string; note?: string }) => void;
  adminAddOrUpdateThought: (thought: Thought) => void;
  adminDeleteThought: (id: string) => void;
  adminAddOrUpdateBook: (book: Book) => void;
  adminDeleteBook: (id: string) => void;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  hasAccessToBook: (bookId: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY_THOUGHTS = 'les_silences_thoughts_v1';
const STORAGE_KEY_BOOKS = 'les_silences_books_v1';
const STORAGE_KEY_USER = 'les_silences_user_v1';
const STORAGE_KEY_ORDERS = 'les_silences_orders_v1';
const STORAGE_KEY_ADMIN = 'les_silences_admin_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored state or fall back to initial mock data
  const [thoughts, setThoughts] = useState<Thought[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THOUGHTS);
      return saved ? JSON.parse(saved) : INITIAL_THOUGHTS;
    } catch {
      return INITIAL_THOUGHTS;
    }
  });

  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'ord-1',
              reference: 'SIL-2026-9812',
              type: 'book',
              targetTitle: 'Prières et méditations pour les saisons difficiles',
              targetId: 'prieres-et-meditations-guide',
              amountXof: 500,
              date: '2026-10-28T14:30:00Z',
              status: 'validé',
              paymentMethod: 'wave',
              phoneNumber: '+225 07 00 00 00'
            }
          ];
    } catch {
      return [];
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEY_ADMIN) === 'true';
  });

  const [currentView, setCurrentView] = useState<ViewState>('accueil');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedThoughtId, setSelectedThoughtId] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | 'unsupported'>('default');

  // Check initial notification support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    } else {
      setNotificationPermission('unsupported');
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THOUGHTS, JSON.stringify(thoughts));
    } catch (e) {
      console.error(e);
    }
  }, [thoughts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(books));
    } catch (e) {
      console.error(e);
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Navigation
  const navigateTo = (view: ViewState, id?: string) => {
    if (id) {
      if (view === 'livre-detail' || view === 'lecteur') {
        setSelectedBookId(id);
      } else if (view === 'pensee-matin' || view === 'pensee-soir') {
        setSelectedThoughtId(id);
      }
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Notification API handler
  const requestNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setNotificationPermission('unsupported');
      return false;
    }
    try {
      const result = await Notification.requestPermission();
      setNotificationPermission(result);
      return result === 'granted';
    } catch {
      return false;
    }
  };

  const sendTestNotification = (type: 'morning' | 'evening' = 'morning') => {
    const isMorning = type === 'morning';
    const title = isMorning ? 'Les Silences Anonymes — Pensée du matin' : 'Les Silences Anonymes — Pensée du soir';
    const body = isMorning
      ? '« La clarté après la veille » : Prenez 3 minutes pour accueillir la paix de Dieu dès l’aube.'
      : '« Déposer les armes au crépuscule » : Terminez votre journée dans la paix et la confiance.';

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/icon.svg',
          badge: '/icon.svg'
        });
      } catch (err) {
        console.warn('Notification constructor error, trying service worker:', err);
        if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.showNotification(title, { body, icon: '/icon.svg' });
          });
        }
      }
    }
  };

  const toggleFavoriteThought = (id: string) => {
    setUser((prev) => {
      const exists = prev.favoriteThoughtIds.includes(id);
      return {
        ...prev,
        favoriteThoughtIds: exists
          ? prev.favoriteThoughtIds.filter((item) => item !== id)
          : [...prev.favoriteThoughtIds, id]
      };
    });
  };

  // Check access to a book (free, bought, or user has active subscription)
  const hasAccessToBook = (bookId: string): boolean => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return false;
    if (book.isFree) return true;
    if (user.purchasedBookIds.includes(bookId)) return true;
    if (user.subscription.active && book.isSubscriptionIncluded) {
      // Check subscription expiry if present
      if (user.subscription.expiresAt) {
        return new Date(user.subscription.expiresAt) > new Date();
      }
      return true;
    }
    return false;
  };

  // Purchase a book (Demo mode clearly notified)
  const purchaseBook = async (
    bookId: string,
    paymentMethod: PaymentMethod,
    phoneNumber: string
  ): Promise<boolean> => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return false;

    // Simulate verified transaction
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      reference: `SIL-BK-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'book',
      targetTitle: book.title,
      targetId: book.id,
      amountXof: book.priceXof,
      date: new Date().toISOString(),
      status: 'validé',
      paymentMethod,
      phoneNumber
    };

    setOrders((prev) => [newOrder, ...prev]);
    setUser((prev) => ({
      ...prev,
      purchasedBookIds: Array.from(new Set([...prev.purchasedBookIds, bookId]))
    }));

    return true;
  };

  // Subscribe monthly (1 000 FCFA)
  const subscribeMonthly = async (
    paymentMethod: PaymentMethod,
    phoneNumber: string
  ): Promise<boolean> => {
    const now = new Date();
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);

    const newOrder: Order = {
      id: `ord-sub-${Date.now()}`,
      reference: `SIL-SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'subscription',
      targetTitle: 'Abonnement mensuel Les Silences Anonymes',
      amountXof: 1000,
      date: now.toISOString(),
      status: 'validé',
      paymentMethod,
      phoneNumber
    };

    setOrders((prev) => [newOrder, ...prev]);
    setUser((prev) => ({
      ...prev,
      subscription: {
        active: true,
        startedAt: now.toISOString(),
        expiresAt: expires.toISOString(),
        plan: 'monthly'
      }
    }));

    return true;
  };

  // Donation flow
  const makeDonation = async (
    amountXof: number,
    paymentMethod: PaymentMethod,
    phoneNumber: string,
    donorName?: string,
    donorMessage?: string
  ): Promise<boolean> => {
    const newOrder: Order = {
      id: `don-${Date.now()}`,
      reference: `SIL-DON-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'donation',
      targetTitle: 'Don pour la mission spirituelle',
      amountXof,
      date: new Date().toISOString(),
      status: 'validé',
      paymentMethod,
      phoneNumber,
      donorName: donorName || 'Donateur anonyme',
      donorMessage
    };

    setOrders((prev) => [newOrder, ...prev]);
    return true;
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const saveReadingProgress = (bookId: string, chapterId: string, percentage: number) => {
    setUser((prev) => ({
      ...prev,
      readingProgress: {
        ...prev.readingProgress,
        [bookId]: {
          chapterId,
          percentage: Math.min(100, Math.max(0, percentage)),
          lastReadAt: new Date().toISOString()
        }
      }
    }));
  };

  const addBookmark = (bookmark: {
    bookId: string;
    chapterId: string;
    textSnippet: string;
    note?: string;
  }) => {
    setUser((prev) => ({
      ...prev,
      bookmarkedPassages: [
        {
          ...bookmark,
          date: new Date().toISOString()
        },
        ...prev.bookmarkedPassages
      ]
    }));
  };

  // Admin capabilities
  const adminAddOrUpdateThought = (thought: Thought) => {
    setThoughts((prev) => {
      const idx = prev.findIndex((t) => t.id === thought.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = thought;
        return next;
      }
      return [thought, ...prev];
    });
  };

  const adminDeleteThought = (id: string) => {
    setThoughts((prev) => prev.filter((t) => t.id !== id));
  };

  const adminAddOrUpdateBook = (book: Book) => {
    setBooks((prev) => {
      const idx = prev.findIndex((b) => b.id === book.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = book;
        return next;
      }
      return [book, ...prev];
    });
  };

  const adminDeleteBook = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const loginAdmin = (passcode: string): boolean => {
    // Demo passcode for phase 1
    if (passcode === 'silence2026' || passcode === 'admin') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEY_ADMIN, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEY_ADMIN);
  };

  return (
    <AppContext.Provider
      value={{
        thoughts,
        books,
        user,
        orders,
        currentView,
        selectedBookId,
        selectedThoughtId,
        notificationPermission,
        isAdminAuthenticated,
        navigateTo,
        requestNotificationPermission,
        sendTestNotification,
        toggleFavoriteThought,
        purchaseBook,
        subscribeMonthly,
        makeDonation,
        updateUserProfile,
        saveReadingProgress,
        addBookmark,
        adminAddOrUpdateThought,
        adminDeleteThought,
        adminAddOrUpdateBook,
        adminDeleteBook,
        loginAdmin,
        logoutAdmin,
        hasAccessToBook
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
