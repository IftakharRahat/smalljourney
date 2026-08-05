import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORY_CONFIG } from '../config/story';

interface FloatingPhotoBackgroundProps {
  currentScene: number;
  mousePos: { x: number; y: number };
}

export const FloatingPhotoBackground: React.FC<FloatingPhotoBackgroundProps> = ({
  currentScene,
  mousePos,
}) => {
  // Determine which photo image to show based on the scene index
  const getPhotoImage = (sceneIdx: number): string => {
    if (sceneIdx >= 1 && sceneIdx <= 4) {
      // Photo scenes 1..4 map directly
      const photoConfig = STORY_CONFIG.photoScenes[sceneIdx - 1];
      if (photoConfig?.image) return photoConfig.image;
    }
    // Default hero photo for intro, finale, rain, lanterns, flower field
    return '/photos/her-photo-1.jpg';
  };

  const currentPhoto = getPhotoImage(currentScene);

  // Parallax offsets based on mouse position
  const parallaxX = typeof window !== 'undefined' ? (mousePos.x - window.innerWidth / 2) * 0.035 : 0;
  const parallaxY = typeof window !== 'undefined' ? (mousePos.y - window.innerHeight / 2) * 0.035 : 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhoto}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Main Floating Low-Opacity Portrait (Centered Right / Ambient background) */}
          <motion.div
            animate={{
              y: [-18, 18, -18],
              x: [parallaxX - 10, parallaxX + 10, parallaxX - 10],
              rotate: [-2, 2.5, -2],
              scale: [1, 1.04, 1],
            }}
            transition={{
              y: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              x: parallaxX,
              y: parallaxY,
            }}
            className="absolute right-[5%] sm:right-[10%] top-[12%] sm:top-[15%] w-[320px] sm:w-[460px] md:w-[540px] h-[420px] sm:h-[580px] md:h-[680px] rounded-[40px] opacity-20 filter blur-[1px] mix-blend-screen"
          >
            {/* Radial Vignette Mask so edges blend smoothly into space */}
            <div
              className="w-full h-full rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(251,191,36,0.15)] border border-warmGold/20"
              style={{
                WebkitMaskImage:
                  'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0) 90%)',
                maskImage:
                  'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 35%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0) 90%)',
              }}
            >
              <img
                src={currentPhoto}
                alt="Floating Background Portrait"
                className="w-full h-full object-cover object-center filter brightness-110 contrast-105"
              />
            </div>
          </motion.div>

          {/* Secondary Ambient Accent Photo (Left side, lower opacity & counter floating) */}
          <motion.div
            animate={{
              y: [15, -15, 15],
              x: [-parallaxX * 0.5 - 8, -parallaxX * 0.5 + 8, -parallaxX * 0.5 - 8],
              rotate: [3, -3, 3],
            }}
            transition={{
              y: { duration: 16, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute left-[3%] bottom-[10%] w-[220px] sm:w-[320px] h-[280px] sm:h-[400px] rounded-[30px] opacity-15 filter blur-[2px] hidden lg:block"
          >
            <div
              className="w-full h-full rounded-[30px] overflow-hidden shadow-[0_0_60px_rgba(251,207,232,0.12)] border border-softPink/15"
              style={{
                WebkitMaskImage:
                  'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0) 85%)',
                maskImage:
                  'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0) 85%)',
              }}
            >
              <img
                src="/photos/her-photo-3.jpg"
                alt="Floating Ambient Portrait"
                className="w-full h-full object-cover object-center filter brightness-105"
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
