import React, { useState } from 'react';
import { buildSocialShareLinks } from '../utils/shareUtils';
import {
  CopySvg,
  CheckSvg,
  WhatsAppSvg,
  TelegramSvg,
  XTwitterSvg,
  ShareSvg,
} from './FestiveSvgs';

interface ShareSectionProps {
  personalizedUrl: string;
  recipientName: string;
}

export const ShareSection: React.FC<ShareSectionProps> = ({
  personalizedUrl,
  recipientName,
}) => {
  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const { shareTitle, shareText, whatsappUrl, telegramUrl, twitterUrl } =
    buildSocialShareLinks(personalizedUrl, recipientName);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(personalizedUrl);
      setCopied(true);
      setShareFeedback('Link copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setShareFeedback(null);
      }, 3000);
    } catch {
      setCopied(true);
      setShareFeedback('Ready to copy from the link box above.');
      setTimeout(() => {
        setCopied(false);
        setShareFeedback(null);
      }, 3000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: personalizedUrl,
        });
        return;
      } catch {}
    }
    await handleCopyLink();
  };

  return (
    <div
      aria-label="Share the Celebration"
      className="w-full pt-6 border-t border-[#F6C453]/25 flex flex-col items-center space-y-4 font-poppins"
    >
      <div className="text-center space-y-1">
        <h2 className="font-display text-lg sm:text-xl font-bold text-[#F6C453]">
          Share This Royal Celebration
        </h2>
        <p className="text-xs sm:text-sm text-[#FFF5E1]/75">
          When <span className="text-[#F6C453] font-semibold">{recipientName}</span> opens this link, the entire ceremony will feature their name.
        </p>
      </div>

      <div className="w-full max-w-xl px-3.5 py-2.5 rounded-xl bg-[#09070F]/90 border border-[#F6C453]/30 text-center">
        <p
          data-testid="active-share-url"
          className="text-xs text-[#F6C453]/90 font-mono break-all select-all"
        >
          {personalizedUrl}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <button
          type="button"
          onClick={handleCopyLink}
          className="px-5 py-3 rounded-xl bg-[#5A0F1C] border border-[#F6C453] text-[#FFF5E1] text-xs sm:text-sm font-semibold hover:bg-[#781426] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          {copied ? (
            <>
              <CheckSvg className="w-4 h-4 text-[#F6C453]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopySvg className="w-4 h-4 text-[#F6C453]" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-[#120D1B] border border-[#F6C453]/40 text-[#FFF5E1] text-xs sm:text-sm font-semibold hover:border-[#F6C453] hover:bg-[#5A0F1C]/40 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <WhatsAppSvg className="w-4 h-4 text-[#F6C453]" />
          <span>WhatsApp</span>
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-[#120D1B] border border-[#F6C453]/40 text-[#FFF5E1] text-xs sm:text-sm font-semibold hover:border-[#F6C453] hover:bg-[#5A0F1C]/40 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <TelegramSvg className="w-4 h-4 text-[#F6C453]" />
          <span>Telegram</span>
        </a>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-xl bg-[#120D1B] border border-[#F6C453]/40 text-[#FFF5E1] text-xs sm:text-sm font-semibold hover:border-[#F6C453] hover:bg-[#5A0F1C]/40 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <XTwitterSvg className="w-3.5 h-3.5 text-[#F6C453]" />
          <span>X / Twitter</span>
        </a>

        <button
          type="button"
          onClick={handleNativeShare}
          className="px-5 py-3 rounded-xl bg-[#F6C453] text-[#09070F] text-xs sm:text-sm font-bold hover:bg-[#FFD97D] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <ShareSvg className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {shareFeedback && (
        <p role="status" className="text-xs font-medium text-[#F6C453]">
          {shareFeedback}
        </p>
      )}
    </div>
  );
};
