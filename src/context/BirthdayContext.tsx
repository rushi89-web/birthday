import React, { createContext, useContext, useState, useEffect } from 'react';
import { BirthdayWebsiteConfig, defaultBirthdayConfig } from '../config/birthdayData';
import { romanticAudio } from '../utils/audioPlayer';

interface BirthdayContextType {
  config: BirthdayWebsiteConfig;
  updateField: <K extends keyof BirthdayWebsiteConfig>(key: K, value: BirthdayWebsiteConfig[K]) => void;
  updatePhotoSlot: (slotKey: string, imageSrc: string) => void;
  updateStoryItem: (index: number, updates: Partial<BirthdayWebsiteConfig['ourStory'][0]>) => void;
  updateGalleryItem: (index: number, updates: Partial<BirthdayWebsiteConfig['photoMemories'][0]>) => void;
  updateReasonItem: (index: number, updates: Partial<BirthdayWebsiteConfig['reasonsILoveYou'][0]>) => void;
  resetToDefaults: () => void;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  floatingParticlesEnabled: boolean;
  setFloatingParticlesEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'romantic_birthday_config_v1';

const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export const BirthdayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<BirthdayWebsiteConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.herName === 'My Love') {
            parsed.herName = 'Pallu';
          }
          if (parsed.personalLetter) {
            parsed.personalLetter.greeting = parsed.personalLetter.greeting.replace('My Love', 'Pallu');
            parsed.personalLetter.signoff = parsed.personalLetter.signoff.replace('My Love', 'Pallu');
          }
          parsed.music = {
            ...defaultBirthdayConfig.music,
            ...(parsed.music || {}),
            customAudioSrc:
              parsed.music?.customAudioSrc && parsed.music.customAudioSrc.startsWith('data:')
                ? parsed.music.customAudioSrc
                : defaultBirthdayConfig.music.customAudioSrc,
          };
          return { ...defaultBirthdayConfig, ...parsed };
        }
      } catch (e) {
        console.warn('Could not parse saved config, using defaults', e);
      }
    }
    return defaultBirthdayConfig;
  });

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [floatingParticlesEnabled, setFloatingParticlesEnabled] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    const unsub = romanticAudio.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });
    return unsub;
  }, []);

  const saveToStorage = (updated: BirthdayWebsiteConfig) => {
    setConfig(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage quota exceeded or unavailable', e);
    }
  };

  const updateField = <K extends keyof BirthdayWebsiteConfig>(key: K, value: BirthdayWebsiteConfig[K]) => {
    const updated = { ...config, [key]: value };
    saveToStorage(updated);
  };

  const updatePhotoSlot = (slotKey: string, imageSrc: string) => {
    const updated = { ...config };
    if (slotKey === 'hero') {
      updated.heroPhoto = imageSrc;
    } else if (slotKey === 'special') {
      updated.specialPhoto = { ...updated.specialPhoto, image: imageSrc };
    } else if (slotKey === 'ending') {
      updated.finalEnding = { ...updated.finalEnding, photo: imageSrc };
    } else if (slotKey.startsWith('story-')) {
      updated.ourStory = updated.ourStory.map((item) =>
        item.id === slotKey ? { ...item, image: imageSrc } : item
      );
    } else if (slotKey.startsWith('photo') || slotKey.startsWith('slot-photo')) {
      const normalized = slotKey.startsWith('slot-photo') ? slotKey : `slot-${slotKey}`;
      updated.photoMemories = updated.photoMemories.map((item) =>
        item.id === normalized || item.slotLabel === slotKey ? { ...item, image: imageSrc } : item
      );
    }
    saveToStorage(updated);
  };

  const updateStoryItem = (index: number, updates: Partial<BirthdayWebsiteConfig['ourStory'][0]>) => {
    const newStory = [...config.ourStory];
    if (newStory[index]) {
      newStory[index] = { ...newStory[index], ...updates };
      saveToStorage({ ...config, ourStory: newStory });
    }
  };

  const updateGalleryItem = (index: number, updates: Partial<BirthdayWebsiteConfig['photoMemories'][0]>) => {
    const newGallery = [...config.photoMemories];
    if (newGallery[index]) {
      newGallery[index] = { ...newGallery[index], ...updates };
      saveToStorage({ ...config, photoMemories: newGallery });
    }
  };

  const updateReasonItem = (index: number, updates: Partial<BirthdayWebsiteConfig['reasonsILoveYou'][0]>) => {
    const newReasons = [...config.reasonsILoveYou];
    if (newReasons[index]) {
      newReasons[index] = { ...newReasons[index], ...updates };
      saveToStorage({ ...config, reasonsILoveYou: newReasons });
    }
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // storage clear
    }
    setConfig(defaultBirthdayConfig);
  };

  const toggleMusic = () => {
    const songUrl = config.music?.customAudioSrc || '/music/tera-naam-doon.mp3';
    romanticAudio.toggle(songUrl);
  };

  const toggleMute = () => {
    const muted = romanticAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <BirthdayContext.Provider
      value={{
        config,
        updateField,
        updatePhotoSlot,
        updateStoryItem,
        updateGalleryItem,
        updateReasonItem,
        resetToDefaults,
        isPlayingMusic,
        toggleMusic,
        isMuted,
        toggleMute,
        floatingParticlesEnabled,
        setFloatingParticlesEnabled,
        isEditorOpen,
        setIsEditorOpen,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error('useBirthday must be used within a BirthdayProvider');
  }
  return context;
};
