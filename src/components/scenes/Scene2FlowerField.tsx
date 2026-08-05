import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { STORY_CONFIG, FlowerNote } from '../../config/story';
import { soundEngine } from '../../utils/audio';

interface Scene2FlowerFieldProps {
  onNext: () => void;
}

interface CascadePetal {
  id: number;
  icon: string;
  x: number;
  delay: number;
}

export const Scene2FlowerField: React.FC<Scene2FlowerFieldProps> = ({ onNext }) => {
  const [openedFlowers, setOpenedFlowers] = useState<string[]>([]);
  const [activeFlower, setActiveFlower] = useState<FlowerNote | null>(null);
  const [cascadePetals, setCascadePetals] = useState<CascadePetal[]>([]);

  const handleFlowerClick = (flower: FlowerNote, index: number) => {
    soundEngine.playSingleNote(index + 2);
    if (!openedFlowers.includes(flower.id)) {
      setOpenedFlowers([...openedFlowers, flower.id]);
    }
    setActiveFlower(flower);

    // Trigger flower petal cascade shower across screen
    const icons = ['🌸', '🌺', '🌼', '🌷', '✨', '🌸'];
    const newCascade: CascadePetal[] = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      icon: icons[i % icons.length],
      x: Math.random() * 80 + 10,
      delay: Math.random() * 0.4,
    }));
    setCascadePetals(newCascade);
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
        <span className="text-xs uppercase tracking-[0.3em] text-warmGold font-medium mb-1 block flex items-center justify-center gap-1">
          <span>🌸</span> Scene II — The Flower Field <span>🌸</span>
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-cream leading-tight">
          {STORY_CONFIG.scene2.title}
        </h2>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-cream/70 font-sans px-2">
          {STORY_CONFIG.scene2.instruction}
        </p>
      </motion.div>

      {/* Flower Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl my-auto w-full px-2 sm:px-4 py-4">
        {STORY_CONFIG.scene2.flowers.map((flower, idx) => {
          const isOpened = openedFlowers.includes(flower.id);
          return (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [0, idx % 2 === 0 ? 3 : -3, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: idx * 0.1 },
                rotate: { duration: 3 + idx, repeat: Infinity, ease: 'easeInOut' },
              }}
              whileHover={{ scale: 1.06, y: -4 }}
              onClick={() => handleFlowerClick(flower, idx)}
              className={`cursor-pointer group relative p-4 sm:p-5 rounded-2xl transition-all duration-500 flex flex-col items-center justify-center ${
                isOpened
                  ? 'glass-card-gold border-warmGold/50 shadow-[0_0_30px_rgba(251,191,36,0.3)]'
                  : 'glass-card hover:border-white/30'
              }`}
            >
              <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-115 transition-transform duration-500 ease-out">
                {flower.icon}
              </div>
              <span className="font-serif text-sm sm:text-base text-cream/90 font-medium">
                {flower.flowerName}
              </span>
              <span className="text-[10px] sm:text-[11px] text-warmGold/90 mt-1 font-sans font-medium">
                {flower.poemTitle}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Overlay for 5-Line Poem */}
      <AnimatePresence>
        {activeFlower && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto"
            onClick={() => setActiveFlower(null)}
          >
            {/* Cascading Petal Shower */}
            {cascadePetals.map((petal) => (
              <motion.div
                key={petal.id}
                initial={{ y: '-10vh', x: `${petal.x}vw`, opacity: 1, scale: 0.5, rotate: 0 }}
                animate={{
                  y: '110vh',
                  x: `${petal.x + (Math.random() * 15 - 7.5)}vw`,
                  opacity: [1, 0.8, 0],
                  scale: 1.2,
                  rotate: 360,
                }}
                transition={{ duration: 3, delay: petal.delay, ease: 'easeOut' }}
                className="fixed top-0 text-3xl pointer-events-none filter drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
              >
                {petal.icon}
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full glass-card-gold p-6 sm:p-8 rounded-3xl border border-warmGold/60 text-center shadow-[0_0_60px_rgba(251,191,36,0.35)] my-auto"
            >
              <button
                onClick={() => setActiveFlower(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-cream/70 hover:text-cream border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-5xl sm:text-6xl mb-2 animate-bounce">{activeFlower.icon}</div>
              <span className="text-xs uppercase tracking-[0.25em] text-warmGold font-medium block mb-1">
                {activeFlower.flowerName}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-cream font-semibold mb-4">
                {activeFlower.poemTitle}
              </h3>

              {/* 5-Line Poetic Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-midnight/50 border border-warmGold/30">
                <p className="font-serif text-sm sm:text-base md:text-lg text-cream leading-relaxed text-glow whitespace-pre-line italic font-normal">
                  {activeFlower.text}
                </p>
              </div>

              <button
                onClick={() => setActiveFlower(null)}
                className="mt-5 px-6 py-2 rounded-full bg-warmGold/20 hover:bg-warmGold/30 border border-warmGold/40 text-warmGold text-xs font-medium transition-all"
              >
                Close Poem
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
          <span>Continue Journey</span>
          <ArrowRight className="w-4 h-4 text-midnight group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
