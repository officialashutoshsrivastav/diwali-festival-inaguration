import { useState, useEffect, useCallback } from 'react';
import {
  PersonalizationData,
  parsePersonalizationFromSearch,
  sanitizeRecipientName,
  formatDisplayName,
} from '../utils/shareUtils';

export function usePersonalization() {
  const [personalization, setPersonalization] = useState<PersonalizationData>(() =>
    typeof window !== 'undefined'
      ? parsePersonalizationFromSearch(window.location.search)
      : parsePersonalizationFromSearch('')
  );

  useEffect(() => {
    const handlePopState = () => {
      setPersonalization(parsePersonalizationFromSearch(window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateRecipientName = useCallback((newName: string | null, updateUrl = true) => {
    const sanitized = sanitizeRecipientName(newName);
    const displayName = formatDisplayName(sanitized);

    if (updateUrl && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (sanitized) {
        url.searchParams.set('name', sanitized);
      } else {
        url.searchParams.delete('name');
      }
      window.history.pushState({}, '', url.toString());
    }

    setPersonalization({
      rawName: sanitized,
      sanitizedName: sanitized,
      displayName,
      uppercaseName: displayName.toUpperCase(),
      hasCustomName: Boolean(sanitized),
    });
  }, []);

  return {
    ...personalization,
    updateRecipientName,
  };
}
