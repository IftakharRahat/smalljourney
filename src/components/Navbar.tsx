import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, RotateCcw, Music } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { STORY_CONFIG } from '../config/story';

interface NavbarProps {
  currentScene: number;
  totalScenes: number;
  onSelectScene: (sceneIndex: number) => void;
  onRestart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScene,
  totalScenes,
  onSelectScene,
  onRestart,
  isMuted,
  onToggleMute,
}) => {
  const [volume, setVolume] = useState<number>(0.85);

  const sceneNames = [
    'Intro',
    'Memory I (Learning To Walk Alone)',
    'Memory II (My Forever Watch Partner)',
    'Memory III (My Unpaid Life Consultant)',
    'Memory IV (Watching You Build Your Life)',
    'The Flower Field (Sisterly Notes)',
    'Sky Lanterns (5 Wishes)',
    'A Letter For Pubu',
    '🎂 Birthday Cake & Wish',
  ];

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setMasterVolume(val);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 transition-all duration-300">
      {/* Brand / Logo */}
      <div
        onClick={() => onSelectScene(0)}
        className="flex items-center space-x-2 glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 backdrop-blur-md cursor-pointer hover:border-warmGold/40 transition-all"
      >
        <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-warmGold animate-pulse" />
        <span className="text-xs sm:text-sm font-medium tracking-wide text-cream/90 font-serif">
          A Small Journey
        </span>
      </div>

      {/* Center Navigation Dots (Always Visible) */}
      <nav className="flex items-center space-x-1.5 sm:space-x-2.5 glass-panel px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 backdrop-blur-md">
        {Array.from({ length: totalScenes }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSelectScene(index)}
            title={sceneNames[index]}
            className={`group relative flex items-center justify-center transition-all duration-300 ${
              currentScene === index
                ? 'w-5 sm:w-7 h-2 sm:h-2.5 bg-warmGold rounded-full shadow-[0_0_12px_#FBBF24]'
                : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/30 hover:bg-white/70 rounded-full'
            }`}
          >
            {/* Tooltip on Hover */}
            <span className="hidden sm:block absolute -bottom-8 scale-0 group-hover:scale-100 transition-all duration-200 text-[10px] font-sans px-2.5 py-1 rounded-md bg-midnight/95 text-cream whitespace-nowrap pointer-events-none border border-warmGold/30 shadow-lg">
              {sceneNames[index]}
            </span>
          </button>
        ))}
      </nav>

      {/* Controls: Mute & Volume */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {currentScene > 0 && (
          <button
            onClick={onRestart}
            title="Restart Experience"
            className="p-2 sm:p-2.5 rounded-full glass-panel hover:bg-white/15 transition-all duration-300 border border-white/10 text-cream/80 hover:text-cream"
          >
            <RotateCcw className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </button>
        )}

        <div className="flex items-center space-x-2 glass-panel px-3 py-1.5 sm:py-2 rounded-full border border-white/10">
          <button
            onClick={onToggleMute}
            className={`flex items-center space-x-1.5 transition-all duration-300 ${
              !isMuted ? 'text-warmGold' : 'text-cream/70 hover:text-cream'
            }`}
          >
            {!isMuted ? (
              <Volume2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-warmGold animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cream/60" />
            )}
            <div className="hidden lg:flex flex-col text-left leading-tight pr-1">
              <span className="text-[10px] text-warmGold/80 font-medium uppercase tracking-wider flex items-center gap-1">
                <Music className="w-2.5 h-2.5" /> Now Playing
              </span>
              <span className="text-xs font-serif text-cream font-medium truncate max-w-[130px]">
                {STORY_CONFIG.theme.musicTrack}
              </span>
            </div>
          </button>

          {!isMuted && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-12 sm:w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-warmGold"
              title="Adjust Volume"
            />
          )}
        </div>
      </div>
    </header>
  );
};
