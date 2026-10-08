import React, { useState, useEffect } from 'react';
import { Cake, Sparkles, Heart } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

export const CountdownSection: React.FC = () => {
  const { config } = useBirthday();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();

      // Target: Tonight at 12:00 AM (midnight)
      const targetMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = targetMidnight.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const herName = config.herName || 'Pallu';

  return (
    <section id="countdown" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-rose-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-3">
            <Cake className="w-4 h-4 text-rose-400" />
            <span>Midnight Celebration</span>
            <span aria-hidden="true">·</span>
            <span>Every Second Counts</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-rose-50 tracking-tight mb-4">
            Until Tonight at 12:00 AM <span className="text-rose-400">🎂</span>
          </h2>
          <p className="text-sm sm:text-base text-rose-200/70 font-light">
            Counting down every second until midnight strikes for you, {herName} ❤️
          </p>
        </div>

        {timeLeft.isToday ? (
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-rose-400/40 glow-romantic mb-6">
            <Sparkles className="w-12 h-12 text-rose-300 mx-auto mb-4 animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="font-serif-luxury text-3xl sm:text-5xl text-rose-100 font-medium mb-3">
              It's 12:00 AM! Happy Birthday, {herName}! 🎉
            </h3>
            <p className="text-lg text-rose-200 font-light">
              The clock has struck midnight! The world is so much sweeter because you are in it.
            </p>
          </div>
        ) : (
          /* Countdown Units (Tabular Numerals) */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 sm:p-6 rounded-2xl border border-rose-400/40 flex flex-col items-center justify-center neon-box-rose"
              >
                <span className="font-serif-luxury text-4xl sm:text-5xl font-light text-white tabular-nums neon-text-subtle">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-xs uppercase tracking-widest text-rose-300/80 mt-1 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Romantic Sub-label with dynamic neon badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full neon-tag text-rose-200 text-sm font-medium">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-500 animate-pulse" />
          <span>Another year of being amazing ❤️</span>
        </div>
      </div>
    </section>
  );
};
