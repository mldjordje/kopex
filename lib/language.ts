export type Language = 'sr' | 'en' | 'de';

export const LANGUAGE_COOKIE = 'kopex_lang';

export const normalizeLanguage = (value?: string | null): Language => {
  const normalized = value?.toLowerCase();
  if (normalized === 'en' || normalized === 'de' || normalized === 'sr') {
    return normalized;
  }
  return 'sr';
};

export const getLanguageLabel = (language: Language): string => {
  switch (language) {
    case 'en':
      return 'EN';
    case 'de':
      return 'DE';
    default:
      return 'SR';
  }
};
