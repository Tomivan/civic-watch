"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Back from '../../../../public/assets/images/back.svg';
import Shield from '../../../../public/assets/images/shield.svg';
import Dark from '../../../../public/assets/images/dark.svg';
import Light from '../../../../public/assets/images/light.svg';
import Logo from '../../../../public/assets/images/logo.svg';
import styles from './page.module.css';

const ReportNav = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const handleBack = () => {
    router.push('/');
  };

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
          onClick={handleBack}
        >
          <Image src={Back} alt="Go back" width={20} height={20} />
        </button>
        <div className={styles.logoText}>
          <h1 className={styles.logoTitle}>Report an Incident</h1>
          <p>Lagos State · CivicWatch intake</p>
        </div>
      </div>

      <div className={styles.rightGroup}>
        <span className={styles.encryptedBadge}>
          <Image src={Shield} alt="Shield" width={16} height={16} />
          Encrypted
        </span>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Toggle dark mode"
          onClick={toggleDarkMode}
        >
          <Image
            src={isDarkMode ? Light : Dark}
            alt={isDarkMode ? 'Light mode' : 'Dark mode'}
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