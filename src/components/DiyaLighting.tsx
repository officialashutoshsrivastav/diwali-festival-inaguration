import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SoundEffectType } from '../hooks/useSound';
import {
  DiyaSvg,
  SparkleSvg,
  ArrowRightSvg,
  ArrowLeftSvg,
  DeveloperWatermark,
} from './FestiveSvgs';
import sacredDiyaImg from '../assets/images/diwali_sacred_diya_1794061978021.jpg';

interface DiyaLightingProps {
  playSound: (effect: SoundEffectType) => void;
  onNext: () => void;
  onPrev: () => void;
}

type DiyaPhase = 'unlit' | 'spark' | 'wick' | 'growing' | 'radiant';

const COMPANION_DIYAS = [
  { id: 0, label: 'Peace' },
  { id: 1, label: 'Wisdom' },
  { id: 2, label: 'Health' },
  { id: 3, label: 'Prosperity' },
  { id: 4, label: 'Harmony' },
  { id: 5, label: 'Gratitude' },
];

export const DiyaLighting: React.FC<DiyaLightingProps> = ({
  playSound,
  onNext,
  onPrev,
}) => {
  const [phase, setPhase] = useState<DiyaPhase>('unlit');
  const [litCompanions, setLitCompanions] = useState<number[]>([]);

  const handleLightDiya = () => {
    if (phase !== 'unlit') return;

    setPhase('spark');
    playSound('diya');

    setTimeout(() => setPhase('wick'), 300);
    setTimeout(() => setPhase('growing'), 650);
    setTimeout(() => setPhase('radiant'), 1050);

    COMPANION_DIYAS.forEach((d, index) => {
      setTimeout(() => {
        setLitCompanions((prev) => (prev.includes(d.id) ? prev : [...prev, d.id]));
      }, 1250 + index * 240);
    });
  };

  const isLit = phase !== 'unlit';

  return (
    <section
      aria-label="Light The Sacred Diya"
      className={`relative min-h-[calc(100vh-52px)] w-full py-8 px-6 transition-colors duration-1000 overflow-hidden flex flex-col items-center justify-between select-none ${
        phase === 'radiant'
          ? 'bg-gradient-to-b from-[#09070F] via-[#2A0911] to-[#09070F]'
          : 'bg-[#09070F]'
      }`}
    >
      <motion.div
        aria-hidden="true"
        animate={
          phase === 'radiant'
            ? { opacity: 1, scale: 1.25 }
            : isLit
              ? { opacity: 0.55, scale: 0.9 }
              : { opacity: 0.08, scale: 0.5 }
        }
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(246,196,83,0.32)_0%,rgba(255,138,61,0.16)_35%,rgba(90,15,28,0.25)_62%,transparent_80%)]"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center pt-2">
        <div className="flex items-center gap-2 mb-2">
          <DiyaSvg className="w-5 h-5" />
          <p className="font-poppins text-xs tracking-[0.28em] text-[#F6C453]/90 font-medium">
            THE SACRED RITUAL OF ILLUMINATION
          </p>
          <DiyaSvg className="w-5 h-5" />
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#FFF5E1] mb-2">
          “One Light Can Remove Darkness.”
        </h1>

        <p
          data-testid="diya-lighting-status"
          className="font-poppins text-xs sm:text-sm text-[#FFF5E1]/80 max-w-xl"
        >
          {phase === 'unlit'
            ? 'Touch the sacred flame button below to ignite the central diya and awaken the sanctum.'
            : phase === 'radiant'
              ? `All ${litCompanions.length + 1} sacred diyas are now glowing with warm golden light.`
              : 'The sacred wick catches fire, spreading golden warmth across the darkness...'}
        </p>
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center my-auto py-4">
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            aria-hidden="true"
            animate={
              phase === 'radiant'
                ? { opacity: 0.9, scale: 1.35 }
                : isLit
                  ? { opacity: 0.5, scale: 0.9 }
                  : { opacity: 0, scale: 0.4 }
            }
            transition={{ duration: 0.9 }}
            className="pointer-events-none absolute -top-12 w-44 h-44 rounded-full bg-[radial-gradient(circle,rgba(246,196,83,0.65)_0%,rgba(255,138,61,0.25)_50%,transparent_75%)] blur-xl"
          />

          <div className="relative h-20 flex items-end justify-center z-20 -mb-3">
            {phase === 'spark' && (
              <div className="w-3 h-3 rounded-full bg-[#FFF5E1] shadow-[0_0_20px_#F6C453] animate-ping" />
            )}
            {(phase === 'wick' || phase === 'growing' || phase === 'radiant') && (
              <motion.div
                initial={{ scale: 0.25, opacity: 0.5 }}
                animate={{
                  scale: phase === 'wick' ? 0.45 : phase === 'growing' ? 0.8 : 1.1,
                  opacity: 1,
                }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center animate-flame"
              >
                <div className="w-9 h-18 rounded-t-full rounded-b-3xl bg-gradient-to-t from-[#FF8A3D] via-[#F6C453] to-[#FFF5E1] shadow-[0_0_40px_#F6C453,0_0_80px_#FF8A3D]" />
                <div className="absolute bottom-1.5 w-4 h-10 rounded-t-full rounded-b-2xl bg-gradient-to-t from-[#F6C453] to-[#FFFFFF]" />
              </motion.div>
            )}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-2 h-3.5 rounded-t-full bg-[#5A0F1C] border border-[#F6C453]/60 -mb-1 z-20" />

            <svg
              viewBox="0 0 260 110"
              className="w-52 sm:w-64 h-24 drop-shadow-[0_18px_35px_rgba(0,0,0,0.9)]"
            >
              <defs>
                <linearGradient id="diyaBrass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8A5A19" />
                  <stop offset="35%" stopColor="#F6C453" />
                  <stop offset="65%" stopColor="#B87D24" />
                  <stop offset="100%" stopColor="#5A0F1C" />
                </linearGradient>
              </defs>
              <ellipse
                cx="130"
                cy="30"
                rx="96"
                ry="18"
                fill={isLit ? '#B45309' : '#1F1627'}
                stroke="#F6C453"
                strokeWidth="2.5"
              />
              <path
                d="M 28 30 Q 50 92 130 92 Q 210 92 232 30 Z"
                fill="url(#diyaBrass)"
                stroke="#F6C453"
                strokeWidth="2"
              />
              <path
                d="M 85 92 L 72 106 L 188 106 L 175 92 Z"
                fill="#5A0F1C"
                stroke="#F6C453"
                strokeWidth="2"
              />
            </svg>

            <div className="mt-2 w-24 h-16 rounded-xl overflow-hidden border border-[#F6C453]/40 shadow-md opacity-85">
              <img
                src={sacredDiyaImg}
                alt="Handcrafted Traditional Brass Diya"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isLit ? 'brightness-110 saturate-125' : 'brightness-50 grayscale-[40%]'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-6 w-full max-w-3xl mx-auto my-6">
          {COMPANION_DIYAS.map((comp) => {
            const compLit = litCompanions.includes(comp.id);
            return (
              <div
                key={comp.id}
                className="flex flex-col items-center justify-end p-2.5 rounded-xl bg-[#120D1B]/60 border border-[#F6C453]/20"
              >
                <div className="h-6 flex items-end justify-center">
                  {compLit ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-5 rounded-full bg-gradient-to-t from-[#FF8A3D] via-[#F6C453] to-[#FFF5E1] animate-flame shadow-[0_0_16px_#F6C453]"
                    />
                  ) : (
                    <div className="w-1 h-2 bg-[#FFF5E1]/30 rounded-t" />
                  )}
                </div>
                <div
                  className={`w-10 h-4 rounded-b-full border transition-colors duration-500 ${
                    compLit
                      ? 'bg-gradient-to-r from-[#5A0F1C] via-[#F6C453] to-[#5A0F1C] border-[#F6C453] shadow-[0_0_20px_rgba(246,196,83,0.45)]'
                      : 'bg-[#1D1526] border-[#F6C453]/30'
                  }`}
                />
                <span className="mt-1.5 font-poppins text-xs text-[#FFF5E1]/75 font-medium">
                  {comp.label}
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleLightDiya}
          className={`px-8 py-4 rounded-xl font-display text-sm sm:text-base font-bold tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0 ${
            isLit
              ? 'bg-[#5A0F1C] border-2 border-[#F6C453] text-[#F6C453] shadow-[0_0_40px_rgba(246,196,83,0.5)]'
              : 'bg-gradient-to-r from-[#F6C453] via-[#FFD97D] to-[#F6C453] text-[#09070F] shadow-[0_0_35px_rgba(246,196,83,0.45)] hover:scale-[1.03]'
          }`}
        >
          <DiyaSvg className="w-5 h-5" />
          <span>{isLit ? 'THE SACRED DIYA IS LIT' : 'LIGHT THE DIYA'}</span>
          {isLit && <SparkleSvg className="w-5 h-5" />}
        </button>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 w-full">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous Page"
            className="p-3.5 rounded-xl bg-[#09070F]/85 border border-[#F6C453]/40 text-[#F6C453] hover:border-[#F6C453] transition-colors cursor-pointer"
          >
            <ArrowLeftSvg className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-7 py-3.5 rounded-xl bg-[#5A0F1C]/90 border border-[#F6C453] text-[#F6C453] font-display text-xs sm:text-sm font-bold tracking-wider hover:bg-[#781426] transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0"
          >
            <span>OPEN LUXURY GREETING CARD</span>
            <ArrowRightSvg className="w-4 h-4" />
          </button>
        </div>
        <DeveloperWatermark />
      </div>
    </section>
  );
};
