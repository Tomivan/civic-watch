import en from '../locales/en.json';

type Locale = 'en' | 'pcm' | 'yo' | 'ha' | 'ig';

const dictionaries: Record<Locale, any> = {
  en,
  pcm: en,
  yo: en,
  ha: en,
  ig: en,
};

const DEFAULT_LOCALE: Locale = 'en';

const get = (obj: any, path: string): string | undefined => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export const translate = (
  key: string,
  vars?: Record<string, string | number>,
  locale: Locale = DEFAULT_LOCALE
): string => {
  const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
  let value = get(dict, key) ?? key;

  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    });
  }

  return value;
};

export const getLocale = (): Locale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem('locale') as Locale | null;
  return stored ?? DEFAULT_LOCALE;
};

export const setLocale = (locale: Locale) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('locale', locale);
  document.documentElement.lang = locale;
};

export const supportedLocales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'pcm', label: 'Pidgin' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'ha', label: 'Hausa' },
  { code: 'ig', label: 'Igbo' },
];

export const t = translate;