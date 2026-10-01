import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import { STORY_CONFIG } from '../../config/story';
import { soundEngine } from '../../utils/audio';

interface Scene6FinaleProps {
  onRestart: () => void;
}

export const Scene6Finale: React.FC<Scene6FinaleProps> = ({ onRestart }) => {
  const [litCandles, setLitCandles] = useState<boolean[]>([true, true, true]);
  const [allBlownOut, setAllBlownOut] = useState<boolean>(false);

  // Multi-Stage Bombastic Fireworks & Confetti Burst
  const triggerConfetti = () => {
    const goldPinkColors = ['#FBBF24', '#FBCFE8', '#FFF8F0', '#818CF8', '#F472B6', '#E0E7FF'];

    // Stage 1: Left & Right Side Cannons
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.15, y: 0.6 },
      colors: goldPinkColors,
      startVelocity: 60,
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.85, y: 0.6 },
      colors: goldPinkColors,
      startVelocity: 60,
    });

    // Stage 2: Center Sky Starburst (300ms delay)
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { x: 0.5, y: 0.35 },
        colors: goldPinkColors,
        shapes: ['star', 'circle'],
        scalar: 1.2,
        startVelocity: 45,
      });
    }, 300);

    // Stage 3: Continuous Sparkle Glitter Shower (1.2s delay)
    setTimeout(() => {
      const end = Date.now() + 2500;
      const interval = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() * 0.4 },
          colors: ['#FBBF24', '#F472B6', '#FFF'],
          shapes: ['star'],
          scalar: 0.8,
        });
      }, 200);
    }, 1000);
  };

  const blowCandle = (index: number) => {
    const newCandles = [...litCandles];
    newCandles[index] = false;
    setLitCandles(newCandles);

    if (newCandles.every((c) => !c) && !allBlownOut) {
      setAllBlownOut(true);
      triggerConfetti();
      soundEngine.playHappyBirthdayMelody();
    }
  };

  const blowAllCandles = () => {
    setLitCandles([false, false, false]);
    setAllBlownOut(true);
    triggerConfetti();
    soundEngine.playHappyBirthdayMelody();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 py-12 sm:py-16 text-center z-10 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="max-w-xl mt-4 sm:mt-0"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-warmGold font-medium mb-2 block flex items-center justify-center gap-1">
          <span>✨</span> Finale — The Grand Constellation <span>✨</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-cream text-glow leading-tight">
          {STORY_CONFIG.finale.birthdayWish}
        </h1>
      </motion.div>

      {/* Bloomy Birthday Cake Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className={`my-6 max-w-md w-full glass-card-gold p-6 sm:p-8 rounded-3xl border transition-all duration-700 text-center relative overflow-hidden ${
          allBlownOut
            ? 'border-warmGold shadow-[0_0_90px_rgba(251,191,36,0.45),0_0_150px_rgba(244,114,182,0.3)]'
            : 'border-warmGold/40 shadow-[0_0_50px_rgba(251,191,36,0.2)]'
        }`}
      >
        {/* Ambient Radiant Glow Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/10 animate-pulse pointer-events-none" />

        <h3 className="font-serif text-xl sm:text-2xl text-cream font-medium mb-2 relative z-10">
          {allBlownOut ? '🎉 Make Your Birthday Wish! 🎉' : 'Blow out the birthday candles! 🎂'}
        </h3>
        <p className="text-xs text-cream/80 font-sans mb-6 relative z-10">
          {allBlownOut
            ? '✨ All 3 candles blown! Your birthday wish is officially registered in the sky ✨'
            : 'Click on each candle flame below to blow it out'}
        </p>

        {/* Cake Container */}
        <div className="relative w-52 h-48 mx-auto flex flex-col items-center justify-end mb-6 select-none relative z-10">
          {/* Radiant Aura Ring Behind Cake */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-t from-warmGold/30 via-pink-400/20 to-transparent animate-pulse" />

          {/* 3 Candles */}
          <div className="flex justify-between w-36 mb-1 px-2 z-20">
            {litCandles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => blowCandle(idx)}
                className="cursor-pointer group flex flex-col items-center"
                title="Click candle to blow out"
              >
                {/* Flame */}
                {isLit ? (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [-5, 5, -5] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-6 h-8 flex items-center justify-center"
                  >
                    <div className="w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-warmGold to-yellow-100 shadow-[0_0_20px_#FBBF24,0_0_40px_#FBBF24,0_0_60px_#F472B6]" />
                  </motion.div>
                ) : (
                  /* Smoke Puff + Sparkle Shockwave */
                  <motion.div
                    initial={{ opacity: 1, y: 0, scale: 0.5 }}
                    animate={{ opacity: 0, y: -25, scale: 1.8 }}
                    transition={{ duration: 1.6 }}
                    className="w-5 h-5 text-sm flex items-center justify-center"
                  >
                    ✨
                  </motion.div>
                )}
                {/* Candle Stick */}
                <div className="w-3 h-11 bg-gradient-to-b from-pink-300 via-amber-200 to-amber-300 rounded-t-sm shadow-md border border-white/30" />
              </div>
            ))}
          </div>

          {/* Cake Layers */}
          <motion.div
            animate={allBlownOut ? { scale: [1, 1.04, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-48 h-15 bg-gradient-to-r from-amber-500/40 via-warmGold/50 to-amber-500/40 border border-warmGold/60 rounded-t-2xl backdrop-blur-md shadow-xl flex items-center justify-center relative"
          >
            <div className="absolute top-1 left-3 right-3 h-2 rounded-full bg-cream/40" />
            <span className="text-2xl">🌸 ✨ 🌸</span>
          </motion.div>

          <div className="w-56 h-18 bg-gradient-to-r from-amber-600/50 via-amber-400/40 to-amber-600/50 border border-warmGold/50 rounded-b-2xl backdrop-blur-md shadow-2xl flex items-center justify-center relative">
            <span className="text-2xl sm:text-3xl">🍰 🍓 🍰</span>
          </div>
        </div>

        {/* Blow All / Unlocked Button */}
        {!allBlownOut ? (
          <button
            onClick={blowAllCandles}
            className="relative z-10 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-warmGold to-amber-400 text-midnight font-semibold text-xs sm:text-sm hover:scale-108 transition-all shadow-[0_0_30px_rgba(251,191,36,0.5)] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-midnight animate-spin" />
            <span>Blow Out All Candles 🎂</span>
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative z-10 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-warmGold/25 border border-warmGold text-warmGold text-xs sm:text-sm font-semibold shadow-[0_0_30px_rgba(251,191,36,0.4)]"
          >
            <span>🎆 Birthday Wish & Magic Unlocked! 🎆</span>
          </motion.div>
        )}
      </motion.div>

      {/* Conclusion Birthday Wish Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="max-w-xl w-full glass-card-gold p-6 sm:p-8 rounded-3xl border border-warmGold/50 text-center shadow-[0_0_40px_rgba(251,191,36,0.2)] my-6"
      >
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-warmGold animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-warmGold font-medium">
            A Birthday Wish For You
          </span>
          <Sparkles className="w-4 h-4 text-warmGold animate-pulse" />
        </div>

        <p className="font-serif text-lg sm:text-2xl text-cream leading-relaxed font-normal text-glow">
          "{STORY_CONFIG.finale.birthdayWish}"
        </p>
      </motion.div>

      {/* Replay Journey Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-4 mb-6"
      >
        <button
          onClick={onRestart}
          className="group inline-flex items-center space-x-2 px-6 py-3 rounded-full glass-card border border-white/20 text-cream text-xs sm:text-sm font-medium hover:border-warmGold/40 hover:scale-105 transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 text-warmGold group-hover:-rotate-90 transition-transform" />
          <span>Replay Journey</span>
        </button>
      </motion.div>
    </div>
  );
};
