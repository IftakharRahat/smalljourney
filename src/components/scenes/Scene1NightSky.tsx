import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MoveHorizontal, ChevronLeft, ChevronRight, Heart, Unlock } from 'lucide-react';
import { STORY_CONFIG } from '../../config/story';
import { TypewriterText } from '../TypewriterText';
import { soundEngine } from '../../utils/audio';

interface Scene1NightSkyProps {
  onNext: () => void;
}

export const Scene1NightSky: React.FC<Scene1NightSkyProps> = ({ onNext }) => {
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const firstPhoto = STORY_CONFIG.photoScenes[0];

  const handleUnlock = () => {
    setIsUnlocked(true);
    setSwipeProgress(100);
    soundEngine.playSingleNote(1);
  };

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    if (isUnlocked) return;
    const delta = Math.abs(info.offset.x);
    setSwipeProgress((prev) => {
      const updated = Math.min(100, prev + delta * 0.25);
      if (updated >= 100 && !isUnlocked) {
        setIsUnlocked(true);
        soundEngine.playSingleNote(1);
      }
      return updated;
    });
  };

  return (
    <div className="memory-scene-shell">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl w-full shrink-0 px-1"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.3em] text-warmGold font-medium mb-1 block flex items-center justify-center gap-1">
          <span>🌸</span> Memory I — Night Sky <span>🌸</span>
        </span>
        <h2 className="font-serif text-[1.65rem] sm:text-4xl md:text-5xl font-normal text-cream leading-tight text-glow">
          "{STORY_CONFIG.scene1.quote}"
        </h2>
        <p className="mt-2 font-sans text-xs sm:text-sm text-cream/70 font-light max-w-lg mx-auto">
          {STORY_CONFIG.scene1.subtext}
        </p>
      </motion.div>

      {/* Main Interactive Swipe Zone or Revealed Photo */}
      <div className="memory-stage">
        {!isUnlocked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center"
          >
            {/* Draggable Swipe Card */}
            <motion.div
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              onDrag={handleDrag}
              onClick={handleUnlock}
              whileTap={{ scale: 1.03 }}
              className="glass-card-gold p-6 sm:p-10 rounded-3xl border border-warmGold/50 shadow-[0_0_50px_rgba(251,191,36,0.2)] max-w-md w-full cursor-pointer touch-none flex flex-col items-center justify-center space-y-4"
            >
              <div className="flex items-center space-x-3 text-warmGold animate-pulse">
                <ChevronLeft className="w-5 h-5 animate-bounce" />
                <MoveHorizontal className="w-8 h-8" />
                <ChevronRight className="w-5 h-5 animate-bounce" />
              </div>

              <span className="font-serif text-base sm:text-lg text-cream font-medium">
                Click or swipe to reveal memory... ✨
              </span>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mt-1 border border-white/10">
                <motion.div
                  className="bg-warmGold h-full shadow-[0_0_12px_#FBBF24]"
                  style={{ width: `${swipeProgress}%` }}
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnlock();
                }}
                className="mt-2 px-4 py-2 rounded-full bg-warmGold/20 border border-warmGold/40 text-warmGold text-xs font-medium flex items-center space-x-1.5 hover:bg-warmGold/30 transition-all"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Tap to Reveal Photo</span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* Revealed 1st Photo */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            {/* Floating Photo Frame */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [-1, 1, -1],
              }}
              transition={{
                y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="memory-photo-frame relative glass-card-gold p-2.5 sm:p-3.5 rounded-3xl border border-warmGold/60 shadow-[0_20px_60px_rgba(251,191,36,0.3)] overflow-hidden group"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-warmGold/30 shadow-inner">
                <img
                  src={firstPhoto.image}
                  alt={firstPhoto.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
                <div className="absolute top-2.5 left-2.5 text-xl filter drop-shadow-md">🌸</div>
              </div>
            </motion.div>

            {/* Typewriter Feeling Caption Only (No "About Picture" Card) */}
            <div className="memory-caption-card">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-card-gold p-3.5 sm:p-5 rounded-2xl border border-warmGold/50 shadow-[0_0_30px_rgba(251,191,36,0.2)] text-left"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-300/30 animate-pulse" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-softPink">
                    What it means to me
                  </span>
                </div>
                <p className="memory-typewriter-copy font-serif text-[13px] sm:text-sm md:text-base text-cream leading-relaxed font-normal text-glow">
                  <TypewriterText text={firstPhoto.feeling} speed={22} />
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="shrink-0 pb-[env(safe-area-inset-bottom)]">
        {isUnlocked && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onNext}
            className="group inline-flex max-w-full items-center space-x-2 rounded-full bg-gradient-to-r from-amber-500 to-warmGold px-6 py-3 text-xs font-medium text-midnight shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all hover:scale-105 sm:px-8 sm:text-sm"
          >
            <span>Continue to Photo 2</span>
            <ArrowRight className="w-4 h-4 text-midnight group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
