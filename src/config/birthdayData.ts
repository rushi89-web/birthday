/**
 * =====================================================================
 * BIRTHDAY SURPRISE CONFIGURATION
 * =====================================================================
 * Customize all text, memories, dates, and asset file paths here.
 * 
 * PHOTO & MEDIA ASSET GUIDELINES:
 * 1. Place your girlfriend's photos in the `/public/photos/` folder:
 *    - e.g. `/public/photos/hero.jpg`
 *    - e.g. `/public/photos/story1.jpg`, `story2.jpg`, etc.
 *    - e.g. `/public/photos/photo1.jpg` through `photo8.jpg`
 *    - e.g. `/public/photos/special.jpg`
 *    - e.g. `/public/photos/ending.jpg`
 * 2. Place your birthday video in `/public/video/` (e.g. `/public/video/birthday.mp4`)
 * 3. Place your background song in `/public/music/` (e.g. `/public/music/romantic.mp3`)
 *    (Note: If no audio file is provided, an ambient romantic piano chime
 *     synthesizer will play softly automatically!)
 * 
 * If any image path is left empty or not found, the website displays an
 * elegant romantic placeholder: "Your memory goes here ❤️".
 * =====================================================================
 */

export interface StoryTimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string; // e.g. "/photos/story1.jpg"
  location?: string;
}

export interface GalleryPhotoItem {
  id: string;
  slotLabel: string; // "photo1" through "photo8"
  title: string;
  caption: string;
  date?: string;
  image: string; // e.g. "/photos/photo1.jpg"
}

export interface LoveReasonItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface BirthdayWebsiteConfig {
  herName: string;
  yourName: string;
  birthDate: string; // "YYYY-MM-DD" or month & day for next birthday calculation e.g. "2002-10-24"
  heroSubtitle: string;
  heroPhoto: string; // e.g. "/photos/hero.jpg"
  
  ourStory: StoryTimelineItem[];
  photoMemories: GalleryPhotoItem[];
  reasonsILoveYou: LoveReasonItem[];
  
  specialPhoto: {
    image: string; // e.g. "/photos/special.jpg"
    quoteTop: string;
    quoteBottom: string;
    caption: string;
  };
  
  birthdayVideo: {
    videoUrl: string; // e.g. "/video/birthday.mp4"
    posterImage?: string;
    title: string;
    caption: string;
  };
  
  personalLetter: {
    title: string;
    greeting: string;
    paragraphs: string[];
    signoff: string;
    closing: string;
    sender: string;
  };
  
  secretSurprise: {
    buttonPrompt: string;
    teaserQuestion: string;
    revealedMessage: string;
    bonusLoveNote: string;
  };
  
  finalEnding: {
    photo: string; // e.g. "/photos/ending.jpg"
    title: string;
    note1: string;
    note2Lines: string[];
    closingLine: string;
  };
  
  music: {
    title: string;
    customAudioSrc: string; // e.g. "/music/romantic.mp3"
    useSynthesizerIfEmpty: boolean;
  };
}

