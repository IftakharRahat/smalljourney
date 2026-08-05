import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { STORY_CONFIG } from '../../config/story';
import { soundEngine } from '../../utils/audio';

interface Scene0IntroProps {
  onNext: () => void;
}

export const Scene0Intro: React.FC<Scene0IntroProps> = ({ onNext }) => {
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const totalLines = STORY_CONFIG.scene0.lines.length;

  useEffect(() => {
    // Sequentially reveal each line one by one with poetic timing
    const timers = [
      setTimeout(() => setVisibleCount(1), 600),   // Line 1
      setTimeout(() => setVisibleCount(2), 2600),  // Line 2
      setTimeout(() => setVisibleCount(3), 4800),  // Line 3
      setTimeout(() => setVisibleCount(4), 6600),  // Tagline & Button
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleStart = () => {
    if (visibleCount < 4) {
      // If user clicks before all lines appear, instantly reveal all lines
      setVisibleCount(4);
    } else {
      soundEngine.startAmbientPiano();
      onNext();
    }
  };

  return (
    <div
      onClick={handleStart}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 cursor-pointer overflow-y-auto py-12 select-none"
    >
      {/* Central Glowing Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative mb-8"
      >
        <div className="w-12 h-12 rounded-full bg-warmGold/20 flex items-center justify-center animate-pulse">
          <div className="w-4 h-4 rounded-full bg-warmGold shadow-[0_0_25px_#FBBF24,0_0_50px_#FBBF24]" />
        </div>
      </motion.div>

      {/* Sequential Poetic Text Lines (Appears one by one) */}
      <div className="space-y-6 max-w-3xl px-2 min-h-[220px] sm:min-h-[260px] flex flex-col justify-center">
        {STORY_CONFIG.scene0.lines.map((line, idx) => {
          const isVisible = visibleCount > idx;
          return (
            <AnimatePresence key={idx}>
              {isVisible && (
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  className={`font-serif text-2xl sm:text-4xl lg:text-5xl font-normal leading-relaxed text-glow ${
                    idx === 0
                      ? 'text-cream font-medium'
                      : idx === 1
                      ? 'text-warmGold/95'
                      : 'text-cream/90 text-xl sm:text-3xl'
                  }`}
                >
                  "{line}"
                </motion.h1>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Tagline & Action Button (Revealed after lines finish) */}
      <AnimatePresence>
        {visibleCount >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <p className="mt-8 text-xs sm:text-sm font-sans text-cream/70 tracking-widest uppercase">
              A Small Journey
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.startAmbientPiano();
                onNext();
              }}
              className="mt-8 group relative inline-flex items-center space-x-3 px-8 py-4 rounded-full glass-card-gold border border-warmGold/50 text-cream font-medium tracking-wide shadow-[0_0_30px_rgba(251,191,36,0.2)] hover:shadow-[0_0_45px_rgba(251,191,36,0.4)] transition-all duration-300"
            >
              <span>Begin the Journey</span>
              <Sparkles className="w-4 h-4 text-warmGold group-hover:rotate-12 transition-transform duration-300" />
              <ArrowRight className="w-4 h-4 text-cream/80 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
