import React, { useMemo } from 'react';
import { useBirthday } from '../context/BirthdayContext';

interface ParticleSpec {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'heart' | 'petal' | 'bokeh';
}

export const AmbientBackground: React.FC = () => {
  const { floatingParticlesEnabled } = useBirthday();

  const particles: ParticleSpec[] = useMemo(() => {
    const list: ParticleSpec[] = [];
    const types: ('heart' | 'petal' | 'bokeh')[] = ['petal', 'petal', 'heart', 'bokeh'];
    for (let i = 0; i < 28; i++) {
      list.push({
        id: i,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        size: 8 + Math.floor(Math.random() * 14),
        duration: 16 + Math.floor(Math.random() * 14),
        delay: Math.floor(Math.random() * 10),
        opacity: 0.15 + Math.random() * 0.25,
        type: types[i % types.length],
      });
    }
    return list;
  }, []);

  if (!floatingParticlesEnabled) {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#0c080d]" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0c080d]">
      {/* Subtle deep ambient glow spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-900/10 blur-[120px]" />
      <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-950/15 blur-[140px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-pink-950/10 blur-[130px]" />

      {/* Floating Petals & Hearts */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transform-gpu"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animation: `floatPetal ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'heart' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="rgba(244, 63, 94, 0.6)"
              className="drop-shadow-sm"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {p.type === 'petal' && (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size * 1.5}px`,
                borderRadius: '50% 50% 50% 10% / 60% 60% 40% 40%',
                background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.5), rgba(244, 63, 94, 0.2))',
                transform: `rotate(${p.id * 35}deg)`,
              }}
            />
          )}

          {p.type === 'bokeh' && (
            <div
              style={{
                width: `${p.size * 1.8}px`,
                height: `${p.size * 1.8}px`,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(254, 205, 211, 0.35) 0%, rgba(254, 205, 211, 0) 70%)',
              }}
            />
          )}
        </div>
      ))}

      <style>{`
        @keyframes floatPetal {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) translateX(12px) rotate(15deg);
          }
          100% {
            transform: translateY(-50px) translateX(-10px) rotate(-15deg);
          }
        }
      `}</style>
    </div>
  );
};
