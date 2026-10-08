import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';
import { fireRomanticConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audioPlayer';

interface IntroScreenProps {
  onOpenSurprise: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onOpenSurprise }) => {
  const { config } = useBirthday();
  const [step, setStep] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Step 0: "Hey, Beautiful ❤️" shows immediately
    // Step 1: "Today isn't just another day..." appears after 1.8s
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 1800);

    // Step 2: "Today is the day the most special person in my life was born." appears after 3.8s
    const timer2 = setTimeout(() => {
      setStep(2);
    }, 3800);

    // Step 3: glowing button "Open Your Surprise ✨" appears after 5.6s
    const timer3 = setTimeout(() => {
      setStep(3);
    }, 5600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleOpenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Trigger sweet heart & petal confetti
    fireRomanticConfetti(x, y, 60);

    // Start audio playback upon user interaction
    const songUrl = config.music?.customAudioSrc || '/music/tera-naam-doon.mp3';
    romanticAudio.startMusic(songUrl);

    // Smooth transition
    setIsExiting(true);
    setTimeout(() => {
      onOpenSurprise();
    }, 850);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0c080d] px-6 transition-all duration-1000 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dreamy radial ambient lighting */}
      <div className="absolute inset-0 bg-radial from-rose-950/30 via-[#0c080d]/80 to-[#0c080d] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none animate-pulse-subtle" />

      {/* Decorative frame elements */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-rose-500/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-rose-500/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-rose-500/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-rose-500/30" />

      <div className="relative max-w-xl mx-auto text-center flex flex-col items-center">
        {/* Soft glowing heart emblem */}
        <div className="mb-8 w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center glow-romantic-sm animate-float-gentle">
          <Heart className="w-8 h-8 text-rose-400 fill-rose-500/40" />
        </div>

        {/* Line 1: "Hey, Beautiful ❤️" */}
        <h1
          className={`font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-rose-100 tracking-tight transition-all duration-1000 transform ${
            step >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Hey, Beautiful <span className="inline-block text-rose-400 text-3xl sm:text-4xl">❤️</span>
        </h1>

        {/* Line 2: "Today isn't just another day..." */}
        <p
          className={`font-serif-luxury text-xl sm:text-2xl md:text-3xl text-rose-200/80 font-light italic mt-6 transition-all duration-1000 transform ${
            step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Today isn't just another day...
        </p>

        {/* Line 3: "Today is the day the most special person in my life was born." */}
        <p
          className={`text-base sm:text-lg md:text-xl text-rose-100/90 font-light mt-4 max-w-lg leading-relaxed transition-all duration-1000 transform ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Today is the day the most special person in my life was born.
        </p>

        {/* Action Button: "Open Your Surprise ✨" */}
        <div
          className={`mt-10 transition-all duration-1000 transform ${
            step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={handleOpenClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white font-medium text-base sm:text-lg tracking-wide shadow-2xl shadow-rose-950/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden border border-pink-300/60 neon-box-rose"
          >
            {/* Shimmer sweep */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 transform -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
            
            <Sparkles className="w-5 h-5 text-rose-200 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="relative font-medium tracking-wide">Open Your Surprise ✨</span>
          </button>

          <p className="mt-4 text-xs text-rose-300/40 tracking-wider">
            (Tap to reveal your birthday celebration)
          </p>
        </div>
      </div>
    </div>
  );
};
