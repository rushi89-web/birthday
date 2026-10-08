import React, { useState } from 'react';
import { Eye, Sparkles, Heart } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';
import { fireRomanticConfetti } from '../utils/confetti';

export const SecretSurpriseSection: React.FC = () => {
  const { config } = useBirthday();
  const { secretSurprise } = config;
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    fireRomanticConfetti(x, y, 50);
    setIsRevealed(true);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center">
        {!isRevealed ? (
          <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-rose-500/25 flex flex-col items-center shadow-2xl">
            {/* Teaser Question */}
            <p className="font-serif-luxury text-2xl sm:text-3xl text-rose-200/90 italic font-light mb-6">
              "{secretSurprise.teaserQuestion || 'You really thought that was everything?'}"
            </p>

            {/* Glowing button */}
            <button
              type="button"
              onClick={handleReveal}
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-base sm:text-lg tracking-wide shadow-xl shadow-rose-950/60 hover:shadow-rose-600/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-rose-300/30 glow-romantic"
            >
              <Eye className="w-5 h-5 text-rose-200" />
              <span>{secretSurprise.buttonPrompt || "There's One More Thing... 👀"}</span>
            </button>

            <p className="mt-4 text-xs text-rose-300/40">
              (A secret note kept just between us)
            </p>
          </div>
        ) : (
          <div className="glass-panel p-8 sm:p-14 rounded-3xl border-2 border-rose-400/50 glow-romantic animate-pulse-subtle shadow-2xl relative">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 mx-auto mb-6 glow-romantic-sm">
              <Sparkles className="w-7 h-7 text-rose-300" />
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-4xl text-white font-normal leading-relaxed mb-6">
              "{secretSurprise.revealedMessage ||
                'No matter where life takes us, I hope we always keep making memories worth remembering. ❤️'}"
            </h3>

            {secretSurprise.bonusLoveNote && (
              <p className="font-handwriting text-2xl sm:text-3xl text-rose-300 font-light tracking-wide mt-4">
                {secretSurprise.bonusLoveNote}
              </p>
            )}

            <div className="mt-8 pt-6 border-t border-rose-500/20 flex items-center justify-center gap-2 text-xs text-rose-200/60">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />
              <span>Forever your #1 fan</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
