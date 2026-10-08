import React from 'react';
import { Heart, ArrowDown, Sparkles } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';
import { PhotoPlaceholder } from './PhotoPlaceholder';

export const HeroSection: React.FC = () => {
  const { config } = useBirthday();

  const handleBeginStory = () => {
    const target = document.getElementById('our-story');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Romantic Headline & Story Kickoff */}
        <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start z-10">
          {/* Subtle intro kicker with heart */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full neon-tag text-rose-200 text-xs sm:text-sm font-medium mb-6 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-rose-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>A celebration crafted for the one who has my heart</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500 animate-pulse" />
          </div>

          {/* Main Title: "Happy Birthday, [HER NAME] ❤️" */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal text-rose-50 leading-[1.08] tracking-tight mb-6">
            Happy Birthday,{' '}
            <span className="neon-text-rose italic font-medium block sm:inline text-white">
              {config.herName || 'Pallu'}
            </span>{' '}
            <span className="inline-block text-rose-500 animate-pulse">❤️</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-rose-200/80 font-light max-w-xl leading-relaxed mb-8">
            {config.heroSubtitle ||
              'To the girl who makes my world a little brighter every single day.'}
          </p>

          {/* Animated Heart Accent */}
          <div className="flex items-center gap-3 mb-10 text-rose-300/70 text-sm">
            <div className="w-12 h-[1px] bg-gradient-to-r from-rose-500/40 to-transparent" />
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-500/60 animate-bounce" />
              <span className="italic font-serif-luxury text-base text-rose-200/90">
                Forever my favorite person
              </span>
            </div>
            <div className="w-12 h-[1px] bg-gradient-to-l from-rose-500/40 to-transparent" />
          </div>

          {/* Action CTA: "Begin Our Story →" */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={handleBeginStory}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-base tracking-wide shadow-xl shadow-rose-950/50 hover:shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-rose-300/30"
            >
              <span>Begin Our Story</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <a
              href="#letter"
              className="text-sm font-medium text-rose-300/80 hover:text-rose-100 transition-colors px-4 py-2"
            >
              Read My Letter 💌
            </a>
          </div>
        </div>

        {/* Right Column: Her Featured Best Photo in Luxury Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md sm:max-w-sm">
            {/* Glowing Backdrop Frame */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-rose-600/30 via-pink-500/20 to-purple-600/30 rounded-3xl blur-xl opacity-75 animate-pulse-subtle" />

            {/* Luxurious Double Border Container with dynamic neon pulse */}
            <div className="relative p-3 rounded-3xl bg-[#140b12] border border-rose-400/60 shadow-2xl shadow-black/80 neon-box-rose">
              {/* Corner Filigrees */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-rose-400/50 rounded-tl-sm pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-rose-400/50 rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-rose-400/50 rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-rose-400/50 rounded-br-sm pointer-events-none" />

              {config.heroPhoto ? (
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group">
                  <img
                    src={config.heroPhoto}
                    alt={`${config.herName || 'Girlfriend'}'s photo`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="font-serif-luxury text-lg text-white font-medium drop-shadow-md">
                      The birthday girl ✨
                    </p>
                  </div>
                </div>
              ) : (
                <PhotoPlaceholder
                  slotKey="hero"
                  label={`A picture of ${config.herName || 'the birthday girl'} ❤️`}
                  aspectRatioClass="aspect-[3/4]"
                />
              )}
            </div>

            {/* Floating Tag */}
            <div className="absolute -bottom-4 right-4 sm:-right-4 px-4 py-2 rounded-xl bg-[#1d0e1b]/90 border border-rose-400/30 shadow-xl backdrop-blur-md flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-pulse" />
              <span className="text-xs font-medium text-rose-200">
                You make everything brighter
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Downward indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-rose-300/40 hover:text-rose-200 transition-colors animate-bounce">
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
};
