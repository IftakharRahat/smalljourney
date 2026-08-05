import React, { useEffect, useRef } from 'react';

interface CanvasBackgroundProps {
  currentScene: number;
  mousePos: { x: number; y: number };
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  color: string;
}

interface FlowerPetal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  sway: number;
  swaySpeed: number;
  alpha: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
}

interface Lantern {
  x: number;
  y: number;
  size: number;
  speedY: number;
  swing: number;
  swingSpeed: number;
  alpha: number;
}

interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
}

export const CanvasBackground: React.FC<CanvasBackgroundProps> = ({ currentScene, mousePos }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial state objects
    const stars: Star[] = Array.from({ length: 140 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.4,
      alpha: Math.random(),
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      alpha: Math.random() * 0.7 + 0.3,
      maxAlpha: Math.random() * 0.8 + 0.2,
      color: '#FBBF24',
    }));

    // Romantic Falling Flower Petals across the whole background
    const petalColors = ['rgba(251, 207, 232, ', 'rgba(251, 191, 36, ', 'rgba(244, 114, 182, ', 'rgba(255, 248, 240, '];
    const flowerPetals: FlowerPetal[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 4,
      speedY: Math.random() * 0.6 + 0.3,
      speedX: Math.random() * 0.4 - 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.02 - 0.01,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.015 + 0.005,
      alpha: Math.random() * 0.5 + 0.4,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    const lanterns: Lantern[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * height * 0.8,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 0.8 + 0.4,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.02 + 0.01,
      alpha: Math.random() * 0.4 + 0.6,
    }));

    const raindrops: RainDrop[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 20 + 15,
      speed: Math.random() * 12 + 8,
      alpha: Math.random() * 0.4 + 0.2,
    }));

    // Hero Firefly Position
    let fireflyX = width * 0.5;
    let fireflyY = height * 0.5;
    let fireflyAngle = 0;

    // Shooting Star state
    let shootingStarX = -100;
    let shootingStarY = -100;
    let shootingStarSpeed = 0;
    let shootingStarActive = false;

    const triggerShootingStar = () => {
      shootingStarX = Math.random() * width * 0.7;
      shootingStarY = Math.random() * (height * 0.4);
      shootingStarSpeed = Math.random() * 12 + 10;
      shootingStarActive = true;
    };

    // Periodically spawn shooting star in Scenes 0, 1, 4
    const shootingStarInterval = setInterval(() => {
      if ([0, 1, 4, 6].includes(currentScene) && !shootingStarActive) {
        triggerShootingStar();
      }
    }, 6000);

    // Cake Constellation Points (Scene 6)
    const cakePoints = [
      { x: 0.35, y: 0.65 }, { x: 0.65, y: 0.65 },
      { x: 0.35, y: 0.50 }, { x: 0.65, y: 0.50 },
      { x: 0.40, y: 0.50 }, { x: 0.40, y: 0.40 },
      { x: 0.60, y: 0.40 }, { x: 0.60, y: 0.50 },
      { x: 0.50, y: 0.40 }, { x: 0.50, y: 0.32 },
      { x: 0.50, y: 0.28 },
    ];
    let constellationProgress = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- SCENE BACKGROUND GRADIENTS ---
      let bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      if (currentScene === 2) {
        bgGradient.addColorStop(0, '#1E1B4B');
        bgGradient.addColorStop(0.5, '#312E81');
        bgGradient.addColorStop(0.8, '#831843');
        bgGradient.addColorStop(1, '#F59E0B');
      } else if (currentScene === 5) {
        bgGradient.addColorStop(0, '#020617');
        bgGradient.addColorStop(0.6, '#0F172A');
        bgGradient.addColorStop(1, '#1E293B');
      } else {
        bgGradient.addColorStop(0, '#090D16');
        bgGradient.addColorStop(0.6, '#0F172A');
        bgGradient.addColorStop(1, '#1E1B4B');
      }
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // --- STARS RENDERING ---
      if (currentScene !== 5) {
        stars.forEach((star) => {
          star.alpha += star.twinkleSpeed;
          if (star.alpha > 1 || star.alpha < 0.2) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }
          ctx.save();
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 248, 240, ${Math.max(0, star.alpha)})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#FBBF24';
          ctx.fill();
          ctx.restore();
        });
      }

      // --- ROMANTIC FALLING FLOWER PETALS ---
      flowerPetals.forEach((petal) => {
        petal.y += petal.speedY;
        petal.sway += petal.swaySpeed;
        petal.x += Math.sin(petal.sway) * 0.8 + petal.speedX;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);

        // Draw organic curved flower petal shape
        ctx.fillStyle = `${petal.color}${petal.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FBCFE8';
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size * 0.5, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      });

      // --- SHOOTING STAR ---
      if (shootingStarActive) {
        ctx.save();
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStarX, shootingStarY);
        ctx.lineTo(shootingStarX - 80, shootingStarY - 40);
        ctx.stroke();
        ctx.restore();

        shootingStarX += shootingStarSpeed;
        shootingStarY += shootingStarSpeed * 0.5;

        if (shootingStarX > width + 100 || shootingStarY > height + 100) {
          shootingStarActive = false;
        }
      }

      // --- SCENE 4: LANTERNS ---
      if (currentScene === 4) {
        lanterns.forEach((lantern) => {
          lantern.y -= lantern.speedY;
          lantern.swing += lantern.swingSpeed;
          const currentX = lantern.x + Math.sin(lantern.swing) * 15;

          if (lantern.y < -50) {
            lantern.y = height + 50;
            lantern.x = Math.random() * width;
          }

          ctx.save();
          const lanternGlow = ctx.createRadialGradient(
            currentX, lantern.y, 2, currentX, lantern.y, lantern.size * 1.8
          );
          lanternGlow.addColorStop(0, 'rgba(251, 191, 36, 0.9)');
          lanternGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
          lanternGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');

          ctx.fillStyle = lanternGlow;
          ctx.beginPath();
          ctx.arc(currentX, lantern.y, lantern.size * 1.8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(254, 243, 199, ${lantern.alpha})`;
          ctx.beginPath();
          ctx.roundRect(
            currentX - lantern.size * 0.5,
            lantern.y - lantern.size * 0.6,
            lantern.size,
            lantern.size * 1.2,
            4
          );
          ctx.fill();
          ctx.restore();
        });
      }

      // --- SCENE 5: RAIN STREAKS ---
      if (currentScene === 5) {
        ctx.save();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.lineWidth = 1.2;
        raindrops.forEach((drop) => {
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 2, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x -= 0.5;

          if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * width;
          }
        });
        ctx.restore();
      }

      // --- FIREFLY HERO ANIMATION ---
      fireflyAngle += 0.02;
      const targetX = mousePos.x > 0 ? mousePos.x : width * 0.5 + Math.sin(fireflyAngle * 0.8) * 180;
      const targetY = mousePos.y > 0 ? mousePos.y : height * 0.4 + Math.cos(fireflyAngle * 0.5) * 120;

      fireflyX += (targetX - fireflyX) * 0.04;
      fireflyY += (targetY - fireflyY) * 0.04;

      ctx.save();
      const fireflyGlow = ctx.createRadialGradient(
        fireflyX, fireflyY, 0, fireflyX, fireflyY, 35
      );
      fireflyGlow.addColorStop(0, 'rgba(251, 191, 36, 1)');
      fireflyGlow.addColorStop(0.3, 'rgba(251, 191, 36, 0.5)');
      fireflyGlow.addColorStop(1, 'rgba(251, 191, 36, 0)');

      ctx.fillStyle = fireflyGlow;
      ctx.beginPath();
      ctx.arc(fireflyX, fireflyY, 35, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(fireflyX, fireflyY, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // --- FLOATING AMBIENT PARTICLES ---
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha * 0.6})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FBBF24';
        ctx.fill();
        ctx.restore();
      });

      // --- SCENE 6: CAKE CONSTELLATION DRAWING ---
      if (currentScene === 6) {
        if (constellationProgress < 1) {
          constellationProgress += 0.005;
        }

        ctx.save();
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.75)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);

        const maxIndex = Math.floor(constellationProgress * cakePoints.length);

        ctx.beginPath();
        for (let i = 0; i < maxIndex; i++) {
          const pt = cakePoints[i];
          const px = pt.x * width;
          const py = pt.y * height;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        for (let i = 0; i <= maxIndex && i < cakePoints.length; i++) {
          const pt = cakePoints[i];
          const px = pt.x * width;
          const py = pt.y * height;

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFF8F0';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#FBBF24';
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearInterval(shootingStarInterval);
    };
  }, [currentScene, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
};
