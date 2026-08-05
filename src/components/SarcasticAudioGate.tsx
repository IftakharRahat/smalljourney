import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Music, Lock } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface SarcasticAudioGateProps {
  onUnlock: () => void;
}

export const SarcasticAudioGate: React.FC<SarcasticAudioGateProps> = ({ onUnlock }) => {
  const handlePlayAndUnlock = () => {
    soundEngine.startAmbientPiano();
    onUnlock();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-xl select-none overflow-hidden"
    >
      {/* Soft Ambient Glowing Background Blur Blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-warmGold/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] rounded-full bg-softPink/10 blur-[90px] pointer-events-none" />

      {/* Sarcastic Card Container */}
      <motion.div
        initial={{ scale: 0.88, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative max-w-lg w-full glass-card p-6 sm:p-10 rounded-3xl border border-warmGold/30 text-center shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* Top Decorative Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-warmGold/15 border border-warmGold/30 text-warmGold text-xs font-medium mb-6 animate-bounce">
          <span>🙄 Browser Trust Issues Alert</span>
        </div>

        {/* Animated Disc / Lock Icon */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-warmGold/20 animate-ping opacity-75" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-warmGold/30 to-amber-500/20 border border-warmGold/40 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.3)]">
            <Music className="w-9 h-9 text-warmGold animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-midnight p-1.5 rounded-full border border-warmGold/40 text-warmGold">
            <Lock className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Sarcastic Heading & Copy */}
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-cream mb-3 leading-snug">
          Blame your browser 🙄
        </h2>

        <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed mb-8 px-2">
          Your browser thinks background music is a serious crime! 
          So you <span className="text-warmGold font-semibold">MUST</span> click this button to give Chrome permission to play the music & render your birthday journey ✨
        </p>

        {/* Glowing Sarcastic Action Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handlePlayAndUnlock}
          className="group relative w-full py-4 px-6 rounded-full bg-gradient-to-r from-amber-500 via-warmGold to-amber-400 text-midnight font-medium font-sans text-base sm:text-lg shadow-[0_0_35px_rgba(251,191,36,0.4)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] transition-all duration-300 flex items-center justify-center space-x-3 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-midnight text-midnight group-hover:scale-110 transition-transform duration-300" />
          <span>Press play & open the journey 🎶</span>
          <Sparkles className="w-5 h-5 text-midnight group-hover:rotate-12 transition-transform duration-300" />
        </motion.button>

        {/* Small Footnote */}
        <p className="mt-4 text-[11px] text-cream/50 uppercase tracking-widest">
          Promise it's worth the extra click 💖
        </p>
      </motion.div>
    </motion.div>
  );
};
