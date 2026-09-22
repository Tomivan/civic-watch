"use client";

import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { supportedLocales, getLocale, setLocale, t } from '../../lib/i18n';
import styles from './page.module.css';

type Locale = 'en' | 'pcm' | 'yo' | 'ha' | 'ig';

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [locale, setLocaleState] = useState<Locale>('en');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLocaleState(getLocale() as Locale);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const choose = (next: Locale) => {
    setLocale(next);
    setLocaleState(next);
    setOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('nav.language')}
      >
        <FontAwesomeIcon icon={faGlobe} />
        <span className={styles.code}>{locale.toUpperCase()}</span>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {supportedLocales.map((l) => (
            <li key={l.code} role="option" aria-selected={locale === l.code}>
              <button
                type="button"
                className={`${styles.item} ${
                  locale === l.code ? styles.itemActive : ''
                }`}
                onClick={() => choose(l.code as Locale)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;