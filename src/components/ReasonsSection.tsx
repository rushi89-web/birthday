import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';

export const ReasonsSection: React.FC = () => {
  const { config } = useBirthday();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  return (
    <section id="reasons" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-rose-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-3">
            <span>From the Bottom of My Heart</span>
            <span aria-hidden="true">·</span>
            <span>Always & Forever</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-rose-50 tracking-tight mb-4">
            10 Things I Love About You <span className="text-rose-500">❤️</span>
          </h2>
          <p className="text-sm sm:text-base text-rose-200/70 font-light leading-relaxed">
            There are a million reasons, but here are ten little pieces of why you mean the entire world to me. Hover or tap each card to discover more.
          </p>
        </div>

        {/* 10 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {config.reasonsILoveYou.map((reason, index) => {
            const isActive = activeCardIndex === index;

            return (
              <div
                key={reason.id || index}
                onClick={() => setActiveCardIndex(isActive ? null : index)}
                onMouseEnter={() => setActiveCardIndex(index)}
                className={`relative group p-6 rounded-2xl cursor-pointer transition-all duration-300 transform border flex flex-col justify-between min-h-[220px] ${
                  isActive
                    ? 'bg-gradient-to-b from-[#241120] to-[#160a14] border-rose-400/50 -translate-y-2 shadow-xl shadow-rose-950/60 glow-romantic-sm'
                    : 'glass-panel border-rose-500/15 hover:border-rose-400/30 hover:-translate-y-1'
                }`}
              >
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif-luxury text-2xl font-light text-rose-300/80 group-hover:text-rose-200 transition-colors">
                    {reason.number}
                  </span>
                  <div
                    className={`p-1.5 rounded-full transition-colors ${
                      isActive ? 'bg-rose-500/20 text-rose-300' : 'text-rose-400/30 group-hover:text-rose-400'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'fill-rose-500 text-rose-400 scale-110' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif-luxury text-lg sm:text-xl text-rose-100 font-medium mb-2 leading-snug group-hover:text-white transition-colors">
                    {reason.title}
                  </h3>

                  {/* Description detail */}
                  <p
                    className={`text-xs text-rose-200/75 font-light leading-relaxed transition-all duration-300 ${
                      isActive ? 'opacity-100 max-h-32' : 'opacity-75'
                    }`}
                  >
                    {reason.description}
                  </p>
                </div>

                {/* Subtle bottom decorative line */}
                <div className="mt-4 pt-2 border-t border-rose-500/10 flex items-center justify-between text-[11px] text-rose-300/40">
                  <span className="italic">Always</span>
                  <Sparkles className="w-3 h-3 text-rose-400/30" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
