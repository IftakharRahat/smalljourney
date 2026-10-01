// Global singleton to prevent duplicate audio playback during HMR or multiple instances
declare global {
  interface Window {
    __GLOBAL_BG_AUDIO__?: HTMLAudioElement;
    __AUDIO_BROADCAST_CHANNEL__?: BroadcastChannel;
  }
}

class SoundEngine {
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.85;
  private tabId: string = Math.random().toString(36).substring(2, 9);
  private channel: BroadcastChannel | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      // 1. Setup cross-tab coordinator via BroadcastChannel so only 1 tab plays audio at a time
      try {
        if ('BroadcastChannel' in window) {
          if (!window.__AUDIO_BROADCAST_CHANNEL__) {
            window.__AUDIO_BROADCAST_CHANNEL__ = new BroadcastChannel('small_journey_audio_sync');
          }
          this.channel = window.__AUDIO_BROADCAST_CHANNEL__;

          this.channel.onmessage = (event) => {
            if (event.data?.type === 'PLAYING_AUDIO' && event.data?.senderTabId !== this.tabId) {
              // Another tab is playing! Pause this tab to avoid double sound
              console.log('[SoundEngine] Pausing audio because another tab is playing');
              this.pauseInternal();
            }
          };
        }
      } catch (e) {
        // Fallback silently if BroadcastChannel is restricted
      }

      // 2. Pause audio when tab is backgrounded / hidden to avoid overlapping with active tab
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          // Tab became hidden; don't fight with other active tabs
        }
      });
    }
  }

  private getOrCreateAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;

    // Use global singleton on window so HMR or multiple module instances never duplicate
    if (!window.__GLOBAL_BG_AUDIO__) {
      const audio = new Audio('/audio/baarish-mein-phir.mp4');
      audio.loop = true;
      audio.volume = this.currentVolume;
      audio.preload = 'auto';
      window.__GLOBAL_BG_AUDIO__ = audio;
    }

    return window.__GLOBAL_BG_AUDIO__;
  }

  public startAmbientPiano() {
    if (typeof window === 'undefined') return;

    const audio = this.getOrCreateAudio();
    if (!audio) return;

    this.isPlaying = true;

    // Broadcast to other open tabs to pause their sound
    if (this.channel) {
      try {
        this.channel.postMessage({ type: 'PLAYING_AUDIO', senderTabId: this.tabId });
      } catch (_) {}
    }

    if (!this.isMuted) {
      audio.volume = this.currentVolume;
      // If already playing, DO NOT trigger play again
      if (audio.paused) {
        audio.play().catch((err) => {
          console.warn('[SoundEngine] Play blocked:', err);
        });
      }
    }
  }

  private pauseInternal() {
    const audio = window.__GLOBAL_BG_AUDIO__;
    if (audio && !audio.paused) {
      audio.pause();
    }
  }

  public setMasterVolume(val: number) {
    this.currentVolume = Math.max(0, Math.min(1, val));
    const audio = window.__GLOBAL_BG_AUDIO__;
    if (audio) {
      audio.volume = this.isMuted ? 0 : this.currentVolume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    const audio = window.__GLOBAL_BG_AUDIO__;

    if (audio) {
      if (this.isMuted) {
        audio.pause();
      } else {
        audio.volume = this.currentVolume;
        audio.play().catch(() => {});
        if (this.channel) {
          try {
            this.channel.postMessage({ type: 'PLAYING_AUDIO', senderTabId: this.tabId });
          } catch (_) {}
        }
      }
    }

    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  public playSingleNote(_freqIndex?: number) {}
  public playHappyBirthdayMelody() {}
  public setRainVolume(_volume: number) {}

  public stopAll() {
    this.isPlaying = false;
    const audio = window.__GLOBAL_BG_AUDIO__;
    if (audio) {
      audio.pause();
    }
  }
}

export const soundEngine = new SoundEngine();
