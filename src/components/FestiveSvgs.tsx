import React, { useState } from 'react';

interface SvgProps {
  className?: string;
}

export const DiyaSvg: React.FC<SvgProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path
      d="M32 6C32 6 22 18 22 26C22 31.5228 26.4772 36 32 36C37.5228 36 42 31.5228 42 26C42 18 32 6 32 6Z"
      fill="url(#diyaFlameGrad)"
      stroke="#D97706"
      strokeWidth="1.8"
    />
    <path
      d="M32 14C32 14 27 21 27 26C27 28.7614 29.2386 31 32 31C34.7614 31 37 28.7614 37 26C37 21 32 14 32 14Z"
      fill="#FFF5E1"
    />
    <path
      d="M8 36C8 36 14 54 32 54C50 54 56 36 56 36H8Z"
      fill="url(#diyaBowlGrad)"
      stroke="#F6C453"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M20 54L16 59H48L44 54"
      stroke="#F6C453"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="diyaFlameGrad" x1="32" y1="6" x2="32" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF5E1" />
        <stop offset="0.5" stopColor="#F6C453" />
        <stop offset="1" stopColor="#FF8A3D" />
      </linearGradient>
      <linearGradient id="diyaBowlGrad" x1="8" y1="36" x2="56" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#781426" />
        <stop offset="0.5" stopColor="#5A0F1C" />
        <stop offset="1" stopColor="#380710" />
      </linearGradient>
    </defs>
  </svg>
);

export const SparkleSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M24 2L28.8 19.2L46 24L28.8 28.8L24 46L19.2 28.8L2 24L19.2 19.2L24 2Z"
      fill="url(#sparkleGrad)"
    />
    <circle cx="24" cy="24" r="3" fill="#FFF5E1" />
    <defs>
      <linearGradient id="sparkleGrad" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF5E1" />
        <stop offset="0.5" stopColor="#F6C453" />
        <stop offset="1" stopColor="#FF8A3D" />
      </linearGradient>
    </defs>
  </svg>
);

export const HeartLotusSvg: React.FC<SvgProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path
      d="M32 54C32 54 10 40 10 23C10 15.8203 15.8203 10 23 10C27.2 10 30.8 12.1 32 15.2C33.2 12.1 36.8 10 41 10C48.1797 10 54 15.8203 54 23C54 40 32 54 32 54Z"
      fill="url(#heartGrad)"
      stroke="#F6C453"
      strokeWidth="2.5"
    />
    <path
      d="M32 22C32 22 26 29 26 34C26 37.3137 28.6863 40 32 40C35.3137 40 38 37.3137 38 34C38 29 32 22 32 22Z"
      fill="#F6C453"
      fillOpacity="0.85"
    />
    <defs>
      <linearGradient id="heartGrad" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9E1B32" />
        <stop offset="1" stopColor="#5A0F1C" />
      </linearGradient>
    </defs>
  </svg>
);

export const StarMandalaSvg: React.FC<SvgProps> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <polygon
      points="32,4 39,22 58,22 43,34 48,52 32,41 16,52 21,34 6,22 25,22"
      fill="url(#starGrad)"
      stroke="#FFF5E1"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="30" r="6" fill="#5A0F1C" stroke="#F6C453" strokeWidth="1.5" />
    <defs>
      <linearGradient id="starGrad" x1="6" y1="4" x2="58" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF5E1" />
        <stop offset="0.5" stopColor="#F6C453" />
        <stop offset="1" stopColor="#FF8A3D" />
      </linearGradient>
    </defs>
  </svg>
);

export const RocketSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path
      d="M32 6L44 24V44H20V24L32 6Z"
      fill="url(#rocketBodyGrad)"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path d="M20 34L12 44H20V34Z" fill="currentColor" />
    <path d="M44 34L52 44H44V34Z" fill="currentColor" />
    <path
      d="M28 44L32 58L36 44H28Z"
      fill="#FF8A3D"
    />
    <defs>
      <linearGradient id="rocketBodyGrad" x1="20" y1="6" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F6C453" />
        <stop offset="1" stopColor="#FF8A3D" />
      </linearGradient>
    </defs>
  </svg>
);

export const EnvelopeSealSvg: React.FC<SvgProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <rect
      x="8"
      y="14"
      width="48"
      height="36"
      rx="4"
      fill="#5A0F1C"
      stroke="#F6C453"
      strokeWidth="2.5"
    />
    <path
      d="M8 16L32 34L56 16"
      stroke="#F6C453"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="33" r="6" fill="#F6C453" />
  </svg>
);

export const SoundOnSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.25" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" strokeLinecap="round" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" strokeLinecap="round" />
  </svg>
);

export const SoundOffSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" strokeLinecap="round" />
    <line x1="17" y1="9" x2="23" y2="15" strokeLinecap="round" />
  </svg>
);

export const CopySvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const CheckSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} aria-hidden="true">
    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WhatsAppSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const TelegramSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export const XTwitterSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const ShareSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const ArrowRightSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
    <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeftSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12" strokeLinecap="round" />
    <polyline points="12 19 5 12 12 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  intensity = 10,
}) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * intensity * 2;
    const rotateX = (0.5 - y) * intensity * 2;
    setTilt({
      rotateX,
      rotateY,
      glareX: x * 100,
      glareY: y * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, active: false });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
      className={`relative ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(${tilt.active ? '12px' : '0px'})`,
          transformStyle: 'preserve-3d',
          transition: tilt.active ? 'transform 80ms ease-out' : 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full h-full"
      >
        {children}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(246,196,83,0.22) 0%, transparent 65%)`,
            opacity: tilt.active ? 1 : 0,
            transform: 'translateZ(20px)',
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        />
      </div>
    </div>
  );
};

export const Sacred3DMandala: React.FC = () => (
  <div
    aria-hidden="true"
    style={{ perspective: '1000px' }}
    className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0"
  >
    <div
      style={{
        transform: 'rotateX(64deg) translateZ(-40px)',
        transformStyle: 'preserve-3d',
      }}
      className="relative w-[440px] h-[440px] sm:w-[700px] sm:h-[700px] flex items-center justify-center opacity-25"
    >
      <div
        style={{ transform: 'translateZ(0px)' }}
        className="absolute inset-0 rounded-full border-2 border-dashed border-[#F6C453]/60 animate-rangoli-spin"
      />
      <div
        style={{ transform: 'translateZ(35px)' }}
        className="absolute inset-12 rounded-full border border-[#FF8A3D]/60 shadow-[0_0_50px_rgba(246,196,83,0.35)]"
      />
      <div
        style={{ transform: 'translateZ(70px)' }}
        className="absolute inset-24 rounded-full border-2 border-[#F6C453]/50"
      />
    </div>
  </div>
);

export const DeveloperWatermark: React.FC = () => null;

export const BottomSignatureFooter: React.FC = () => (
  <footer
    aria-label="Developer Signature and Copyright"
    className="relative z-40 w-full py-3.5 px-6 bg-[#09070F]/95 border-t border-[#F6C453]/25 text-center select-none"
  >
    <p
      data-testid="developer-signature-footer"
      className="font-poppins text-xs tracking-wide text-[#F6C453]/90 font-medium"
    >
      Made by officialashutoshsrivastav - Full Stack Developer
    </p>
  </footer>
);
