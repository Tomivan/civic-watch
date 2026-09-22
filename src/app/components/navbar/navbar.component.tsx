"use client";

import { useState, ChangeEvent, KeyboardEvent, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../../public/assets/images/logo.svg';
import Issues from '../../../../public/assets/images/issues.svg';
import Reports from '../../../../public/assets/images/reports.svg';
import NotificationsIcon from '../../../../public/assets/images/notification.svg';
import Dark from '../../../../public/assets/images/dark.svg';
import Light from '../../../../public/assets/images/light.svg';
import Add from '../../../../public/assets/images/add.svg';
import Notifications from '../notifications/notifications.component';
import HowItWorks from '../howItWorks/howItWorks.component';
import { useAuthStore } from '../../store/authStore';
import { t } from '../../lib/i18n';
import styles from './navbar.module.css';
import LanguageSwitcher from '../languageSwitcher/languageSwitcher.component';


const Navbar = () => {
  const router = useRouter();
  const { user, isAdmin, logout } = useAuthStore();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }, [isDarkMode]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>, close: () => void) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <Image src={Logo} alt="Civic Watch Logo" width={50} height={50} />
          <div className={styles.logoText}>
            <h1 className={styles.logoTitle}>
              Civic <span className={styles.logoHighlight}>Watch</span>
            </h1>
            <p>{t('common.tagline')}</p>
          </div>
        </Link>

        <div className={styles.links}>
          <Link href="/">
            <Image src={Issues} alt="" width={20} height={20} className={styles.linkIcon} />
            <span>{t('nav.publicIssues')}</span>
          </Link>
          <Link href="/reports">
            <Image src={Reports} alt="" width={20} height={20} className={styles.linkIcon} />
            <span>{t('nav.myReports')}</span>
          </Link>
        </div>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder={t('nav.searchPlaceholder')}
            className={styles.search}
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleSearchSubmit}
          />
          {!isOnline && <span className={styles.offlineDot} aria-hidden />}
        </div>

        <div className={styles.icons}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setIsNotificationsOpen(true)}
            aria-label={t('nav.notifications')}
          >
            <Image src={NotificationsIcon} alt="" width={40} height={40} className={styles.icon} />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setIsHowItWorksOpen(true)}
            aria-label={t('nav.howItWorks')}
          >
            <FontAwesomeIcon icon={faCog} size="1x" className={styles.icon1} />
          </button>

          <LanguageSwitcher />

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label={isDarkMode ? t('nav.lightMode') : t('nav.darkMode')}
          >
            <Image
              src={isDarkMode ? Light : Dark}
              alt=""
              width={40}
              height={40}
              className={styles.icon}
            />
          </button>
        </div>

        {user ? (
          <div className={styles.userMenu}>
            <span className={styles.userEmail} title={user.email ?? ''}>
              {isAdmin ? '🛡️ ' : ''}
              {user.email}
            </span>
            <button className={styles.signOutBtn} onClick={logout}>
              {t('common.signOut')}
            </button>
          </div>
        ) : (
          <Link href="/signin" className={styles.signInBtn}>
            {t('common.signIn')}
          </Link>
        )}

        <Link href="/report-incident" className={styles.reportLink}>
          <button className={styles.addButton}>
            <Image src={Add} alt="" width={20} height={20} className={styles.addIcon} />
            <span>{t('nav.reportIncident')}</span>
          </button>
        </Link>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>

      {!isOnline && (
        <div className={styles.offlineBanner} role="status">
          {t('offline.banner')}
        </div>
      )}

      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMobileMenuOpen(false)}>
          <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileDrawerHeader}>
              <div className={styles.logo}>
                <Image src={Logo} alt="Civic Watch Logo" width={40} height={40} />
                <div className={styles.logoText}>
                  <h1 className={styles.logoTitle}>
                    Civic <span className={styles.logoHighlight}>Watch</span>
                  </h1>
                </div>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={t('common.close')}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <input
              type="text"
              placeholder={t('nav.searchPlaceholder')}
              className={styles.mobileSearch}
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleSearchSubmit}
            />

            <div className={styles.mobileLinks}>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src={Issues} alt="" width={20} height={20} className={styles.linkIcon} />
                <span>{t('nav.publicIssues')}</span>
              </Link>
              <Link href="/reports" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src={Reports} alt="" width={20} height={20} className={styles.linkIcon} />
                <span>{t('nav.myReports')}</span>
              </Link>
            </div>

            <div className={styles.mobileIcons}>
              <button
                type="button"
                className={styles.mobileIconButton}
                onClick={() => {
                  setIsNotificationsOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Image src={NotificationsIcon} alt="" width={22} height={22} />
                <span>{t('nav.notifications')}</span>
              </button>

              <button
                type="button"
                className={styles.mobileIconButton}
                onClick={() => {
                  setIsHowItWorksOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faCog} />
                <span>{t('nav.howItWorks')}</span>
              </button>

              <button
                type="button"
                className={styles.mobileIconButton}
                onClick={() => setIsDarkMode((prev) => !prev)}
              >
                <Image
                  src={isDarkMode ? Light : Dark}
                  alt=""
                  width={22}
                  height={22}
                />
                <span>{isDarkMode ? t('nav.lightMode') : t('nav.darkMode')}</span>
              </button>
            </div>

            {user ? (
              <div className={styles.mobileUserBlock}>
                <span className={styles.userEmail} title={user.email ?? ''}>
                  {isAdmin ? '🛡️ ' : ''}
                  {user.email}
                </span>
                <button className={styles.signOutBtn} onClick={logout}>
                  {t('common.signOut')}
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className={styles.mobileSignInLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('common.signIn')}
              </Link>
            )}

            <Link
              href="/report-incident"
              className={styles.mobileReportLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image src={Add} alt="" width={20} height={20} className={styles.addIcon} />
              {t('nav.reportIncident')}
            </Link>
          </div>
        </div>
      )}

      {isNotificationsOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => handleOverlayClick(e, () => setIsNotificationsOpen(false))}
        >
          <Notifications onClose={() => setIsNotificationsOpen(false)} />
        </div>
      )}

      {isHowItWorksOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => handleOverlayClick(e, () => setIsHowItWorksOpen(false))}
        >
          <HowItWorks onClose={() => setIsHowItWorksOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;