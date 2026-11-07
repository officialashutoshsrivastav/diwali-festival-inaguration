import React from 'react';
import { motion } from 'motion/react';
import {
  DiyaSvg,
  SparkleSvg,
  ArrowRightSvg,
  ArrowLeftSvg,
  Interactive3DCard,
  Sacred3DMandala,
} from './FestiveSvgs';
import palaceCourtyardImg from '../assets/images/diwali_palace_courtyard_1794061976971.jpg';

interface DiwaliRevealProps {
  recipientName: string;
  onNext: () => void;
  onPrev: () => void;
}

export const DiwaliReveal: React.FC<DiwaliRevealProps> = ({
  recipientName,
  onNext,
  onPrev,
}) => {
  return (
    <section
      aria-label="Grand Diwali Reveal"
      className="relative min-h-[calc(100vh-52px)] w-full flex flex-col items-center justify-between px-6 py-8 overflow-hidden select-none"
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#09070F]">
        <img
          src={palaceCourtyardImg}
          alt="Illuminated Royal Indian Palace Courtyard During Diwali"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-55 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09070F]/90 via-[#09070F]/65 to-[#09070F]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(246,196,83,0.18)_0%,rgba(90,15,28,0.48)_55%,rgba(9,7,15,0.95)_95%)]" />
      </div>

      <Sacred3DMandala />

      <div
        aria-hidden="true"
        className="pointer-events-none relative z-10 w-full max-w-6xl mx-auto flex justify-between px-4 sm:px-12 -mt-8"
      >
        {[0, 1, 2, 3].map((idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-px h-10 sm:h-14 bg-gradient-to-b from-[#F6C453]/80 to-[#F6C453]" />
            <div className="w-6 h-8 sm:w-8 sm:h-11 rounded-b-full rounded-t-sm bg-gradient-to-b from-[#F6C453] via-[#FF8A3D] to-[#5A0F1C] border border-[#F6C453] shadow-[0_0_25px_rgba(246,196,83,0.75)]" />
          </div>
        ))}
      </div>

      <div className="relative z-20 max-w-4xl w-full mx-auto my-auto py-4">
        <Interactive3DCard intensity={7}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center flex flex-col items-center space-y-5 p-8 sm:p-12 rounded-3xl bg-[#09070F]/65 border border-[#F6C453]/35 backdrop-blur-md shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            <p className="font-poppins text-xs sm:text-sm tracking-[0.3em] text-[#F6C453] font-medium">
              FESTIVAL OF LIGHTS · GRAND ROYAL PALACE
            </p>

            <div className="flex items-center justify-center gap-3 sm:gap-5">
              <DiyaSvg className="w-9 h-9 sm:w-14 sm:h-14 shrink-0 animate-flame" />
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#F6C453] tracking-wider drop-shadow-[0_0_40px_rgba(246,196,83,0.55)]">
                HAPPY DIWALI
              </h1>
              <DiyaSvg className="w-9 h-9 sm:w-14 sm:h-14 shrink-0 animate-flame" />
            </div>

            <p className="font-editorial italic text-2xl sm:text-3xl text-[#FFF5E1] max-w-3xl text-balance leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              “May Your Life Shine Brighter Than A Thousand Diyas.”
            </p>

            <div className="py-3.5 px-7 rounded-2xl bg-[#5A0F1C]/45 border border-[#F6C453]/60 backdrop-blur-md shadow-[0_0_35px_rgba(90,15,28,0.65)] flex items-center gap-3">
              <SparkleSvg className="w-5 h-5 shrink-0" />
              <p
                data-testid="diwali-reveal-personalized"
                className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-[#FFF5E1] tracking-wide"
              >
                Happy Diwali, <span className="text-[#F6C453]">{recipientName}</span>
              </p>
              <SparkleSvg className="w-5 h-5 shrink-0" />
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-10 pt-2" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((diyaIdx) => (
                <DiyaSvg key={diyaIdx} className="w-8 h-8 sm:w-10 sm:h-10 animate-flame" />
              ))}
            </div>
          </motion.div>
        </Interactive3DCard>
      </div>

      <div className="relative z-20 flex flex-col items-center gap-3 w-full">
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
            <span>UNVEIL FESTIVE BLESSINGS</span>
            <ArrowRightSvg className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
