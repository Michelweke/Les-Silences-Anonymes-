export type ThoughtType = 'morning' | 'evening';

export interface Thought {
  id: string;
  type: ThoughtType;
  title: string; // e.g. "PENSÉE DU JOUR" or "PENSÉE DU SOIR"
  subtitle: string;
  date: string; // YYYY-MM-DD
  scheduledTime: string; // e.g. "06:00" or "20:00"
  quote?: {
    text: string;
    author: string;
    source?: string;
  };
  greeting?: string; // salutation fraternelle et expression de gratitude (matin)
  meditation: string; // 60-120 words target
  introspectionQuestion?: string; // pour le soir
  application?: string; // concrète à la vie quotidienne
  prayer: string; // courte prière
  blessing: string; // bénédiction apaisante
  status: 'published' | 'scheduled' | 'draft';
  readTimeEstimate: string; // e.g. "1 min"
}

export type BookCategory =
  | 'Apprendre à connaître Dieu'
  | 'Comprendre le silence de Dieu'
  | 'Apprendre à aimer Dieu'
  | 'Les combats de nuit'
  | 'Témoignages de foi'
  | 'Prières et méditations'
  | 'Croissance spirituelle';

export interface BookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  content: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  priceXof: number; // 500 FCFA
  isFree?: boolean;
  isSubscriptionIncluded: boolean;
  sampleExcerpt: string;
  chapters: BookChapter[];
  pageCount: number;
  publishedYear: number;
  featured?: boolean;
  isNew?: boolean;
}

export type PaymentMethod =
  | 'wave'
  | 'orange_money'
  | 'mtn_momo'
  | 'moov_money'
  | 'card';

export interface Order {
  id: string;
  reference: string;
  type: 'book' | 'subscription' | 'donation';
  targetTitle: string;
  targetId?: string;
  amountXof: number;
  date: string;
  status: 'validé' | 'en_attente' | 'échoué';
  paymentMethod: PaymentMethod;
  phoneNumber?: string;
  donorMessage?: string;
  donorName?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  country: string;
  timezone: string;
  morningNotif: {
    enabled: boolean;
    time: '05:45' | '06:00';
  };
  eveningNotif: {
    enabled: boolean;
    time: '20:00' | '21:00';
  };
  subscription: {
    active: boolean;
    expiresAt: string | null;
    startedAt: string | null;
    plan: 'monthly';
  };
  purchasedBookIds: string[];
  favoriteThoughtIds: string[];
  bookmarkedPassages: {
    bookId: string;
    chapterId: string;
    textSnippet: string;
    note?: string;
    date: string;
  }[];
  readingProgress: Record<
    string,
    {
      chapterId: string;
      percentage: number;
      lastReadAt: string;
    }
  >;
}
