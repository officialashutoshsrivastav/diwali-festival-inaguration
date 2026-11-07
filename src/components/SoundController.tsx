import React from 'react';
import { SoundOnSvg, SoundOffSvg } from './FestiveSvgs';

interface SoundControllerProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const SoundController: React.FC<SoundControllerProps> = ({
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        onClick={onToggleSound}
        aria-label={soundEnabled ? 'Sound On' : 'Sound Off'}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#09070F]/90 border border-[#F6C453]/45 text-[#FFF5E1] hover:border-[#F6C453] hover:bg-[#5A0F1C]/85 transition-all duration-200 shadow-lg backdrop-blur-md cursor-pointer whitespace-nowrap shrink-0 font-poppins"
      >
        {soundEnabled ? (
          <>
            <SoundOnSvg className="w-4 h-4 text-[#F6C453]" />
            <span className="text-xs font-medium tracking-wide">Sound On</span>
          </>
        ) : (
          <>
            <SoundOffSvg className="w-4 h-4 text-[#FFF5E1]/75" />
            <span className="text-xs font-medium tracking-wide">Sound Off</span>
          </>
        )}
      </button>
    </div>
  );
};
