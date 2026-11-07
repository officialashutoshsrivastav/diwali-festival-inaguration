import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SoundEffectType } from '../hooks/useSound';
import {
  DiyaSvg,
  SparkleSvg,
  Interactive3DCard,
  Sacred3DMandala,
} from './FestiveSvgs';

interface CinematicIntroProps {
  recipientName: string;
  hasCustomName: boolean;
  onBegin: () => void;
  playSound: (effect: SoundEffectType) => void;
  enableSoundOnInteraction: () => void;
}

type IntroPhase = 'mystery1' | 'mystery2' | 'count3' | 'count2' | 'count1' | 'ready';

const DUST_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${8 + ((i * 37) % 84)}%`,
  top: `${10 + ((i * 53) % 80)}%`,
  size: (i % 3) + 2,
  opacity: 0.25 + (i % 4) * 0.15,
}));

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  recipientName,
  hasCustomName,
  onBegin,
  playSound,
  enableSoundOnInteraction,
}) => {
  const [phase, setPhase] = useState<IntroPhase>('mystery1');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('mystery2'), 800);
    const t2 = setTimeout(() => {
      setPhase('count3');
      playSound('countdown');
    }, 1500);
    const t3 = setTimeout(() => {
      setPhase('count2');
      playSound('countdown');
    }, 2200);
    const t4 = setTimeout(() => {
      setPhase('count1');
      playSound('countdown');
    }, 2900);
    const t5 = setTimeout(() => {
      setPhase('ready');
      playSound('reveal');
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [playSound]);

  const handleStartClick = () => {
    enableSoundOnInteraction();
    playSound('reveal');
    onBegin();
  };

  const countdownNumber =
    phase === 'count3' ? '3' : phase === 'count2' ? '2' : phase === 'count1' ? '1' : null;

  return (
    <section
      aria-label="Cinematic Dark Intro"
      className="relative min-h-[calc(100vh-52px)] w-full bg-[#09070F] flex flex-col items-center justify-between px-6 py-8 overflow-hidden select-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(90,15,28,0.36)_0%,rgba(246,196,83,0.09)_38%,rgba(9,7,15,0.98)_75%)]"
      />
      <Sacred3DMandala />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {DUST_PARTICLES.map((p) => (
          <span
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            className="absolute rounded-full bg-[#F6C453] shadow-[0_0_8px_#F6C453]"
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center gap-2.5 pt-2">
        <DiyaSvg className="w-5 h-5" />
        <p className="font-poppins text-xs tracking-[0.28em] text-[#F6C453]/90 font-medium">
          DIWALI GRAND INAUGURATION
        </p>
        <DiyaSvg className="w-5 h-5" />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto my-auto py-4">
        <Interactive3DCard intensity={8}>
          <div className="flex flex-col items-center justify-center text-center space-y-6 p-8 sm:p-10 rounded-3xl bg-[#09070F]/65 border border-[#F6C453]/30 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
            <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-[#FFF5E1] tracking-wide">
              “Something Special Is About To Begin...”
            </p>

            <p className="font-display text-xl sm:text-2xl md:text-3xl text-[#F6C453] tracking-wide drop-shadow-[0_0_20px_rgba(246,196,83,0.35)] text-balance">
              “A Celebration Of Light, Joy &amp; New Beginnings”
            </p>

            <div className="min-h-[140px] flex flex-col items-center justify-center pt-2">
              {countdownNumber ? (
                <motion.div
                  key={countdownNumber}
                  initial={{ scale: 0.85, opacity: 0.8 }}
                  animate={{ scale: 1.08, opacity: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <span
                    data-testid="intro-countdown-number"
                    className="font-display text-6xl sm:text-7xl md:text-8xl font-bold text-[#F6C453] tabular-nums drop-shadow-[0_0_45px_rgba(246,196,83,0.75)]"
                  >
                    {countdownNumber}
                  </span>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center gap-4 text-xs font-poppins tabular-nums tracking-[0.35em] text-[#F6C453]">
                    <span>3</span>
                    <span>·</span>
                    <span>2</span>
                    <span>·</span>
                    <span>1</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#FFF5E1] tracking-wider drop-shadow-[0_0_35px_rgba(246,196,83,0.45)]">
                    LET THE CELEBRATION BEGIN
                  </h1>
                  {hasCustomName && (
                    <p className="font-poppins text-sm sm:text-base text-[#F6C453] font-medium">
                      A bespoke royal invitation awaits {recipientName}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </Interactive3DCard>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 w-full">
        <motion.button
          type="button"
          onClick={handleStartClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#5A0F1C] via-[#781426] to-[#5A0F1C] border-2 border-[#F6C453] text-[#F6C453] font-display text-sm sm:text-base font-bold tracking-wider shadow-[0_0_35px_rgba(246,196,83,0.35)] hover:shadow-[0_0_55px_rgba(246,196,83,0.6)] transition-all duration-200 cursor-pointer flex items-center gap-3 whitespace-nowrap shrink-0"
        >
          <SparkleSvg className="w-5 h-5" />
          <span>BEGIN THE CELEBRATION</span>
          <SparkleSvg className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};
