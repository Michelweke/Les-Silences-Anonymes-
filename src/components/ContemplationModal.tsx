import React, { useEffect, useState } from 'react';
import { playContemplationChime } from '../utils/audio';

interface ContemplationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ContemplationModal: React.FC<ContemplationModalProps> = ({
  isOpen,
  onClose,
  title = 'Moment de Silence et Recueillement'
}) => {
  const [durationSeconds, setDurationSeconds] = useState(60);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSecondsRemaining(durationSeconds);
      setIsRunning(false);
    }
  }, [isOpen, durationSeconds]);

  useEffect(() => {
    let timer: number;
    if (isRunning && secondsRemaining > 0) {
      timer = window.setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && secondsRemaining === 0) {
      setIsRunning(false);
      playContemplationChime();
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsRemaining]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStart = () => {
    playContemplationChime();
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(durationSeconds);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl bg-[#0c1322] border border-amber-500/20 p-6 md:p-8 text-center text-[#f1f3f7] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <span className="text-xs font-medium uppercase tracking-widest text-amber-400">
          Intimité avec Dieu
        </span>
        <h3 className="text-2xl font-serif mt-2 mb-1">{title}</h3>
        <p className="text-xs text-slate-400 mb-6 max-w-xs mx-auto">
          Faites silence en vous-même. Déposez vos pensées et accueillez Sa présence bienfaisante.
        </p>

        {/* Breathing Circle */}
        <div className="my-8 flex items-center justify-center">
          <div
            className={`relative flex items-center justify-center w-48 h-48 rounded-full border border-amber-500/30 transition-all duration-1000 ${
              isRunning ? 'scale-105 shadow-[0_0_40px_rgba(245,158,11,0.15)] ring-2 ring-amber-500/20' : ''
            }`}
          >
            <div className="text-center">
              <span className="text-4xl font-serif font-light tracking-wider tabular-nums text-amber-200">
                {formatTime(secondsRemaining)}
              </span>
              <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">
                {secondsRemaining === 0 ? 'Silence accompli' : isRunning ? 'Respirez doucement' : 'Prêt'}
              </p>
            </div>
          </div>
        </div>

        {/* Durations */}
        {!isRunning && secondsRemaining > 0 && (
          <div className="flex items-center justify-center gap-2 mb-6">
            {[60, 180, 300].map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setDurationSeconds(sec);
                  setSecondsRemaining(sec);
                }}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors min-h-[44px] ${
                  durationSeconds === sec
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {sec / 60} {sec === 60 ? 'minute' : 'minutes'}
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-medium hover:from-amber-500 hover:to-amber-600 transition shadow-lg shadow-amber-900/30 min-h-[48px]"
            >
              {secondsRemaining === durationSeconds ? 'Commencer le silence' : 'Reprendre'}
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition min-h-[48px]"
            >
              Mettre en pause
            </button>
          )}

          {secondsRemaining !== durationSeconds && (
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-sm transition min-h-[48px]"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
