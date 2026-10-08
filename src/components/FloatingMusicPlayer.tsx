import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';
import { romanticAudio } from '../utils/audioPlayer';

export const FloatingMusicPlayer: React.FC = () => {
  const { config, isPlayingMusic, toggleMusic, isMuted, toggleMute } = useBirthday();
  const [hasEverPlayed, setHasEverPlayed] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      setHasEverPlayed(true);
    }
  }, [isPlayingMusic]);

  const handlePlayClick = () => {
    romanticAudio.startMusic(config.music.customAudioSrc);
  };

  return (
    <aside
      aria-label="Music playback controls"
      className="fixed bottom-6 right-6 z-40 transition-all duration-300"
    >
      <div className="glass-panel p-2.5 sm:p-3 rounded-2xl border border-rose-400/50 bg-[#160c15]/95 shadow-2xl shadow-rose-950/60 flex items-center gap-3 backdrop-blur-xl neon-box-rose">
        {/* Animated Disc / Icon */}
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlayingMusic ? 'Pause song' : 'Play Tera Naam Doon'}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
            isPlayingMusic
              ? 'bg-gradient-to-tr from-rose-600 to-pink-500 shadow-lg shadow-rose-950 glow-romantic-sm'
              : 'bg-white/10 hover:bg-white/15'
          }`}
        >
          {isPlayingMusic ? (
            <div className="flex items-end justify-center gap-0.5 h-4">
              <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '14px', animationDuration: '0.6s' }} />
              <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '10px', animationDuration: '0.4s' }} />
              <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '16px', animationDuration: '0.8s' }} />
            </div>
          ) : (
            <Play className="w-4 h-4 text-rose-300 translate-x-0.5" />
          )}
        </button>

        {/* Song Info */}
        <div className="flex flex-col cursor-pointer" onClick={toggleMusic}>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-rose-100 max-w-[130px] sm:max-w-[160px] truncate leading-tight">
              Tera Naam Doon
            </span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-500 inline" />
          </div>
          <span className="text-[10px] text-rose-300/60 leading-tight">
            {isPlayingMusic ? 'Now Playing · Best Part' : 'Tap to Play Song'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 border-l border-white/10 pl-2">
          {isPlayingMusic ? (
            <button
              type="button"
              onClick={toggleMusic}
              aria-label="Pause"
              className="p-1.5 rounded-lg text-rose-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePlayClick}
              aria-label="Play"
              className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="p-1.5 rounded-lg text-rose-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
