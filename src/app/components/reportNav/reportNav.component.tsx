"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Back from '../../../../public/assets/images/back.svg';
import Shield from '../../../../public/assets/images/shield.svg';
import Dark from '../../../../public/assets/images/dark.svg';
import Light from '../../../../public/assets/images/light.svg';
import Logo from '../../../../public/assets/images/logo.svg';
import { useAuthStore } from '../../store/authStore';
import { t } from '../../lib/i18n';
import styles from './page.module.css';
import LanguageSwitcher from '../languageSwitcher/languageSwitcher.component';

const ReportNav = () => {
  const router = useRouter();
  const { user, isAdmin } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftGroup}>
        <button
          type="button"
          className={styles.backBtn}
          aria-label="Go back to home"
          onClick={() => router.push('/')}
        >
          <Image src={Back} alt="Go back" width={20} height={20} />
        </button>
        <div className={styles.logoText}>
          <h1 className={styles.logoTitle}>{t('nav.reportIncident')}</h1>
          <p>{t('common.tagline')} · {t('signIn.title')}</p>
        </div>
      </div>

      <div className={styles.rightGroup}>
        <span className={styles.encryptedBadge}>
          <Image src={Shield} alt="Shield" width={16} height={16} />
          Encrypted
        </span>

        {user ? (
          <span className={styles.userEmail} title={user.email ?? ''}>
            {isAdmin ? '🛡️ ' : ''}
            {user.email}
          </span>
        ) : (
          <Link href="/signin" className={styles.signInBtn}>
            {t('common.signIn')}
          </Link>
        )}

        <LanguageSwitcher />

        <button
          type="button"
          className={styles.iconBtn}
          aria-label={t('nav.darkMode')}
          onClick={toggleDarkMode}
        >
          <Image
            src={isDarkMode ? Light : Dark}
            alt={isDarkMode ? t('nav.lightMode') : t('nav.darkMode')}
            width={20}
            height={20}
          />
        </button>

        <div className={styles.brandGroup}>
          <div className={styles.brandIcon}>
            <Image src={Logo} alt="Civic Watch Logo" width={28} height={28} />
          </div>
          <h1 className={styles.brandTitle}>
            Civic<span className={styles.logoHighlight}>Watch</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ReportNav;