import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SoundEffectType } from '../hooks/useSound';
import {
  SparkleSvg,
  ArrowRightSvg,
  Interactive3DCard,
  Sacred3DMandala,
} from './FestiveSvgs';

interface PersonalizedRevealProps {
  uppercaseName: string;
  onComplete: () => void;
  playSound: (effect: SoundEffectType) => void;
}

const SPARKLE_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${10 + ((i * 39) % 80)}%`,
  top: `${15 + ((i * 47) % 70)}%`,
  opacity: 0.3 + (i % 4) * 0.15,
}));

export const PersonalizedReveal: React.FC<PersonalizedRevealProps> = ({
  uppercaseName,
  onComplete,
  playSound,
}) => {
  const [revealed, setRevealed] = useState<boolean>(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setRevealed(true);
      playSound('reveal');
    }, 600);

    return () => {
      clearTimeout(t1);
    };
  }, [playSound]);

  return (
    <section
      aria-label="Grand Personalized Reveal"
      className="relative min-h-[calc(100vh-52px)] w-full bg-[#09070F] flex flex-col items-center justify-between px-6 py-8 overflow-hidden text-center select-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(246,196,83,0.16)_0%,rgba(90,15,28,0.36)_42%,rgba(9,7,15,0.98)_80%)]"
      />
      <Sacred3DMandala />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {SPARKLE_PARTICLES.map((p) => (
          <span
            key={p.id}
            style={{ left: p.left, top: p.top, opacity: p.opacity }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#F6C453] shadow-[0_0_12px_#F6C453]"
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center gap-2 pt-2">
        <SparkleSvg className="w-4 h-4" />
        <p className="font-poppins text-xs sm:text-sm tracking-[0.32em] text-[#F6C453] font-semibold">
          A SPECIAL CELEBRATION
        </p>
        <SparkleSvg className="w-4 h-4" />
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center space-y-8 my-auto py-8">
        <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-[#FFF5E1]">
          “This celebration is specially created for...”
        </p>

        <Interactive3DCard intensity={10}>
          <motion.div
            initial={{ opacity: 0.7, scale: 0.94 }}
            animate={{
              opacity: revealed ? 1 : 0.85,
              scale: revealed ? 1.03 : 0.96,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="py-8 px-8 sm:px-14 rounded-2xl border-2 border-[#F6C453]/65 bg-gradient-to-br from-[#5A0F1C]/65 via-[#3B0812]/80 to-[#09070F]/90 backdrop-blur-md shadow-[0_25px_80px_rgba(246,196,83,0.3)] flex items-center justify-center gap-4"
          >
            <SparkleSvg className="w-7 h-7 sm:w-9 sm:h-9 shrink-0" />
            <h1
              data-testid="personalized-reveal-name"
              className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#F6C453] tracking-wider drop-shadow-[0_0_30px_rgba(246,196,83,0.65)]"
            >
              {uppercaseName}
            </h1>
            <SparkleSvg className="w-7 h-7 sm:w-9 sm:h-9 shrink-0" />
          </motion.div>
        </Interactive3DCard>

        <p className="font-editorial text-2xl sm:text-3xl text-[#FFF5E1] tracking-wide">
          “Tonight, The Celebration Is Yours.”
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 w-full">
        <motion.button
          type="button"
          onClick={onComplete}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#F6C453] via-[#FFD97D] to-[#F6C453] text-[#09070F] font-display text-sm sm:text-base font-bold tracking-wider shadow-[0_0_35px_rgba(246,196,83,0.45)] hover:shadow-[0_0_55px_rgba(246,196,83,0.75)] transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <span>ENTER ROYAL CURTAINS</span>
          <ArrowRightSvg className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
};
