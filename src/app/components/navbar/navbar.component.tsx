"use client";

import { useState, ChangeEvent, KeyboardEvent, useEffect, MouseEvent } from 'react';
import Image from 'next/image';
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
import styles from './navbar.module.css';

const Navbar = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleOverlayClick = (
    e: MouseEvent<HTMLDivElement>,
    closeFn: () => void
  ) => {
    if (e.target === e.currentTarget) {
      closeFn();
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Civic Watch Logo" width={50} height={50} />
          <div className={styles.logoText}>
            <h1 className={styles.logoTitle}>
              Civic <span className={styles.logoHighlight}>Watch</span>
            </h1>
            <p>Lagos State Civic Reporting</p>
          </div>
        </div>

        <div className={styles.links}>
          <a href="/">
            <Image src={Issues} alt="Public Issues" width={20} height={20} className={styles.linkIcon} />
            <span>Public Issues</span>
          </a>
          <a href="/reports">
            <Image src={Reports} alt="My Reports" width={20} height={20} className={styles.linkIcon} />
            <span>My Reports</span>
          </a>
        </div>

        <input
          type="text"
          placeholder="Search reports, locations, ..."
          className={styles.search}
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={handleSearchSubmit}
        />

        <div className={styles.icons}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setIsNotificationsOpen(true)}
            aria-label="Open notifications"
          >
            <Image src={NotificationsIcon} alt="Notifications" width={40} height={40} className={styles.icon} />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setIsHowItWorksOpen(true)}
            aria-label="How it works"
          >
            <FontAwesomeIcon icon={faCog} size="1x" className={styles.icon1} />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label="Toggle dark mode"
          >
            <Image
              src={isDarkMode ? Light : Dark}
              alt={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              width={40}
              height={40}
              className={styles.icon}
            />
          </button>
        </div>

        <a href="/report-incident" className={styles.reportLink}>
          <button className={styles.addButton}>
            <Image src={Add} alt="Add Report" width={20} height={20} className={styles.addIcon} />
            <span>Report Incident</span>
          </button>
        </a>

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMobileMenu}>
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
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search reports, locations, ..."
              className={styles.mobileSearch}
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleSearchSubmit}
            />

            <div className={styles.mobileLinks}>
              <a href="/" onClick={closeMobileMenu}>
                <Image src={Issues} alt="Public Issues" width={20} height={20} className={styles.linkIcon} />
                <span>Public Issues</span>
              </a>
              <a href="/reports" onClick={closeMobileMenu}>
                <Image src={Reports} alt="My Reports" width={20} height={20} className={styles.linkIcon} />
                <span>My Reports</span>
              </a>
            </div>

            <div className={styles.mobileIcons}>
              <button
                type="button"
                className={styles.mobileIconButton}
                onClick={() => {
                  setIsNotificationsOpen(true);
                  closeMobileMenu();
                }}
              >
                <Image src={NotificationsIcon} alt="Notifications" width={22} height={22} />
                <span>Notifications</span>
              </button>

              <button
                type="button"
                className={styles.mobileIconButton}
                onClick={() => {
                  setIsHowItWorksOpen(true);
                  closeMobileMenu();
                }}
              >
                <FontAwesomeIcon icon={faCog} />
                <span>How it works</span>
              </button>

              <button
                type="button"
                className={styles.mobileIconButton}
                onClick={() => setIsDarkMode((prev) => !prev)}
              >
                <Image
                  src={isDarkMode ? Light : Dark}
                  alt={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  width={22}
                  height={22}
                />
                <span>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
              </button>
            </div>

            <a href="/report-incident" className={styles.mobileReportLink} onClick={closeMobileMenu}>
              <Image src={Add} alt="Add Report" width={20} height={20} className={styles.addIcon} />
              Report Incident
            </a>
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