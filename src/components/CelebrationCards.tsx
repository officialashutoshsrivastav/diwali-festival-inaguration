import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  DiyaSvg,
  HeartLotusSvg,
  SparkleSvg,
  StarMandalaSvg,
  ArrowRightSvg,
  ArrowLeftSvg,
  Interactive3DCard,
  Sacred3DMandala,
} from './FestiveSvgs';

interface CelebrationCardsProps {
  onNext: () => void;
  onPrev: () => void;
}

interface BlessingCardItem {
  id: string;
  title: string;
  blessing: string;
  sanskritMantra: string;
  renderIcon: (className?: string) => React.ReactNode;
}

const BLESSING_CARDS: BlessingCardItem[] = [
  {
    id: 'light',
    title: 'LIGHT',
    blessing: '“May positivity illuminate every corner of your life.”',
    sanskritMantra: 'Tamaso Ma Jyotirgamaya · Lead Us From Darkness To Light',
    renderIcon: (cls) => <DiyaSvg className={cls} />,
  },
  {
    id: 'love',
    title: 'LOVE',
    blessing: '“May your heart always be surrounded by the people you love.”',
    sanskritMantra: 'Sneha & Samriddhi · Warmth In Every Gathering',
    renderIcon: (cls) => <HeartLotusSvg className={cls} />,
  },
  {
    id: 'happiness',
    title: 'HAPPINESS',
    blessing: '“May every moment bring a reason to smile.”',
    sanskritMantra: 'Ananda & Utsav · Joy That Radiates Outward',
    renderIcon: (cls) => <SparkleSvg className={cls} />,
  },
  {
    id: 'success',
    title: 'SUCCESS',
    blessing: '“May this Diwali open doors to new dreams and opportunities.”',
    sanskritMantra: 'Shubh Labh · Auspicious New Beginnings',
    renderIcon: (cls) => <StarMandalaSvg className={cls} />,
  },
];

export const CelebrationCards: React.FC<CelebrationCardsProps> = ({
  onNext,
  onPrev,
}) => {
  const [activeCardId, setActiveCardId] = useState<string>('light');

  return (
    <section
      aria-label="Festive Message Cards"
      className="relative min-h-[calc(100vh-52px)] w-full py-10 px-6 bg-[#09070F] flex flex-col items-center justify-between overflow-hidden select-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(90,15,28,0.34)_0%,rgba(246,196,83,0.08)_45%,rgba(9,7,15,0.98)_85%)]"
      />
      <Sacred3DMandala />

      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-2 pt-2">
        <div className="flex items-center justify-center gap-2">
          <SparkleSvg className="w-4 h-4" />
          <p className="font-poppins text-xs tracking-[0.28em] text-[#F6C453]/90 font-medium">
            SACRED FESTIVE BENEDICTIONS
          </p>
          <SparkleSvg className="w-4 h-4" />
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#FFF5E1]">
          Four Pillars of a Radiant Year
        </h1>
        <p className="font-poppins text-xs sm:text-sm text-[#FFF5E1]/75">
          Move across or touch any royal 3D blessing card to illuminate its auspicious invocation.
        </p>
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-auto py-8">
        {BLESSING_CARDS.map((card, index) => {
          const isSelected = activeCardId === card.id;
          return (
            <Interactive3DCard key={card.id} intensity={11}>
              <motion.button
                type="button"
                onClick={() => setActiveCardId(card.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className={`w-full h-full group relative text-left p-7 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[265px] backdrop-blur-md ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#5A0F1C]/80 to-[#09070F]/95 border-2 border-[#F6C453] shadow-[0_18px_50px_rgba(246,196,83,0.28)]'
                    : 'bg-[#120D1B]/85 border border-[#F6C453]/30 hover:border-[#F6C453]/75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-[#09070F]/70 border border-[#F6C453]/40 shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
                      {card.renderIcon('w-7 h-7')}
                    </div>
                    <SparkleSvg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h2 className="font-display text-lg font-bold tracking-wider text-[#F6C453] mb-3 flex items-center gap-2">
                    <span>{card.title}</span>
                  </h2>

                  <p className="font-editorial italic text-xl sm:text-2xl text-[#FFF5E1] leading-relaxed">
                    {card.blessing}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-[#F6C453]/20">
                  <p className="font-poppins text-xs text-[#FFF5E1]/70 leading-snug">
                    {card.sanskritMantra}
                  </p>
                </div>
              </motion.button>
            </Interactive3DCard>
          );
        })}
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
          <motion.button
            type="button"
            onClick={onNext}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#F6C453] via-[#FFD97D] to-[#F6C453] text-[#09070F] font-display text-xs sm:text-sm font-bold tracking-wider shadow-[0_0_30px_rgba(246,196,83,0.45)] transition-all cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0"
          >
            <span>ENTER GRAND ROCKET LAUNCH</span>
            <ArrowRightSvg className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
