import React, { useEffect, useState, useRef } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  rotation: number;
  symbol: string;
}

export const CursorFollower: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const lastPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const symbols = ['✨', '⭐', '✦', '‧₊˚', '⋆'];

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const dist = Math.hypot(e.clientX - lastPosRef.current.x, e.clientY - lastPosRef.current.y);
      if (dist > 25) {
        lastPosRef.current = { x: e.clientX, y: e.clientY };

        const newSparkle: SparkleParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() * 20 - 10),
          y: e.clientY + (Math.random() * 20 - 10),
          size: Math.random() * 12 + 10,
          alpha: 1,
          rotation: Math.random() * 360,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        };

        setSparkles((prev) => [...prev.slice(-15), newSparkle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fade out sparkles over time
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((s) => ({ ...s, alpha: s.alpha - 0.08, y: s.y - 1.5 }))
          .filter((s) => s.alpha > 0)
      );
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Soft Ambient Cursor Light Glow */}
      <div
        className="fixed pointer-events-none z-40 transition-transform duration-75 ease-out rounded-full"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '320px',
          height: '320px',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(251, 191, 36, 0.12) 0%, rgba(244, 114, 182, 0.04) 45%, transparent 70%)',
          filter: 'blur(25px)',
        }}
      />

      {/* Sparkle Particles Trail */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="absolute transition-opacity duration-300 select-none drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            style={{
              left: `${sparkle.x}px`,
              top: `${sparkle.y}px`,
              fontSize: `${sparkle.size}px`,
              opacity: sparkle.alpha,
              transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
              color: '#FBBF24',
            }}
          >
            {sparkle.symbol}
          </span>
        ))}
      </div>
    </>
  );
};
