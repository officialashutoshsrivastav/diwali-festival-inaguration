import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SoundEffectType } from '../hooks/useSound';
import {
  EnvelopeSealSvg,
  DiyaSvg,
  SparkleSvg,
  HeartLotusSvg,
  ArrowRightSvg,
  ArrowLeftSvg,
  DeveloperWatermark,
} from './FestiveSvgs';
import royalCrestImg from '../assets/images/diwali_royal_invitation_1794061978495.jpg';

interface LuxuryGreetingCardProps {
  uppercaseName: string;
  displayName: string;
  playSound: (effect: SoundEffectType) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LuxuryGreetingCard: React.FC<LuxuryGreetingCardProps> = ({
  uppercaseName,
  displayName,
  playSound,
  onNext,
  onPrev,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCard = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      playSound('card');
    }
  };

  return (
    <section
      aria-label="Luxury Greeting Card and Final Celebration"
      className="relative min-h-[calc(100vh-52px)] w-full py-8 px-6 bg-gradient-to-b from-[#09070F] via-[#1B0912] to-[#09070F] overflow-hidden flex flex-col items-center justify-between select-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center pt-2">
        <div className="flex items-center gap-2 mb-2">
          <SparkleSvg className="w-4 h-4" />
          <p className="font-poppins text-xs sm:text-sm tracking-[0.32em] text-[#F6C453] font-semibold">
            A SPECIAL MESSAGE FOR YOU
          </p>
          <SparkleSvg className="w-4 h-4" />
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#FFF5E1] mb-2">
          Your Royal Diwali Keepsake
        </h1>

        <p className="font-poppins text-xs sm:text-sm text-[#FFF5E1]/75 max-w-xl mb-6">
          {isOpen
            ? `Sealed in gold and opened exclusively for ${displayName}.`
            : 'An embossed royal maroon & gold-leaf invitation awaits your touch.'}
        </p>

        <button
          type="button"
          onClick={handleToggleCard}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#5A0F1C] via-[#781426] to-[#5A0F1C] border-2 border-[#F6C453] text-[#F6C453] font-display text-sm sm:text-base font-bold tracking-wider shadow-[0_0_35px_rgba(246,196,83,0.35)] hover:shadow-[0_0_50px_rgba(246,196,83,0.65)] hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <EnvelopeSealSvg className="w-5 h-5" />
          <span>{isOpen ? 'FOLD ROYAL GREETING CARD' : 'OPEN YOUR DIWALI WISH'}</span>
        </button>
      </div>

      <div className="w-full max-w-2xl mx-auto perspective-1200 my-auto py-6">
        {!isOpen ? (
          <motion.div
            key="closed-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
            onClick={handleToggleCard}
            role="button"
            tabIndex={0}
            aria-label="Open Your Diwali Wish Card"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleCard();
              }
            }}
            className="cursor-pointer mx-auto max-w-md rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-[#5A0F1C] via-[#3E0812] to-[#26040A] border-2 border-[#F6C453] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(246,196,83,0.2)] relative overflow-hidden"
          >
            <div className="border border-[#F6C453]/50 rounded-xl p-6 sm:p-8 flex flex-col items-center space-y-5">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#F6C453] shadow-[0_0_25px_rgba(246,196,83,0.45)]">
                <img
                  src={royalCrestImg}
                  alt="Gold Foil Royal Mandala Crest"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 text-center">
                <p className="font-poppins text-xs tracking-[0.28em] text-[#F6C453]/85 font-medium">
                  SHUBH DEEPAVALI
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF5E1]">
                  For {displayName}
                </h2>
              </div>

              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#F6C453] to-transparent" />

              <p className="font-poppins text-xs tracking-[0.2em] text-[#F6C453] flex items-center gap-2">
                <SparkleSvg className="w-4 h-4" />
                <span>TAP TO UNSEAL ROYAL PARCHMENT</span>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="opened-card"
            data-testid="luxury-card-opened-content"
            initial={{ opacity: 0, scale: 0.9, rotateX: 16, y: 24 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl p-3 sm:p-5 bg-gradient-to-br from-[#5A0F1C] via-[#781426] to-[#3E0812] border-2 border-[#F6C453] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_60px_rgba(246,196,83,0.35)]"
          >
            <div className="rounded-xl bg-[#FFF5E1] text-[#2A060D] p-6 sm:p-10 border-2 border-[#B87D24] shadow-inner relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#5A0F1C]/50"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#5A0F1C]/50"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#5A0F1C]/50"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#5A0F1C]/50"
              />

              <div className="max-w-lg mx-auto space-y-4 text-center">
                <div className="text-xs tracking-[0.25em] text-[#5A0F1C]/75 font-semibold" aria-hidden="true">
                  ━━━━━━━━━━━━━━━━━━━━
                </div>

                <div className="flex items-center justify-center gap-2.5">
                  <DiyaSvg className="w-6 h-6 shrink-0" />
                  <h2
                    data-testid="greeting-card-recipient-heading"
                    className="font-display text-xl sm:text-2xl font-bold text-[#5A0F1C] tracking-wide"
                  >
                    HAPPY DIWALI, {uppercaseName}!
                  </h2>
                  <DiyaSvg className="w-6 h-6 shrink-0" />
                </div>

                <p className="font-editorial text-xl sm:text-2xl text-[#2A060D] leading-relaxed">
                  May this festival of lights bring happiness, peace, prosperity, success and beautiful memories into your life.
                </p>

                <p className="font-editorial italic text-xl sm:text-2xl text-[#5A0F1C] leading-relaxed">
                  May every diya remind you that even the smallest light can overcome the deepest darkness.
                </p>

                <div className="flex items-center justify-center gap-2 pt-1">
                  <SparkleSvg className="w-4 h-4" />
                  <p className="font-display text-sm sm:text-base font-bold text-[#8A5A19] tracking-wider">
                    Keep Shining. Keep Smiling.
                  </p>
                  <SparkleSvg className="w-4 h-4" />
                </div>

                <div className="flex items-center justify-center gap-2">
                  <p className="font-editorial text-lg sm:text-xl font-semibold text-[#5A0F1C]">
                    With Warm Wishes
                  </p>
                  <HeartLotusSvg className="w-5 h-5" />
                </div>

                <div className="text-xs tracking-[0.25em] text-[#5A0F1C]/75 font-semibold" aria-hidden="true">
                  ━━━━━━━━━━━━━━━━━━━━
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 w-full">
        <div className="text-center space-y-1">
          <p className="font-editorial italic text-xl sm:text-2xl text-[#FFF5E1]">
            “May Your Life Always Shine Bright.”
          </p>
        </div>

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
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#F6C453] via-[#FFD97D] to-[#F6C453] text-[#09070F] font-display text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_30px_rgba(246,196,83,0.45)] transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0"
          >
            <span>CREATE A WISH FOR SOMEONE ELSE</span>
            <ArrowRightSvg className="w-4 h-4" />
          </button>
        </div>
        <DeveloperWatermark />
      </div>
    </section>
  );
};
