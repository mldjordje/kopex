export type Language = 'sr' | 'en' | 'de';

export const LANGUAGE_COOKIE = 'kopex_lang';

export type LanguageParam = string | string[] | null | undefined;

export const normalizeLanguage = (value?: string | null): Language => {
  const normalized = value?.toLowerCase();
  if (normalized === 'en' || normalized === 'de' || normalized === 'sr') {
    return normalized;
  }
  return 'sr';
};

export const resolveLanguage = (param?: LanguageParam, fallback?: string | null): Language => {
  if (Array.isArray(param)) {
    return normalizeLanguage(param[0]);
  }
  if (typeof param === 'string' && param.trim()) {
    return normalizeLanguage(param);
  }
  return normalizeLanguage(fallback);
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

export const getLanguageLocale = (language: Language): string => {
  switch (language) {
    case 'en':
      return 'en-US';
    case 'de':
      return 'de-DE';
    default:
      return 'sr-RS';
  }
};

export const getOpenGraphLocale = (language: Language): string => {
  switch (language) {
    case 'en':
      return 'en_US';
    case 'de':
      return 'de_DE';
    default:
      return 'sr_RS';
  }
};
