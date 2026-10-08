/**
 * Romantic Audio Engine
 * Bulletproof audio playback for "Tera Naam Doon (Best Part)"
 * with instant user-gesture unlocking, looping, and graceful fallback.
 */

const DEFAULT_SONG_URL = '/music/tera-naam-doon.mp3';
const FALLBACK_SONG_URL = '/music/romantic.mp3';

class RomanticAudioEngine {
  private htmlAudio: HTMLAudioElement | null = null;
  private isMuted = false;
  private volume = 0.65;
  private currentSrc = DEFAULT_SONG_URL;
  private onStateChangeCallbacks: Set<(isPlaying: boolean) => void> = new Set();
  private hasUserInteracted = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.htmlAudio) return;

    try {
      this.htmlAudio = new Audio();
      this.htmlAudio.src = this.currentSrc;
      this.htmlAudio.preload = 'auto';
      this.htmlAudio.loop = true;
      this.htmlAudio.volume = this.volume;
      this.htmlAudio.muted = this.isMuted;

      this.htmlAudio.addEventListener('play', () => this.notify(true));
      this.htmlAudio.addEventListener('playing', () => this.notify(true));
      this.htmlAudio.addEventListener('pause', () => this.notify(false));
      this.htmlAudio.addEventListener('ended', () => this.notify(false));
      
      this.htmlAudio.addEventListener('error', (e) => {
        console.warn('Audio playback error on primary track:', e);
        // Try fallback song if primary fails
        if (this.htmlAudio && this.currentSrc !== FALLBACK_SONG_URL) {
          this.currentSrc = FALLBACK_SONG_URL;
          this.htmlAudio.src = FALLBACK_SONG_URL;
          this.htmlAudio.load();
          if (this.hasUserInteracted) {
            this.htmlAudio.play().catch(() => {});
          }
        }
      });
    } catch (err) {
      console.warn('Audio element initialization error:', err);
    }
  }

  public subscribe(cb: (isPlaying: boolean) => void) {
    this.onStateChangeCallbacks.add(cb);
    cb(this.isPlaying());
    return () => {
      this.onStateChangeCallbacks.delete(cb);
    };
  }

  private notify(isPlaying: boolean) {
    this.onStateChangeCallbacks.forEach((cb) => cb(isPlaying));
  }

  /**
   * Must be called synchronously inside a user click event handler
   * to satisfy strict browser autoplay policies.
   */
  public startMusic(customSrc?: string): Promise<boolean> {
    this.hasUserInteracted = true;
    this.initAudioElement();

    if (!this.htmlAudio) return Promise.resolve(false);

    const targetSrc = (customSrc && customSrc.trim().length > 0) ? customSrc : DEFAULT_SONG_URL;

    // Check if source changed
    try {
      const currentUrl = new URL(this.htmlAudio.src, window.location.href).pathname;
      const targetUrl = new URL(targetSrc, window.location.href).pathname;
      if (currentUrl !== targetUrl) {
        this.currentSrc = targetSrc;
        this.htmlAudio.src = targetSrc;
        this.htmlAudio.load();
      }
    } catch {
      this.htmlAudio.src = targetSrc;
    }

    this.htmlAudio.muted = this.isMuted;
    this.htmlAudio.volume = this.volume;

    // Synchronous play initiation
    const playPromise = this.htmlAudio.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          this.notify(true);
          return true;
        })
        .catch((err) => {
          console.warn('Browser blocked immediate playback, waiting for tap:', err);
          this.notify(false);
          return false;
        });
    }

    this.notify(true);
    return Promise.resolve(true);
  }

  public pauseMusic() {
    if (this.htmlAudio) {
      this.htmlAudio.pause();
    }
    this.notify(false);
  }

  public toggle(customSrc?: string) {
    if (this.isPlaying()) {
      this.pauseMusic();
    } else {
      this.startMusic(customSrc);
    }
  }

  public isPlaying(): boolean {
    if (!this.htmlAudio) return false;
    return !this.htmlAudio.paused && !this.htmlAudio.ended && this.htmlAudio.currentTime > 0;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.htmlAudio) {
      this.htmlAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.htmlAudio) {
      this.htmlAudio.volume = this.volume;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const romanticAudio = new RomanticAudioEngine();
