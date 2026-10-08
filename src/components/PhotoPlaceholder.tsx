import React, { useRef } from 'react';
import { Heart, Upload, Image as ImageIcon } from 'lucide-react';
import { useBirthday } from '../context/BirthdayContext';

interface PhotoPlaceholderProps {
  slotKey?: string;
  label?: string;
  aspectRatioClass?: string;
  className?: string;
  minHeight?: string;
}

export const PhotoPlaceholder: React.FC<PhotoPlaceholderProps> = ({
  slotKey,
  label = 'Your memory goes here ❤️',
  aspectRatioClass = 'aspect-[4/5]',
  className = '',
  minHeight = 'min-h-[260px]',
}) => {
  const { updatePhotoSlot } = useBirthday();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && slotKey) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updatePhotoSlot(slotKey, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-b from-[#1a0f18]/90 to-[#0e070d]/90 flex flex-col items-center justify-center p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-rose-400/40 hover:shadow-rose-950/40 ${aspectRatioClass} ${minHeight} ${className}`}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial from-rose-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Decorative corner accents */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-rose-400/30" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-rose-400/30" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-rose-400/30" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-rose-400/30" />

      {/* Slot identifier if available */}
      {slotKey && (
        <span className="absolute top-3 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-rose-300/50">
          Slot: {slotKey}
        </span>
      )}

      {/* Center Icon & Heart */}
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-300 shadow-inner group-hover:scale-110 transition-transform duration-300">
          <Heart className="w-6 h-6 text-rose-400 fill-rose-500/30 animate-pulse-subtle" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#180a13] border border-rose-400/30 flex items-center justify-center text-rose-300">
          <ImageIcon className="w-3.5 h-3.5 text-rose-300/70" />
        </div>
      </div>

      {/* Primary Placeholder Text */}
      <p className="font-serif-luxury text-lg text-rose-100/90 font-medium tracking-wide max-w-[200px] mb-2 leading-snug">
        {label}
      </p>

      {/* Instruction Subtext */}
      <p className="text-xs text-rose-200/50 max-w-[220px] leading-relaxed">
        Upload a photo or place your file in <span className="text-rose-300 font-mono text-[11px]">/public/photos/</span>
      </p>

      {/* Quick Upload Action if slotKey provided */}
      {slotKey && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 text-rose-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <Upload className="w-3 h-3 text-rose-300" />
            <span>Upload Her Photo</span>
          </button>
        </>
      )}
    </div>
  );
};