export const defaultBirthdayConfig: BirthdayWebsiteConfig = {
  herName: "Pallu", // Her name
  yourName: "Always Yours", // Replace with your name
  birthDate: "2002-10-24", // Set to her birthday (used for the countdown)
  heroSubtitle: "To the girl who makes my world a little brighter every single day.",
  heroPhoto: "", // Place photo in /public/photos/hero.jpg or use the in-app photo uploader

  ourStory: [
    {
      id: "story-1",
      date: "The First Day",
      title: "The day we first met...",
      description: "From the very first conversation, there was something undeniable in your laughter. You lit up the entire room and I haven't stopped smiling since.",
      image: "", // e.g. "/photos/story1.jpg"
      location: "Where it all started",
    },
    {
      id: "story-2",
      date: "The Turning Point",
      title: "The moment I realized you were special...",
      description: "It wasn't just a single grand gesture, but the way you listened, the way you cared, and the warmth you naturally bring into every space you walk into.",
      image: "", // e.g. "/photos/story2.jpg"
      location: "Unforgettable evening",
    },
    {
      id: "story-3",
      date: "Unforgettable Memory",
      title: "One of my favorite memories with you...",
      description: "Lost in time, talking about everything and nothing until late at night. Looking at you and thinking how incredibly lucky I am to have you in my life.",
      image: "", // e.g. "/photos/story3.jpg"
      location: "Under the stars",
    },
    {
      id: "story-4",
      date: "Today & Forever",
      title: "And every moment since then...",
      description: "Every coffee run, every long drive, every laugh and shared secret. Loving you has been the easiest, sweetest adventure of my life.",
      image: "", // e.g. "/photos/story4.jpg"
      location: "Right here with you",
    },
  ],

  photoMemories: [
    {
      id: "slot-photo1",
      slotLabel: "photo1",
      title: "That Radiant Smile",
      caption: "The smile that instantly melts away any bad day.",
      date: "A sweet memory",
      image: "", // e.g. "/photos/photo1.jpg"
    },
    {
      id: "slot-photo2",
      slotLabel: "photo2",
      title: "Golden Hour Glow",
      caption: "You outshine every sunset we've ever watched.",
      date: "Golden moments",
      image: "", // e.g. "/photos/photo2.jpg"
    },
    {
      id: "slot-photo3",
      slotLabel: "photo3",
      title: "Little Adventures",
      caption: "Anywhere feels like home as long as you're holding my hand.",
      date: "Day trip memories",
      image: "", // e.g. "/photos/photo3.jpg"
    },
    {
      id: "slot-photo4",
      slotLabel: "photo4",
      title: "Unfiltered Joy",
      caption: "My absolute favorite version of you: happy and free.",
      date: "Pure happiness",
      image: "", // e.g. "/photos/photo4.jpg"
    },
    {
      id: "slot-photo5",
      slotLabel: "photo5",
      title: "Cozy Afternoons",
      caption: "Simple moments made extraordinary just because you're there.",
      date: "Warm hugs & coffee",
      image: "", // e.g. "/photos/photo5.jpg"
    },
    {
      id: "slot-photo6",
      slotLabel: "photo6",
      title: "Dressed to Impress",
      caption: "The prettiest girl in any room, effortlessly.",
      date: "Date night",
      image: "", // e.g. "/photos/photo6.jpg"
    },
    {
      id: "slot-photo7",
      slotLabel: "photo7",
      title: "Silly & Playful",
      caption: "Thank you for matching my craziness and making me laugh endlessly.",
      date: "Goofy times",
      image: "", // e.g. "/photos/photo7.jpg"
    },
    {
      id: "slot-photo8",
      slotLabel: "photo8",
      title: "My Favorite View",
      caption: "Every memory with you is my new favorite.",
      date: "Forever treasured",
      image: "", // e.g. "/photos/photo8.jpg"
    },
  ],

  reasonsILoveYou: [
    {
      id: "reason-1",
      number: "01",
      title: "Your smile",
      description: "It has the miraculous power to turn any gloomy day into sunshine.",
    },
    {
      id: "reason-2",
      number: "02",
      title: "The way you care",
      description: "Your empathy, your gentle thoughtfulness, and how deeply you love those around you.",
    },
    {
      id: "reason-3",
      number: "03",
      title: "Your beautiful heart",
      description: "Pure, kind, and so generous. You inspire me to be a better person.",
    },
    {
      id: "reason-4",
      number: "04",
      title: "The way you make ordinary moments special",
      description: "Even running errands or sitting in silence feels like magic when I'm with you.",
    },
    {
      id: "reason-5",
      number: "05",
      title: "Your strength",
      description: "The graceful resilience you show when facing challenges.",
    },
    {
      id: "reason-6",
      number: "06",
      title: "Your laugh",
      description: "The sweetest sound in the universe. I could listen to it forever.",
    },
    {
      id: "reason-7",
      number: "07",
      title: "Your kindness",
      description: "How warmly you treat the world and how safe you make me feel.",
    },
    {
      id: "reason-8",
      number: "08",
      title: "Your craziness",
      description: "Your playful spirit, your hilarious quirks, and our random inside jokes.",
    },
    {
      id: "reason-9",
      number: "09",
      title: "The memories we create",
      description: "Every second with you becomes a treasure I replay in my mind.",
    },
    {
      id: "reason-10",
      number: "10",
      title: "Simply... YOU ❤️",
      description: "Because there is nobody else in this world like you, and I wouldn't trade you for anything.",
    },
  ],

  specialPhoto: {
    image: "", // e.g. "/photos/special.jpg"
    quoteTop: "If I could freeze one moment forever...",
    quoteBottom: "It would be a moment with you.",
    caption: "A timeless reminder of our happiness together.",
  },

  birthdayVideo: {
    videoUrl: "", // e.g. "/video/birthday.mp4"
    posterImage: "",
    title: "A Little Video For You 🎬",
    caption: "Every recorded smile and cherished memory captured in motion.",
  },

  personalLetter: {
    title: "A Letter For You 💌",
    greeting: "Dear Pallu,",
    paragraphs: [
      "Happy Birthday to the person who means more to me than words can explain.",
      "I don't know if I can ever perfectly describe what you mean to me, but I hope this little website reminds you of how special you are to me.",
      "Thank you for being you.",
      "Thank you for the smiles, the conversations, the memories, the little moments and everything in between.",
      "I hope this new year of your life brings you happiness, success, peace and everything your heart wishes for.",
      "And most importantly...",
      "I hope I get to create many more beautiful memories with you.",
    ],
    signoff: "Happy Birthday, Pallu. ❤️",
    closing: "With all my love,",
    sender: "[YOUR NAME]",
  },

  secretSurprise: {
    buttonPrompt: "There's One More Thing... 👀",
    teaserQuestion: "You really thought that was everything?",
    revealedMessage: "No matter where life takes us, I hope we always keep making memories worth remembering. ❤️",
    bonusLoveNote: "P.S. You're stuck with me forever! Happy Birthday, gorgeous. ✨",
  },

  finalEnding: {
    photo: "", // e.g. "/photos/ending.jpg"
    title: "Happy Birthday, Pallu ❤️",
    note1: "Thank you for being one of the most beautiful parts of my life.",
    note2Lines: [
      "Here's to more laughs.",
      "More adventures.",
      "More memories.",
      "More us. ❤️",
    ],
    closingLine: "Forever grateful for you.",
  },

  music: {
    title: "Tera Naam Doon (Best Part)",
    customAudioSrc: "/music/tera-naam-doon.mp3",
    useSynthesizerIfEmpty: true,
  },
};
