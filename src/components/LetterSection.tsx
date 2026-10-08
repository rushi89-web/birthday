import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';

export const LetterSection: React.FC = () => {
  const { config } = useBirthday();
  const { personalLetter } = config;

  const herName = !config.herName || config.herName === 'My Love' ? 'Pallu' : config.herName;
  const resolvedGreeting = personalLetter.greeting
    .replace('[HER NAME]', herName)
    .replace('My Love', herName)
    .replace('my love', herName);
  const resolvedSignoff = personalLetter.signoff
    .replace('[HER NAME]', herName)
    .replace('My Love', herName)
    .replace('my love', herName);
  const resolvedSender = personalLetter.sender.replace('[YOUR NAME]', config.yourName || 'Always Yours');

  return (
    <section id="letter" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-rose-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-3">
            <span>Written from the Soul</span>
            <span aria-hidden="true">·</span>
            <span>Unspoken Feelings</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-rose-50 tracking-tight mb-3">
            {personalLetter.title || 'A Letter For You 💌'}
          </h2>
          <p className="text-sm text-rose-200/70 font-light">
            Take a quiet moment and read this with all your heart.
          </p>
        </div>

        {/* Romantic Letter Parchment Card */}
        <div className="relative group">
          {/* Glowing paper back shadow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-rose-500/20 via-pink-400/20 to-rose-600/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Letter Body (Warm luxury parchment look with dark luxury romance vibe) */}
          <div className="relative bg-[#180e16] border border-rose-400/30 rounded-3xl p-8 sm:p-14 md:p-16 shadow-2xl text-rose-100 shadow-black/90">
            {/* Top Wax Seal Emblem */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 border-2 border-rose-400/40 shadow-xl flex items-center justify-center glow-romantic-sm">
                <Heart className="w-6 h-6 text-rose-200 fill-rose-300/40" />
              </div>
            </div>

            {/* Corner Decorative Flourishes */}
            <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-rose-400/40" />
            <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-rose-400/40" />
            <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-rose-400/40" />
            <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-rose-400/40" />

            {/* Letter Greeting */}
            <div className="mt-4 mb-8">
              <h3 className="font-handwriting text-3xl sm:text-4xl text-rose-200 tracking-wide">
                {resolvedGreeting}
              </h3>
            </div>

            {/* Letter Paragraphs */}
            <div className="space-y-6 text-sm sm:text-base md:text-lg text-rose-100/90 font-light leading-relaxed sm:leading-loose">
              {personalLetter.paragraphs.map((paragraph, index) => (
                <p key={index} className="font-sans">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Letter Signoff */}
            <div className="mt-10 pt-8 border-t border-rose-500/20 flex flex-col items-end text-right">
              <p className="font-serif-luxury text-xl sm:text-2xl text-rose-200 font-medium mb-2">
                {resolvedSignoff}
              </p>
              <p className="text-xs sm:text-sm text-rose-300/70 font-light mb-1">
                {personalLetter.closing || 'With all my love,'}
              </p>
              <p className="font-handwriting text-2xl sm:text-3xl text-rose-300 tracking-wider">
                {resolvedSender}
              </p>
            </div>

            {/* Gentle sparkle accent */}
            <div className="absolute bottom-5 left-8 flex items-center gap-1.5 text-xs text-rose-400/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] tracking-widest uppercase">Sealed with love</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
