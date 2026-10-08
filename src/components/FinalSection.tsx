import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';
import { PhotoPlaceholder } from './PhotoPlaceholder';

export const FinalSection: React.FC = () => {
  const { config } = useBirthday();
  const { finalEnding } = config;

  const resolvedTitle = (finalEnding.title || 'Happy Birthday, [HER NAME] ❤️').replace(
    '[HER NAME]',
    config.herName || 'My Love'
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-28 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center z-10">
        {/* Photo Portrait Frame */}
        <div className="relative mb-12 w-64 sm:w-80 group">
          <div className="absolute -inset-2 bg-gradient-to-tr from-rose-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-75 animate-pulse-subtle" />
          <div className="relative p-2.5 rounded-3xl bg-[#140b12] border border-rose-500/30 shadow-2xl shadow-black/80">
            {finalEnding.photo ? (
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                <img
                  src={finalEnding.photo}
                  alt={`${config.herName || 'My love'}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ) : (
              <PhotoPlaceholder
                slotKey="ending"
                label="One of her best photos ❤️"
                aspectRatioClass="aspect-[3/4]"
              />
            )}
          </div>
        </div>

        {/* Headline: "Happy Birthday, [HER NAME] ❤️" */}
        <h2 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-rose-50 tracking-tight mb-6">
          {resolvedTitle}
        </h2>

        {/* Note 1: "Thank you for being one of the most beautiful parts of my life." */}
        <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-rose-200/90 italic font-light max-w-2xl leading-relaxed mb-8">
          "{finalEnding.note1 || 'Thank you for being one of the most beautiful parts of my life.'}"
        </p>

        {/* Note 2 Lines: Here's to more laughs. More adventures... */}
        <div className="space-y-2 mb-10">
          {(
            finalEnding.note2Lines || [
              "Here's to more laughs.",
              'More adventures.',
              'More memories.',
              'More us. ❤️',
            ]
          ).map((line, idx) => (
            <p
              key={idx}
              className={`font-serif-luxury text-lg sm:text-2xl ${
                idx === finalEnding.note2Lines.length - 1
                  ? 'text-rose-400 font-medium'
                  : 'text-rose-100/90 font-light'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Closing Line: "Forever grateful for you." */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-200 text-base sm:text-lg font-serif-luxury italic glow-romantic-sm">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-pulse" />
          <span>{finalEnding.closingLine || 'Forever grateful for you.'}</span>
          <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-pulse" />
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="mt-16 inline-flex items-center gap-2 text-xs font-medium text-rose-300/60 hover:text-rose-200 transition-colors cursor-pointer px-4 py-2 rounded-full border border-white/5 hover:border-white/10 bg-white/5"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-rose-500/10 w-full max-w-5xl text-center text-xs text-rose-300/40">
        <p>Made with ❤️ exclusively for {config.herName || 'Her'}</p>
      </footer>
    </section>
  );
};
