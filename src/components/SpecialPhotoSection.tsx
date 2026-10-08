import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';
import { PhotoPlaceholder } from './PhotoPlaceholder';

export const SpecialPhotoSection: React.FC = () => {
  const { config } = useBirthday();
  const { specialPhoto } = config;

  return (
    <section id="special-moment" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-rose-500/30 bg-[#140a12] shadow-2xl shadow-black/90">
          {specialPhoto.image ? (
            <div className="relative min-h-[460px] sm:min-h-[580px] flex items-center justify-center p-8 sm:p-14 group">
              {/* Background Image with subtle parallax feel & gentle zoom */}
              <img
                src={specialPhoto.image}
                alt="Favorite special memory"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Cinematic Dark Gradient Scrim to ensure 4.5:1 text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 pointer-events-none" />
              <div className="absolute inset-0 bg-rose-950/20 mix-blend-multiply pointer-events-none" />

              {/* Text Overlay */}
              <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300 mb-6 backdrop-blur-md">
                  <Sparkles className="w-6 h-6 text-rose-300 animate-spin" style={{ animationDuration: '12s' }} />
                </div>

                <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-rose-200/90 italic font-light tracking-wide mb-4 drop-shadow-md">
                  "{specialPhoto.quoteTop || 'If I could freeze one moment forever...'}"
                </p>

                <h3 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight mb-6 leading-tight drop-shadow-lg">
                  {specialPhoto.quoteBottom || 'It would be a moment with you.'}
                </h3>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-xs text-rose-200/90">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
                  <span>{specialPhoto.caption || 'A timeless reminder of our happiness together.'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 sm:p-14 text-center flex flex-col items-center">
              <div className="max-w-xl mx-auto mb-8">
                <p className="font-serif-luxury text-xl sm:text-2xl text-rose-200/90 italic mb-2">
                  "{specialPhoto.quoteTop || 'If I could freeze one moment forever...'}"
                </p>
                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-rose-50 font-normal mb-4">
                  {specialPhoto.quoteBottom || 'It would be a moment with you.'}
                </h3>
              </div>

              <PhotoPlaceholder
                slotKey="special"
                label="Her favorite photo goes here ❤️"
                aspectRatioClass="aspect-[16/9] w-full max-w-2xl"
                minHeight="min-h-[340px]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
