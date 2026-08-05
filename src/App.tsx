import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CanvasBackground } from './components/CanvasBackground';
import { FloatingPhotoBackground } from './components/FloatingPhotoBackground';
import { Navbar } from './components/Navbar';
import { CursorFollower } from './components/CursorFollower';
import { Scene0Intro } from './components/scenes/Scene0Intro';
import { Scene1NightSky } from './components/scenes/Scene1NightSky';
import { ScenePhotoCard } from './components/scenes/ScenePhotoCard';
import { Scene2FlowerField } from './components/scenes/Scene2FlowerField';
import { Scene4Lanterns } from './components/scenes/Scene4Lanterns';
import { Scene5RainLetter } from './components/scenes/Scene5RainLetter';
import { Scene6Finale } from './components/scenes/Scene6Finale';
import { SarcasticAudioGate } from './components/SarcasticAudioGate';
import { soundEngine } from './utils/audio';
import { STORY_CONFIG } from './config/story';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState<boolean>(false);
  const mainRef = useRef<HTMLElement | null>(null);

  // Total scenes: 0 (Intro), 1 (NightSky + Photo 1), 2..4 (Photos 2..4), 5 (FlowerField), 6 (Lanterns 3 Wishes), 7 (RainLetter), 8 (Finale)
  const totalScenes = 9;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentScene < totalScenes - 1) {
          nextScene();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentScene > 0) {
          prevScene();
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentScene]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentScene]);

  const startExperience = () => {
    soundEngine.startAmbientPiano();
    setCurrentScene(1);
  };

  const nextScene = () => {
    soundEngine.startAmbientPiano();
    setCurrentScene((prev) => Math.min(prev + 1, totalScenes - 1));
  };

  const prevScene = () => {
    setCurrentScene((prev) => Math.max(prev - 1, 0));
  };

  const restartExperience = () => {
    setCurrentScene(0);
  };

  const toggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Map scene index to background type for CanvasBackground
  const getCanvasSceneIndex = (sceneIdx: number): number => {
    if (sceneIdx === 0 || sceneIdx === 1) return 1; // Stars
    if (sceneIdx >= 2 && sceneIdx <= 4) {
      const photoConfig = STORY_CONFIG.photoScenes[sceneIdx - 1];
      return photoConfig ? photoConfig.bgType : 1;
    }
    if (sceneIdx === 5) return 2; // Flower field sunrise
    if (sceneIdx === 6) return 4; // Lanterns
    if (sceneIdx === 7) return 5; // Rain
    if (sceneIdx === 8) return 6; // Constellation finale
    return 1;
  };

  const renderCurrentScene = () => {
    switch (currentScene) {
      case 0:
        return <Scene0Intro onNext={startExperience} />;
      case 1:
        return <Scene1NightSky onNext={nextScene} />;
      case 2:
        return (
          <ScenePhotoCard
            photoConfig={STORY_CONFIG.photoScenes[1]}
            totalPhotos={STORY_CONFIG.photoScenes.length}
            onNext={nextScene}
          />
        );
      case 3:
        return (
          <ScenePhotoCard
            photoConfig={STORY_CONFIG.photoScenes[2]}
            totalPhotos={STORY_CONFIG.photoScenes.length}
            onNext={nextScene}
          />
        );
      case 4:
        return (
          <ScenePhotoCard
            photoConfig={STORY_CONFIG.photoScenes[3]}
            totalPhotos={STORY_CONFIG.photoScenes.length}
            onNext={nextScene}
          />
        );
      case 5:
        return <Scene2FlowerField onNext={nextScene} />;
      case 6:
        return <Scene4Lanterns onNext={nextScene} />;
      case 7:
        return <Scene5RainLetter onNext={nextScene} />;
      case 8:
      default:
        return <Scene6Finale onRestart={restartExperience} />;
    }
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-midnight select-none">
      {/* Sarcastic Audio Entrance Gate */}
      <AnimatePresence>
        {!isAudioUnlocked && (
          <SarcasticAudioGate
            onUnlock={() => {
              setIsAudioUnlocked(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Dynamic Background Canvas */}
      <CanvasBackground currentScene={getCanvasSceneIndex(currentScene)} mousePos={mousePos} />

      {/* Floating Low-Opacity Background Photo */}
      <FloatingPhotoBackground currentScene={currentScene} mousePos={mousePos} />

      {/* Apple-style Cursor Light */}
      <CursorFollower />

      {/* Glass Navigation Bar */}
      <Navbar
        currentScene={currentScene}
        totalScenes={totalScenes}
        onSelectScene={(idx) => {
          soundEngine.startAmbientPiano();
          setCurrentScene(idx);
        }}
        onRestart={restartExperience}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Main Animated Scene Switcher */}
      <main ref={mainRef} className="relative z-10 h-full w-full overflow-y-auto overscroll-contain">
        <motion.div
          key={`scene-${currentScene}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="min-h-full w-full"
        >
          {renderCurrentScene()}
        </motion.div>
      </main>
    </div>
  );
};
