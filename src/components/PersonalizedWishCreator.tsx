import React, { useState } from 'react';
import {
  buildPersonalizedUrl,
  sanitizeRecipientName,
  formatDisplayName,
  getBaseUrl,
} from '../utils/shareUtils';
import { ShareSection } from './ShareSection';
import {
  DiyaSvg,
  SparkleSvg,
  ArrowLeftSvg,
  Interactive3DCard,
  Sacred3DMandala,
} from './FestiveSvgs';

interface PersonalizedWishCreatorProps {
  currentRecipientName: string;
  onApplyPersonalization: (newName: string) => void;
  onReplayWithNewName: (newName: string) => void;
  onPrev: () => void;
  onRestartFromIntro: () => void;
}

const EXAMPLE_NAMES = ['Priya', 'Rahul', 'Ashutosh'];

export const PersonalizedWishCreator: React.FC<PersonalizedWishCreatorProps> = ({
  currentRecipientName,
  onApplyPersonalization,
  onReplayWithNewName,
  onPrev,
  onRestartFromIntro,
}) => {
  const [inputName, setInputName] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [generatedName, setGeneratedName] = useState<string>(currentRecipientName);
  const [generatedUrl, setGeneratedUrl] = useState<string>(() =>
    buildPersonalizedUrl(getBaseUrl(), currentRecipientName)
  );

  const handleCreateWish = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeRecipientName(inputName);
    if (!sanitized) {
      setErrorMsg('Please enter a valid recipient name to create a personalized Diwali wish.');
      return;
    }

    setErrorMsg(null);
    const formatted = formatDisplayName(sanitized);
    const newUrl = buildPersonalizedUrl(getBaseUrl(), formatted);

    setGeneratedName(formatted);
    setGeneratedUrl(newUrl);
    onApplyPersonalization(formatted);
    setToastVisible(true);

    try {
      await navigator.clipboard.writeText(newUrl);
    } catch {}
  };

  const handleSelectExample = (name: string) => {
    setInputName(name);
    setErrorMsg(null);
  };

  return (
    <section
      aria-label="Create A Wish For Someone Else"
      className="relative min-h-[calc(100vh-52px)] w-full py-8 px-6 bg-[#09070F] flex flex-col items-center justify-between overflow-hidden select-none font-poppins"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(90,15,28,0.34)_0%,rgba(246,196,83,0.08)_45%,rgba(9,7,15,0.98)_85%)]"
      />
      <Sacred3DMandala />

      <div className="relative z-10 flex items-center gap-2 pt-2">
        <SparkleSvg className="w-4 h-4" />
        <p className="text-xs tracking-[0.28em] text-[#F6C453] font-semibold">
          SHARE THE LIGHT WITH LOVED ONES
        </p>
        <SparkleSvg className="w-4 h-4" />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto my-auto py-4">
        <Interactive3DCard intensity={5}>
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#170E24] via-[#120A1A] to-[#09070F] border border-[#F6C453]/45 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
            <div className="text-center space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2.5">
                <SparkleSvg className="w-5 h-5" />
                <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#FFF5E1]">
                  Create A Special Diwali Surprise
                </h1>
                <SparkleSvg className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-[#FFF5E1]/80">
                “Send a personalized Diwali celebration to someone special.”
              </p>
            </div>

            <form onSubmit={handleCreateWish} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="recipient-name-input"
                  className="block text-xs sm:text-sm font-medium text-[#FFF5E1]/90 mb-2"
                >
                  Enter Their Name
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="recipient-name-input"
                    type="text"
                    value={inputName}
                    onChange={(e) => {
                      setInputName(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                    }}
                    placeholder="Priya, Rahul, Ashutosh..."
                    maxLength={48}
                    className="flex-1 px-4 py-3.5 rounded-xl bg-[#09070F] border border-[#F6C453]/45 text-[#FFF5E1] placeholder-[#FFF5E1]/40 text-sm sm:text-base focus:outline-none focus:border-[#F6C453] focus:ring-2 focus:ring-[#F6C453]/30"
                  />
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#F6C453] via-[#FFD97D] to-[#F6C453] text-[#09070F] font-display text-xs sm:text-sm font-bold tracking-wider hover:shadow-[0_0_30px_rgba(246,196,83,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <DiyaSvg className="w-5 h-5" />
                    <span>CREATE PERSONALIZED WISH</span>
                  </button>
                </div>
                {errorMsg && (
                  <p role="alert" className="mt-2 text-xs text-[#FF8A3D] font-medium">
                    {errorMsg}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#FFF5E1]/65">
                <span>Quick examples:</span>
                {EXAMPLE_NAMES.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleSelectExample(name)}
                    className="px-3 py-1 rounded-md bg-[#09070F] border border-[#F6C453]/30 text-[#F6C453] hover:border-[#F6C453] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </form>

            {toastVisible && (
              <div
                role="status"
                data-testid="wish-created-toast"
                className="mt-5 p-4 rounded-xl bg-[#5A0F1C]/75 border border-[#F6C453] text-center space-y-3"
              >
                <p className="text-xs sm:text-sm font-semibold text-[#F6C453] flex items-center justify-center gap-2">
                  <SparkleSvg className="w-4 h-4" />
                  <span>Personalized Diwali Wish Created Successfully!</span>
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-lg bg-[#09070F]/90 border border-[#F6C453]/35 text-xs text-[#FFF5E1] break-all">
                  <span data-testid="generated-personalized-url">{generatedUrl}</span>
                  <button
                    type="button"
                    onClick={() => onReplayWithNewName(generatedName)}
                    className="px-3.5 py-2 rounded-lg bg-[#5A0F1C] border border-[#F6C453]/60 text-[#F6C453] font-semibold hover:bg-[#781426] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <SparkleSvg className="w-3.5 h-3.5" />
                    <span>Experience Ceremony for {generatedName}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6">
              <ShareSection
                personalizedUrl={generatedUrl}
                recipientName={generatedName}
              />
            </div>
          </div>
        </Interactive3DCard>
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
            onClick={onRestartFromIntro}
            className="px-6 py-3.5 rounded-xl bg-[#5A0F1C]/90 border border-[#F6C453]/70 text-[#F6C453] font-display text-xs sm:text-sm font-bold tracking-wider hover:bg-[#781426] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <DiyaSvg className="w-4 h-4" />
            <span>REPLAY OPENING INAUGURATION</span>
          </button>
        </div>
      </div>
    </section>
  );
};
