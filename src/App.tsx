import React, { useState } from 'react';
import { BirthdayProvider, useBirthday } from './context/BirthdayContext';
import { AmbientBackground } from './components/AmbientBackground';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OurStorySection } from './components/OurStorySection';
import { ReasonsSection } from './components/ReasonsSection';
import { SpecialPhotoSection } from './components/SpecialPhotoSection';
import { LetterSection } from './components/LetterSection';
import { CountdownSection } from './components/CountdownSection';
import { SecretSurpriseSection } from './components/SecretSurpriseSection';
import { FinalSection } from './components/FinalSection';
import { PersonalizeModal } from './components/PersonalizeModal';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';

function BirthdaySurpriseContent() {
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0c080d] text-[#f7eff3] selection:bg-rose-500/30 selection:text-rose-200">
      {/* Gentle Floating Atmospheric Background */}
      <AmbientBackground />

      {/* Cinematic Intro Screen: shown initially until she clicks "Open Your Surprise ✨" */}
      {!hasOpenedSurprise && (
        <IntroScreen onOpenSurprise={() => setHasOpenedSurprise(true)} />
      )}

      {/* Main Website (rendered smoothly once opened) */}
      <div
        className={`transition-opacity duration-1000 ${
          hasOpenedSurprise ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Navigation Bar */}
        <Navbar />

        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Our Story Timeline */}
        <OurStorySection />

        {/* 3. 10 Reasons I Love You */}
        <ReasonsSection />

        {/* 4. Special Favorite Photo Moment */}
        <SpecialPhotoSection />

        {/* 5. Romantic Handwritten Letter */}
        <LetterSection />

        {/* 6. Birthday Countdown */}
        <CountdownSection />

        {/* 7. Secret Surprise */}
        <SecretSurpriseSection />

        {/* 8. Emotional Final Section */}
        <FinalSection />

        {/* Interactive Customization / Photo Upload Drawer */}
        <PersonalizeModal />

        {/* Floating Music Controls */}
        <FloatingMusicPlayer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BirthdayProvider>
      <BirthdaySurpriseContent />
    </BirthdayProvider>
  );
}
