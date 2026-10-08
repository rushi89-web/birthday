import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Settings, Sparkles, Heart } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';

export const Navbar: React.FC = () => {
  const {
    config,
    isPlayingMusic,
    toggleMusic,
    isMuted,
    toggleMute,
    floatingParticlesEnabled,
    setFloatingParticlesEnabled,
    setIsEditorOpen,
  } = useBirthday();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c080d]/90 backdrop-blur-md border-b border-rose-500/30 py-3 shadow-2xl shadow-rose-950/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Neon Brand Wordmark */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 whitespace-nowrap cursor-pointer transition-transform hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-400/50 flex items-center justify-center shadow-lg shadow-rose-950/80 neon-box-rose">
            <Heart className="w-4 h-4 text-rose-300 fill-rose-500 animate-pulse" />
          </div>
          <span className="font-serif-luxury text-xl sm:text-2xl font-semibold tracking-wide text-rose-100 neon-text-rose">
            {config.herName || 'Pallu'}
          </span>
        </a>

        {/* Zone 2: Primary Actions with Dynamic Neon Accent */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle button with dynamic neon aura */}
          <button
            type="button"
            onClick={toggleMusic}
            title={isPlayingMusic ? `Pause: ${config.music.title || 'Tera Naam Doon'}` : `Play: ${config.music.title || 'Tera Naam Doon'}`}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              isPlayingMusic
                ? 'bg-rose-500/25 border-rose-400 text-rose-100 neon-box-rose shadow-md shadow-rose-950'
                : 'bg-white/5 border-white/10 text-rose-200/60 hover:text-rose-200 hover:bg-white/10'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'animate-bounce text-rose-300' : ''}`} />
            <span className="hidden sm:inline">
              {isPlayingMusic ? '♪ Tera Naam Doon' : 'Play Song'}
            </span>
          </button>

          {/* Mute button if playing */}
          {isPlayingMusic && (
            <button
              type="button"
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-rose-500/30 text-rose-200/80 hover:text-rose-100 text-xs transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Floating petals toggle */}
          <button
            type="button"
            onClick={() => setFloatingParticlesEnabled((prev) => !prev)}
            title={floatingParticlesEnabled ? 'Hide petals' : 'Show petals'}
            className={`p-2 rounded-full border text-xs transition-colors cursor-pointer ${
              floatingParticlesEnabled
                ? 'bg-rose-500/20 border-rose-400/50 text-rose-200 neon-box-rose'
                : 'bg-white/5 border-white/10 text-rose-300/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Personalize / Photo Upload Settings button with neon gradient */}
          <button
            type="button"
            onClick={() => setIsEditorOpen(true)}
            title="Personalize names & upload her real photos"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white text-xs font-medium shadow-lg shadow-rose-950/80 hover:shadow-rose-500/50 transition-all cursor-pointer whitespace-nowrap border border-pink-300/40 glow-romantic-sm"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Customize & Photos</span>
            <span className="sm:hidden">Edit</span>
          </button>
        </div>
      </div>

      {/* Dynamic Neon Reading Progress Indicator Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/5">
        <div
          className="h-full neon-border-flow transition-all duration-150 ease-out shadow-[0_0_10px_#ff2a85]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
