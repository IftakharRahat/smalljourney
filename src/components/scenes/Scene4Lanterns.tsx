import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowRight, X, Heart } from 'lucide-react';
import { STORY_CONFIG, LanternWish } from '../../config/story';
import { TypewriterText } from '../TypewriterText';
import { soundEngine } from '../../utils/audio';

interface Scene4LanternsProps {
  onNext: () => void;
}

export const Scene4Lanterns: React.FC<Scene4LanternsProps> = ({ onNext }) => {
  const [releasedLanterns, setReleasedLanterns] = useState<string[]>([]);
  const [currentWish, setCurrentWish] = useState<LanternWish | null>(null);

  const handleReleaseLantern = (lantern: LanternWish, index: number) => {
    soundEngine.playSingleNote(index + 3);
    if (!releasedLanterns.includes(lantern.id)) {
      setReleasedLanterns([...releasedLanterns, lantern.id]);
    }
    setCurrentWish(lantern);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-4 sm:px-6 pt-16 sm:pt-20 pb-6 text-center z-10 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl shrink-0"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-warmGold font-medium mb-1 block">
          Scene IV — The Lantern Sky
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-normal text-cream leading-tight">
          {STORY_CONFIG.scene4.title}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-cream/70 font-sans px-2">
          {STORY_CONFIG.scene4.instruction}
        </p>
      </motion.div>

      {/* 3 Interactive Lantern Buttons ONLY */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 max-w-2xl my-auto w-full px-2 sm:px-4 py-4">
        {STORY_CONFIG.scene4.lanterns.map((lantern, idx) => {
          const isReleased = releasedLanterns.includes(lantern.id);
          return (
            <motion.button
              key={lantern.id}
              initial={{ y: 0 }}
              animate={{ y: isReleased ? -60 : [0, -6, 0] }}
              transition={
                isReleased
                  ? { duration: 1.8, ease: 'easeOut' }
                  : { duration: 3.5 + idx, repeat: Infinity, ease: 'easeInOut' }
              }
              whileHover={{ scale: 1.08 }}
              onClick={() => handleReleaseLantern(lantern, idx)}
              className={`relative flex flex-col items-center p-5 sm:p-7 rounded-2xl border transition-all duration-500 min-w-[140px] sm:min-w-[170px] cursor-pointer ${
                isReleased
                  ? 'glass-card-gold border-warmGold/60 shadow-[0_0_35px_rgba(251,191,36,0.4)]'
                  : 'glass-card border-white/20 hover:border-warmGold/40'
              }`}
            >
              <div className="relative mb-2">
                <Flame className={`w-8 sm:w-10 h-8 sm:h-10 ${isReleased ? 'text-warmGold animate-bounce' : 'text-amber-400/80'}`} />
                <div className="absolute inset-0 rounded-full blur-md bg-warmGold/30" />
              </div>

              <span className="font-serif text-sm sm:text-base text-cream/90 font-medium">
                {lantern.title || `Wish #${idx + 1}`}
              </span>
              <span className="text-[10px] sm:text-[11px] text-warmGold/90 mt-1 font-sans font-medium">
                {isReleased ? 'Floating Up ✨' : 'Click to launch'}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Current Wish Modal Overlay with Illustration Picture */}
      <AnimatePresence>
        {currentWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto"
            onClick={() => setCurrentWish(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm sm:max-w-md w-full glass-card-gold p-5 sm:p-7 rounded-3xl border border-warmGold/60 text-center shadow-[0_0_60px_rgba(251,191,36,0.35)] my-auto"
            >
              <button
                onClick={() => setCurrentWish(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-cream/70 hover:text-cream border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Illustration Image popping up */}
              {currentWish.image && (
                <div className="relative w-full aspect-[4/5] max-w-[240px] sm:max-w-[270px] mx-auto mb-4 rounded-2xl overflow-hidden border border-warmGold/40 shadow-xl">
                  <img
                    src={currentWish.image}
                    alt={currentWish.title || 'Wish illustration'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
                </div>
              )}

              {/* Wish Caption with Typewriter Effect */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-midnight/50 border border-warmGold/30">
                <div className="flex items-center justify-center space-x-1.5 mb-1 text-softPink">
                  <Heart className="w-3.5 h-3.5 fill-pink-300/40" />
                  <span className="text-[10px] font-medium uppercase tracking-widest">
                    {currentWish.title || 'Special Wish'}
                  </span>
                </div>
                <p className="font-serif text-sm sm:text-base text-cream leading-relaxed text-glow min-h-[50px]">
                  <TypewriterText text={currentWish.wish} speed={25} />
                </p>
              </div>

              <button
                onClick={() => setCurrentWish(null)}
                className="mt-4 px-6 py-2 rounded-full bg-warmGold/20 hover:bg-warmGold/30 border border-warmGold/40 text-warmGold text-xs font-medium transition-all"
              >
                Close Wish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="shrink-0 my-2"
      >
        <button
          onClick={onNext}
          className="group inline-flex items-center space-x-2 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-warmGold text-midnight font-medium text-xs sm:text-sm hover:scale-105 shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all duration-300 cursor-pointer"
        >
          <span>Listen to the Rain</span>
          <ArrowRight className="w-4 h-4 text-midnight group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
