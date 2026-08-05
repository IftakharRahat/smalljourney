import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { PhotoSceneConfig } from '../../config/story';
import { TypewriterText } from '../TypewriterText';

interface ScenePhotoCardProps {
  photoConfig: PhotoSceneConfig;
  totalPhotos: number;
  onNext: () => void;
}

export const ScenePhotoCard: React.FC<ScenePhotoCardProps> = ({ photoConfig, totalPhotos, onNext }) => {
  return (
    <div className="memory-scene-shell">
      {/* Header Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full shrink-0 px-1"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.3em] text-warmGold font-medium mb-1 block flex items-center justify-center gap-1">
          <span>🌸</span> {photoConfig.tag} ({photoConfig.photoNumber} of {totalPhotos}) <span>🌸</span>
        </span>
        <h2 className="font-serif text-[1.65rem] sm:text-4xl font-normal text-cream leading-tight">
          {photoConfig.title}
        </h2>
      </motion.div>

      {/* Main Floating Photo & Typewriter Caption */}
      <div className="memory-stage">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
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
            className="memory-photo-frame relative glass-card-gold p-2.5 sm:p-3.5 rounded-3xl border border-warmGold/50 shadow-[0_15px_45px_rgba(251,191,36,0.25)] overflow-hidden group"
          >
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-warmGold/30 shadow-inner">
              <img
                src={photoConfig.image}
                alt={photoConfig.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />
              <div className="absolute top-2.5 left-2.5 text-lg filter drop-shadow-md">🌸</div>
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
                <TypewriterText text={photoConfig.feeling} speed={22} />
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="shrink-0 pb-[env(safe-area-inset-bottom)]"
      >
        <button
          onClick={onNext}
          className="group inline-flex max-w-full items-center space-x-2 rounded-full bg-gradient-to-r from-amber-500 to-warmGold px-6 py-3 text-xs font-medium text-midnight shadow-[0_0_25px_rgba(251,191,36,0.3)] transition-all duration-300 hover:scale-105 sm:px-8 sm:text-sm cursor-pointer"
        >
          <span>
            {photoConfig.photoNumber < totalPhotos
              ? `Continue to Photo ${photoConfig.photoNumber + 1}`
              : 'Continue to Flower Field'}
          </span>
          <ArrowRight className="w-4 h-4 text-midnight group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
