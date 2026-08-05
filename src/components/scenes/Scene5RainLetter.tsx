import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Sparkles, ArrowRight } from 'lucide-react';
import { STORY_CONFIG } from '../../config/story';
import { soundEngine } from '../../utils/audio';

interface Scene5RainLetterProps {
  onNext: () => void;
}

export const Scene5RainLetter: React.FC<Scene5RainLetterProps> = ({ onNext }) => {
  useEffect(() => {
    // Start ambient rain sound
    soundEngine.setRainVolume(0.5);

    return () => {
      soundEngine.setRainVolume(0);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-6 py-16 text-center z-10">
      {/* Rain Atmosphere Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center space-x-2 glass-panel px-4 py-1.5 rounded-full border border-white/10 text-xs text-cream/70"
      >
        <CloudRain className="w-4 h-4 text-blue-300 animate-pulse" />
        <span>Gentle Rain Ambient</span>
      </motion.div>

      {/* Unfolding Handwritten Letter Parchment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="max-w-2xl w-full my-auto glass-card p-8 md:p-12 rounded-3xl border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.6)] text-left relative overflow-hidden"
      >
        {/* Subtle Watermark Sparkle */}
        <Sparkles className="absolute top-6 right-6 w-6 h-6 text-warmGold/20" />

        <div className="space-y-6 font-handwriting text-2xl md:text-3xl text-cream/90 leading-relaxed font-normal tracking-wide">
          {STORY_CONFIG.scene5.letterLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 + idx * 0.4 }}
              className={line.includes('Happy Birthday') ? 'text-warmGold font-semibold text-3xl md:text-4xl my-4 text-glow' : ''}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Continue Button to Finale */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="mt-6"
      >
        <button
          onClick={onNext}
          className="group inline-flex items-center space-x-2 px-8 py-3.5 rounded-full glass-card-gold border border-warmGold/40 text-cream text-sm font-medium hover:scale-105 shadow-[0_0_25px_rgba(251,191,36,0.2)] transition-all duration-300"
        >
          <span>Watch the Sky</span>
          <ArrowRight className="w-4 h-4 text-warmGold group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
