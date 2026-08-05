class SoundEngine {
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.85;
  private audio: HTMLAudioElement | null = null;

  public startAmbientPiano() {
    if (typeof window === 'undefined') return;

    if (!this.audio) {
      this.audio = new Audio('/audio/baarish-mein-phir.mp4');
      this.audio.loop = true;
      this.audio.volume = this.currentVolume;
      this.audio.preload = 'auto';
    }

    this.isPlaying = true;

    if (!this.isMuted) {
      this.audio.volume = this.currentVolume;
      if (this.audio.paused) {
        this.audio.play().catch((err) => {
          console.warn('[SoundEngine] Play blocked:', err);
        });
      }
    }
  }

  public setMasterVolume(val: number) {
    this.currentVolume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : this.currentVolume;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;

    if (this.audio) {
      if (this.isMuted) {
        this.audio.pause();
      } else {
        this.audio.volume = this.currentVolume;
        this.audio.play().catch(() => {});
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
    if (this.audio) {
      this.audio.pause();
    }
  }
}

export const soundEngine = new SoundEngine();
