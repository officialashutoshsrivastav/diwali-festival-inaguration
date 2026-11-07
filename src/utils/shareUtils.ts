export type CeremonyScene =
  | 'intro'
  | 'reveal'
  | 'curtains'
  | 'diwali'
  | 'cards'
  | 'rocket'
  | 'diya'
  | 'greeting'
  | 'wish';

export const SCENE_ORDER: CeremonyScene[] = [
  'intro',
  'reveal',
  'curtains',
  'diwali',
  'cards',
  'rocket',
  'diya',
  'greeting',
  'wish',
];

export interface PersonalizationData {
  rawName: string | null;
  sanitizedName: string | null;
  displayName: string;
  uppercaseName: string;
  hasCustomName: boolean;
}

export const DEFAULT_RECIPIENT_NAME = 'Ashutosh Srivastav';

export const FALLBACK_BASE_URL =
  'https://ais-pre-22fy4j4qiud4amgsz6ehli-997349425360.asia-east1.run.app';

export function getBaseUrl(): string {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const envUrl = metaEnv?.VITE_BASE_URL || process.env.VITE_BASE_URL || process.env.APP_URL;
  if (envUrl && envUrl.trim().length > 0 && envUrl !== 'MY_APP_URL') {
    return envUrl.trim().replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return (window.location.origin + window.location.pathname).replace(/\/+$/, '');
  }
  return FALLBACK_BASE_URL;
}

export function sanitizeRecipientName(input: string | null | undefined): string | null {
  if (!input) return null;
  const cleaned = input
    .replace(/[<>"'`\\]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return null;
  return cleaned.slice(0, 48);
}

export function formatDisplayName(sanitized: string | null): string {
  if (!sanitized) return DEFAULT_RECIPIENT_NAME;
  return sanitized
    .split(' ')
    .map((word) => {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function parsePersonalizationFromSearch(searchString: string): PersonalizationData {
  const params = new URLSearchParams(searchString);
  const rawParam = params.get('name');
  const sanitized = sanitizeRecipientName(rawParam);
  const displayName = formatDisplayName(sanitized);

  return {
    rawName: rawParam,
    sanitizedName: sanitized,
    displayName,
    uppercaseName: displayName.toUpperCase(),
    hasCustomName: Boolean(sanitized),
  };
}

export function resolveInitialSceneFromSearch(searchString: string): CeremonyScene {
  const params = new URLSearchParams(searchString);
  if (params.get('autostart') === '1') {
    return 'diwali';
  }
  const requestedScene = params.get('scene') as CeremonyScene | null;
  if (requestedScene && SCENE_ORDER.includes(requestedScene)) {
    return requestedScene;
  }
  return 'intro';
}

export function getNextScene(current: CeremonyScene): CeremonyScene {
  const idx = SCENE_ORDER.indexOf(current);
  if (idx === -1 || idx >= SCENE_ORDER.length - 1) {
    return 'wish';
  }
  return SCENE_ORDER[idx + 1];
}

export function getPrevScene(current: CeremonyScene): CeremonyScene {
  const idx = SCENE_ORDER.indexOf(current);
  if (idx <= 0) {
    return 'intro';
  }
  return SCENE_ORDER[idx - 1];
}

export function buildPersonalizedUrl(baseUrl?: string, recipientName?: string): string {
  const resolvedBase = (baseUrl && baseUrl.trim().length > 0 ? baseUrl : getBaseUrl())
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+$/, '');
  const sanitized = sanitizeRecipientName(recipientName);
  if (!sanitized) {
    return `${resolvedBase}/`;
  }
  return `${resolvedBase}/?name=${encodeURIComponent(sanitized)}`;
}

export function buildSocialShareLinks(personalizedUrl: string, recipientName: string) {
  const sanitized = sanitizeRecipientName(recipientName) || DEFAULT_RECIPIENT_NAME;
  const targetUrl =
    personalizedUrl && personalizedUrl.trim().length > 0
      ? personalizedUrl
      : buildPersonalizedUrl(getBaseUrl(), sanitized);
  const shareText = `A Grand Diwali Celebration has been specially created for ${sanitized}! Open your personalized Diwali inauguration:`;
  const encodedText = encodeURIComponent(`${shareText} ${targetUrl}`);
  const encodedUrl = encodeURIComponent(targetUrl);
  const encodedTweetText = encodeURIComponent(shareText);

  return {
    shareTitle: `Diwali Grand Inauguration for ${sanitized}`,
    shareText,
    whatsappUrl: `https://wa.me/?text=${encodedText}`,
    telegramUrl: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTweetText}`,
    twitterUrl: `https://twitter.com/intent/tweet?text=${encodedTweetText}&url=${encodedUrl}`,
  };
}
