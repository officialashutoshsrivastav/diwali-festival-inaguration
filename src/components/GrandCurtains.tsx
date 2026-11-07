import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SoundEffectType } from '../hooks/useSound';
import { DiyaSvg, Interactive3DCard } from './FestiveSvgs';
import royalCrestImg from '../assets/images/diwali_royal_invitation_1794061978495.jpg';

interface GrandCurtainsProps {
  recipientName: string;
  onCurtainsOpened: () => void;
  playSound: (effect: SoundEffectType) => void;
}

const CURTAIN_SPARKS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  xOffset: (i % 2 === 0 ? 1 : -1) * ((i * 19) % 240),
  yOffset: -((i * 23) % 280) + 100,
  delay: (i % 6) * 0.06,
}));

export const GrandCurtains: React.FC<GrandCurtainsProps> = ({
  recipientName,
  onCurtainsOpened,
  playSound,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenCurtains = () => {
    if (isOpening) return;
    setIsOpening(true);
    playSound('curtain');

    setTimeout(() => {
      onCurtainsOpened();
    }, 1800);
  };

  return (
    <section
      aria-label="Grand Curtain Opening"
      className="relative min-h-[calc(100vh-52px)] w-full bg-[#09070F] overflow-hidden flex flex-col items-center justify-between py-8 px-6 select-none"
    >
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.25, scale: 0.9 }}
        animate={
          isOpening
            ? { opacity: 1, scale: 1.25 }
            : { opacity: 0.35, scale: 0.95 }
        }
        transition={{ duration: 1.7, ease: 'easeOut' }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(246,196,83,0.85)_0%,rgba(255,138,61,0.45)_30%,rgba(90,15,28,0.6)_60%,rgba(9,7,15,1)_90%)]"
      />

      <motion.div
        aria-hidden="true"
        initial={{ width: '2px', opacity: 0.5 }}
        animate={
          isOpening
            ? { width: '100vw', opacity: 0.95 }
            : { width: '4px', opacity: 0.75 }
        }
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F6C453] to-transparent blur-md z-10"
      />

      <div
        aria-hidden="true"
        className="relative z-30 flex items-center gap-3 text-xs tracking-[0.28em] text-[#F6C453] font-poppins font-medium pt-2"
      >
        <DiyaSvg className="w-5 h-5" />
        <span>ROYAL DARBAR SANCTUM · HONORING {recipientName.toUpperCase()}</span>
        <DiyaSvg className="w-5 h-5" />
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ x: '0%' }}
        animate={isOpening ? { x: '-102%', rotateZ: -2 } : { x: '0%', rotateZ: 0 }}
        transition={{ duration: 1.75, ease: [0.22, 1, 0.36, 1] }}
        className="velvet-curtain-left absolute top-0 bottom-0 left-0 w-1/2 border-r-4 border-[#F6C453] z-20 flex flex-col justify-between py-24 pr-4"
      >
        <div className="h-full w-3 ml-auto border-l border-[#F6C453]/40" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        initial={{ x: '0%' }}
        animate={isOpening ? { x: '102%', rotateZ: 2 } : { x: '0%', rotateZ: 0 }}
        transition={{ duration: 1.75, ease: [0.22, 1, 0.36, 1] }}
        className="velvet-curtain-right absolute top-0 bottom-0 right-0 w-1/2 border-l-4 border-[#F6C453] z-20 flex flex-col justify-between py-24 pl-4"
      >
        <div className="h-full w-3 mr-auto border-r border-[#F6C453]/40" />
      </motion.div>

      {isOpening && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center z-30">
          {CURTAIN_SPARKS.map((s) => (
            <motion.span
              key={s.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
              animate={{
                x: s.xOffset,
                y: s.yOffset,
                opacity: 0,
                scale: 1.6,
              }}
              transition={{ duration: 1.4, delay: s.delay, ease: 'easeOut' }}
              className="absolute w-2 h-2 rounded-full bg-[#F6C453] shadow-[0_0_16px_#F6C453]"
            />
          ))}
        </div>
      )}

      <div className="relative z-30 max-w-lg w-full mx-auto my-auto">
        <Interactive3DCard intensity={9}>
          <motion.div
            animate={
              isOpening
                ? { scale: 1.15, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="flex flex-col items-center text-center px-6 py-10 rounded-2xl bg-[#09070F]/88 border border-[#F6C453]/65 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-md"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#F6C453] shadow-[0_0_30px_rgba(246,196,83,0.4)] mb-5 bg-[#5A0F1C]">
              <img
                src={royalCrestImg}
                alt="Royal Diwali Ceremonial Crest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-poppins text-xs tracking-[0.26em] text-[#F6C453]/85 mb-2">
              THE GRAND INAUGURATION AWAITS
            </p>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF5E1] mb-3">
              Unveil the Festival of Lights
            </h1>

            <p className="font-poppins text-sm sm:text-base text-[#FFF5E1]/80 mb-7">
              Prepared in honor of <span className="text-[#F6C453] font-semibold">{recipientName}</span>
            </p>

            <button
              type="button"
              onClick={handleOpenCurtains}
              disabled={isOpening}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#F6C453] via-[#FFD97D] to-[#F6C453] text-[#09070F] font-display text-sm sm:text-base font-bold tracking-wider shadow-[0_0_35px_rgba(246,196,83,0.5)] hover:shadow-[0_0_55px_rgba(246,196,83,0.8)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0"
            >
              <DiyaSvg className="w-5 h-5" />
              <span>OPEN THE GRAND CELEBRATION</span>
            </button>
          </motion.div>
        </Interactive3DCard>
      </div>

      <div className="relative z-30 h-2" />
    </section>
  );
};
