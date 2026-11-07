import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Fireworks } from './Fireworks';
import { SoundEffectType } from '../hooks/useSound';
import {
  RocketSvg,
  SparkleSvg,
  ArrowRightSvg,
  ArrowLeftSvg,
  DeveloperWatermark,
} from './FestiveSvgs';

interface RocketLaunchProps {
  playSound: (effect: SoundEffectType) => void;
  onNext: () => void;
  onPrev: () => void;
}

type RocketStage =
  | 'idle'
  | 'lit'
  | 'fuse'
  | 'sparks'
  | 'shake'
  | 'launching'
  | 'exploded';

const STAGE_LABELS: Record<RocketStage, string> = {
  idle: 'Awaiting Royal Ignition Command',
  lit: 'Ceremonial Rocket Illuminated',
  fuse: 'Golden Fuse Ignited',
  sparks: 'Crimson & Gold Sparks Awakening',
  shake: 'Building Celestial Thrust',
  launching: 'Ascending Into The Midnight Sky...',
  exploded: 'Grand Sky Illumination Active · Touch anywhere in the sky for extra bursts',
};

export const RocketLaunch: React.FC<RocketLaunchProps> = ({
  playSound,
  onNext,
  onPrev,
}) => {
  const [stage, setStage] = useState<RocketStage>('idle');
  const [burstCount, setBurstCount] = useState<number>(0);

  const handleLaunch = () => {
    if (stage !== 'idle' && stage !== 'exploded') return;

    setStage('lit');
    playSound('fuse');

    setTimeout(() => setStage('fuse'), 250);
    setTimeout(() => setStage('sparks'), 500);
    setTimeout(() => setStage('shake'), 800);

    setTimeout(() => {
      setStage('launching');
      playSound('launch');
    }, 1150);

    setTimeout(() => {
      setStage('exploded');
      setBurstCount((c) => c + 1);
    }, 2050);
  };

  return (
    <section
      aria-label="Grand Rocket Launch and Massive Fireworks"
      className="relative w-full min-h-[calc(100vh-52px)] py-8 px-6 bg-gradient-to-b from-[#09070F] via-[#110B1D] to-[#09070F] overflow-hidden flex flex-col justify-between select-none"
    >
      <Fireworks
        active={stage === 'exploded'}
        burstTriggerCount={burstCount}
        playSound={playSound}
      />

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-2 pt-2 pointer-events-none">
        <div className="flex items-center justify-center gap-2">
          <SparkleSvg className="w-4 h-4" />
          <p className="font-poppins text-xs tracking-[0.28em] text-[#F6C453]/90 font-medium">
            CELESTIAL SKY SPECTACLE
          </p>
          <SparkleSvg className="w-4 h-4" />
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#FFF5E1]">
          “Ready For Something Spectacular?”
        </h1>
        <p
          data-testid="rocket-stage-status"
          className="font-poppins text-xs sm:text-sm text-[#F6C453] font-medium"
        >
          {STAGE_LABELS[stage]}
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="relative h-56 flex flex-col items-center justify-end mb-6">
          <motion.div
            animate={
              stage === 'shake'
                ? { x: [-3, 3, -4, 4, -2, 2, 0], y: [0, -2, 0] }
                : stage === 'launching'
                  ? { y: -520, scale: 0.45, opacity: 0 }
                  : stage === 'exploded'
                    ? { y: 0, scale: 1, opacity: 1 }
                    : { x: 0, y: 0, scale: 1, opacity: 1 }
            }
            transition={
              stage === 'launching'
                ? { duration: 0.9, ease: [0.32, 0, 0.67, 0] }
                : { duration: 0.3 }
            }
            className="relative flex flex-col items-center"
          >
            <div
              className="w-0 h-0 border-l-[22px] border-r-[22px] border-b-[38px] border-l-transparent border-r-transparent border-b-[#F6C453] drop-shadow-[0_0_15px_rgba(246,196,83,0.6)]"
              aria-hidden="true"
            />
            <div
              className={`w-11 h-24 rounded-b-md bg-gradient-to-b from-[#5A0F1C] via-[#781426] to-[#5A0F1C] border-2 border-[#F6C453] flex flex-col items-center justify-around py-2 shadow-[0_0_25px_rgba(246,196,83,0.3)] ${
                stage !== 'idle' ? 'ring-4 ring-[#F6C453]/40' : ''
              }`}
            >
              <div className="w-full h-1.5 bg-[#F6C453]/80" />
              <SparkleSvg className="w-4 h-4" />
              <div className="w-full h-1.5 bg-[#F6C453]/80" />
            </div>
            <div className="flex justify-between w-16 -mt-3" aria-hidden="true">
              <div className="w-3 h-6 bg-[#F6C453] skew-x-[-20deg] rounded-bl" />
              <div className="w-3 h-6 bg-[#F6C453] skew-x-[20deg] rounded-br" />
            </div>
            <div className="w-1 h-6 bg-[#FFF5E1]/70 relative" aria-hidden="true">
              {(stage === 'fuse' || stage === 'sparks' || stage === 'shake' || stage === 'launching') && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FF8A3D] blur-[2px] animate-ping" />
              )}
              {(stage === 'sparks' || stage === 'shake' || stage === 'launching') && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#F6C453] animate-bounce" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A3D] animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-bounce" />
                </div>
              )}
            </div>
          </motion.div>

          <div
            aria-hidden="true"
            className="w-32 h-4 rounded-t-lg bg-gradient-to-r from-[#5A0F1C] via-[#F6C453] to-[#5A0F1C] border border-[#F6C453]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleLaunch}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#F6C453] via-[#FF8A3D] to-[#F6C453] text-[#09070F] font-display text-sm sm:text-base font-bold tracking-wider shadow-[0_0_35px_rgba(246,196,83,0.45)] hover:shadow-[0_0_55px_rgba(255,138,61,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0"
          >
            <RocketSvg className="w-5 h-5" />
            <span>LAUNCH THE CELEBRATION</span>
          </button>

          {stage === 'exploded' && (
            <button
              type="button"
              onClick={() => setBurstCount((c) => c + 1)}
              className="px-5 py-4 rounded-xl bg-[#09070F]/85 border border-[#F6C453]/60 text-[#F6C453] font-poppins text-xs sm:text-sm font-semibold hover:bg-[#5A0F1C]/60 transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
            >
              <SparkleSvg className="w-4 h-4" />
              <span>Fire Royal Sky Salvo Again</span>
            </button>
          )}
        </div>
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
            <span>LIGHT THE SACRED DIYA</span>
            <ArrowRightSvg className="w-4 h-4" />
          </button>
        </div>
        <DeveloperWatermark />
      </div>
    </section>
  );
};
