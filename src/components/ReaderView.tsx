import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

export const ReaderView: React.FC = () => {
  const { books, selectedBookId, navigateTo, saveReadingProgress, addBookmark, user } = useApp();

  const book = books.find((b) => b.id === selectedBookId) || books[0];
  const userProgress = user.readingProgress[book.id];

  // Font size state (14px, 16px, 18px, 20px, 22px)
  const [fontSize, setFontSize] = useState<number>(18);
  // Theme state ('deep-night', 'warm-sepia', 'twilight')
  const [readerTheme, setReaderTheme] = useState<'deep-night' | 'warm-sepia' | 'twilight'>('deep-night');
  // Font family ('serif' | 'sans')
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  // Current active chapter
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(() => {
    if (userProgress && userProgress.chapterId) {
      const idx = book.chapters.findIndex((c) => c.id === userProgress.chapterId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const [showChaptersDrawer, setShowChaptersDrawer] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [bookmarkSuccess, setBookmarkSuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(userProgress?.percentage || 0);

  const containerRef = useRef<HTMLDivElement>(null);
  const activeChapter = book.chapters[activeChapterIndex] || book.chapters[0];

  // Scroll listener to update percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = window.scrollY;
        const pct = Math.round((current / totalHeight) * 100);
        setScrollProgress(pct);
        saveReadingProgress(book.id, activeChapter.id, pct);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [book.id, activeChapter.id, saveReadingProgress]);

  // Restore scroll on mount if previous progress exists
  useEffect(() => {
    if (userProgress && userProgress.percentage > 0) {
      setTimeout(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          window.scrollTo({
            top: (totalHeight * userProgress.percentage) / 100,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, []);

  const handleAddBookmark = () => {
    addBookmark({
      bookId: book.id,
      chapterId: activeChapter.id,
      textSnippet: `${book.title} — ${activeChapter.title}`,
      note: `Lu à ${scrollProgress}% de progression.`
    });
    setBookmarkSuccess(true);
    setTimeout(() => setBookmarkSuccess(false), 2500);
  };

  // Color theme mapping
  const themeStyles = {
    'deep-night': {
      bg: 'bg-[#070a13]',
      text: 'text-[#e2e8f0]',
      card: 'bg-[#0c1322]',
      border: 'border-white/[0.08]',
      accent: 'text-amber-300'
    },
    'warm-sepia': {
      bg: 'bg-[#181512]',
      text: 'text-[#f5ede0]',
      card: 'bg-[#221d18]',
      border: 'border-[#382f25]',
      accent: 'text-amber-400'
    },
    'twilight': {
      bg: 'bg-[#0b1329]',
      text: 'text-[#e0e7ff]',
      card: 'bg-[#101b3d]',
      border: 'border-white/[0.08]',
      accent: 'text-amber-300'
    }
  }[readerTheme];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeStyles.bg} ${themeStyles.text}`} ref={containerRef}>
      {/* Top Floating Reader Utility Bar */}
      <header className={`sticky top-0 z-30 ${themeStyles.card}/95 backdrop-blur-md border-b ${themeStyles.border} px-4 py-3`}>
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            onClick={() => navigateTo('livre-detail', book.id)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition py-1 min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Quitter</span>
          </button>

          {/* Book title and chapter info */}
          <div className="text-center min-w-0 flex-1">
            <h2 className="text-xs font-serif font-medium text-white truncate">
              {book.title}
            </h2>
            <p className="text-[10px] text-amber-300/80 truncate">
              {activeChapter.title}
            </p>
          </div>

          {/* Reading tools: Chapters, Bookmark, Font settings */}
          <div className="flex items-center gap-1">
            {/* Bookmark button */}
            <button
              onClick={handleAddBookmark}
              className="p-2 rounded-lg text-slate-400 hover:text-amber-300 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Ajouter un signet"
              title="Enregistrer un signet"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>

            {/* Chapters list trigger */}
            <button
              onClick={() => setShowChaptersDrawer(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Sommaire des chapitres"
              title="Sommaire"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>

            {/* Typography & Theme settings trigger */}
            <button
              onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
              className="p-2 rounded-lg text-slate-400 hover:text-white transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Paramètres d'affichage"
              title="Affichage"
            >
              <span className="text-xs font-serif font-bold">Aa</span>
            </button>
          </div>
        </div>

        {/* Reading progress hairline bar */}
        <div className="w-full bg-slate-800/50 h-0.5 mt-2">
          <div
            className="h-full bg-amber-400 transition-all duration-200"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Floating Bookmark Toast */}
      {bookmarkSuccess && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 py-2 px-4 bg-amber-500 text-[#070a13] font-semibold text-xs rounded-full shadow-lg">
          Signet mémorisé dans votre espace
        </div>
      )}

      {/* Quick Settings Drawer */}
      {showSettingsDrawer && (
        <div className={`border-b ${themeStyles.border} ${themeStyles.card} px-4 py-4 max-w-3xl mx-auto animate-fade-in`}>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Font size */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Taille :</span>
              <button
                onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 min-h-[36px]"
              >
                A-
              </button>
              <span className="tabular-nums font-mono">{fontSize}px</span>
              <button
                onClick={() => setFontSize((s) => Math.min(26, s + 2))}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 min-h-[36px]"
              >
                A+
              </button>
            </div>

            {/* Font Family */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Police :</span>
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-3 py-1 rounded font-serif ${
                  fontFamily === 'serif' ? 'bg-amber-500 text-black font-semibold' : 'bg-white/10'
                }`}
              >
                Sérif
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-3 py-1 rounded font-sans ${
                  fontFamily === 'sans' ? 'bg-amber-500 text-black font-semibold' : 'bg-white/10'
                }`}
              >
                Sans
              </button>
            </div>

            {/* Theme */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Fond :</span>
              <button
                onClick={() => setReaderTheme('deep-night')}
                className={`w-6 h-6 rounded-full bg-[#070a13] border ${
                  readerTheme === 'deep-night' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-600'
                }`}
                title="Nuit profonde"
              />
              <button
                onClick={() => setReaderTheme('warm-sepia')}
                className={`w-6 h-6 rounded-full bg-[#181512] border ${
                  readerTheme === 'warm-sepia' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-600'
                }`}
                title="Sépia chaud"
              />
              <button
                onClick={() => setReaderTheme('twilight')}
                className={`w-6 h-6 rounded-full bg-[#0b1329] border ${
                  readerTheme === 'twilight' ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-600'
                }`}
                title="Crépuscule lapis"
              />
            </div>
          </div>
        </div>
      )}

      {/* Chapter Contents Drawer / Modal */}
      {showChaptersDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl ${themeStyles.card} border ${themeStyles.border} p-6 shadow-2xl relative`}>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
              <h3 className="text-lg font-serif text-white">Sommaire de l’ouvrage</h3>
              <button
                onClick={() => setShowChaptersDrawer(false)}
                className="text-slate-400 hover:text-white p-2 min-h-[44px] min-w-[44px]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {book.chapters.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => {
                    setActiveChapterIndex(idx);
                    setShowChaptersDrawer(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${
                    activeChapterIndex === idx
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-semibold'
                      : 'bg-white/[0.02] border-white/[0.05] text-slate-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{chap.title}</span>
                  {activeChapterIndex === idx && <span>Lecture en cours</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Reading Flow */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Chapter Header */}
        <div className="text-center mb-10 pb-6 border-b border-white/[0.08]">
          <span className="text-xs uppercase tracking-widest text-amber-400/90 font-medium">
            Chapitre {activeChapter.chapterNumber} sur {book.chapters.length}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white mt-2">
            {activeChapter.title}
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            « {book.title} » · {book.author}
          </p>
        </div>

        {/* Chapter Content with custom font size and family */}
        <div
          className={`space-y-6 leading-relaxed transition-all ${
            fontFamily === 'serif' ? 'font-serif' : 'font-sans'
          }`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
        >
          {activeChapter.content.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="text-justify sm:text-left text-slate-200">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Chapter End & Navigation Controls */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex items-center justify-between gap-4">
          <button
            onClick={() => {
              if (activeChapterIndex > 0) {
                setActiveChapterIndex(activeChapterIndex - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={activeChapterIndex === 0}
            className="py-2.5 px-4 rounded-xl border border-white/[0.08] text-xs font-medium text-slate-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/5 transition min-h-[44px]"
          >
            ← Chapitre précédent
          </button>

          <span className="text-xs text-slate-400">
            {activeChapterIndex + 1} / {book.chapters.length}
          </span>

          <button
            onClick={() => {
              if (activeChapterIndex < book.chapters.length - 1) {
                setActiveChapterIndex(activeChapterIndex + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={activeChapterIndex === book.chapters.length - 1}
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition min-h-[44px]"
          >
            Chapitre suivant →
          </button>
        </div>

        {/* Return to Library Bottom Link */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigateTo('livre-detail', book.id)}
            className="text-xs text-amber-300/80 hover:text-amber-200 underline"
          >
            Terminer et revenir aux détails du livre
          </button>
        </div>
      </main>
    </div>
  );
};
