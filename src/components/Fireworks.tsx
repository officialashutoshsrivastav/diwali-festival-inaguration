import React, { useEffect, useRef, useCallback } from 'react';
import { SoundEffectType } from '../hooks/useSound';

interface FireworksProps {
  active: boolean;
  burstTriggerCount: number;
  playSound: (effect: SoundEffectType) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
}

const FESTIVE_COLORS = [
  '#F6C453',
  '#FF8A3D',
  '#7C3AED',
  '#E11D48',
  '#FFF5E1',
];

export const Fireworks: React.FC<FireworksProps> = ({
  active,
  burstTriggerCount,
  playSound,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);
  const playSoundRef = useRef(playSound);

  useEffect(() => {
    playSoundRef.current = playSound;
  }, [playSound]);

  const startLoopIfNeeded = useCallback(() => {
    if (animIdRef.current !== null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const list = particlesRef.current;
      if (list.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animIdRef.current = null;
        return;
      }

      ctx.fillStyle = 'rgba(9, 7, 15, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0.03) {
          list.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animIdRef.current = requestAnimationFrame(render);
    };

    animIdRef.current = requestAnimationFrame(render);
  }, []);

  const spawnExplosion = useCallback(
    (normX?: number, normY?: number, particleCount = 56) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (canvas.parentElement) {
        const targetW = canvas.parentElement.clientWidth || 1200;
        const targetH = canvas.parentElement.clientHeight || 620;
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }
      }

      const x =
        normX !== undefined
          ? normX * canvas.width
          : (0.2 + Math.random() * 0.6) * canvas.width;
      const y =
        normY !== undefined
          ? normY * canvas.height
          : (0.18 + Math.random() * 0.42) * canvas.height;

      const primaryColor =
        FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];
      const secondaryColor = '#F6C453';

      for (let i = 0; i < particleCount; i++) {
        const angle =
          (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.2;
        const speed = 1.8 + Math.random() * 4.8;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.022 + Math.random() * 0.018,
          color: i % 3 === 0 ? secondaryColor : primaryColor,
          size: 2 + Math.random() * 2,
        });
      }

      if (particlesRef.current.length > 320) {
        particlesRef.current.splice(0, particlesRef.current.length - 320);
      }

      startLoopIfNeeded();
    },
    [startLoopIfNeeded]
  );

  useEffect(() => {
    if (!active && burstTriggerCount === 0) return;

    spawnExplosion(0.5, 0.28, 75);
    playSoundRef.current('firework');

    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = [
      { delay: 350, x: 0.28, y: 0.34 },
      { delay: 700, x: 0.72, y: 0.3 },
      { delay: 1100, x: 0.42, y: 0.22 },
      { delay: 1500, x: 0.62, y: 0.36 },
    ];

    schedule.forEach((item) => {
      const t = setTimeout(() => {
        spawnExplosion(item.x, item.y, 54);
        playSoundRef.current('firework');
      }, item.delay);
      timers.push(t);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active, burstTriggerCount, spawnExplosion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas.parentElement) {
      canvas.width = canvas.parentElement.clientWidth || 1200;
      canvas.height = canvas.parentElement.clientHeight || 620;
    }
    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
        animIdRef.current = null;
      }
    };
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width;
    const normY = (e.clientY - rect.top) / rect.height;
    spawnExplosion(normX, normY, 64);
    playSound('firework');
  };

  return (
    <canvas
      ref={canvasRef}
      data-testid="fireworks-canvas"
      onClick={handleCanvasClick}
      className="absolute inset-0 w-full h-full cursor-crosshair"
    />
  );
};
