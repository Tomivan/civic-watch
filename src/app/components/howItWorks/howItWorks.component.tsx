"use client";

import { MouseEvent } from 'react';
import { t } from '../../lib/i18n';
import ContactLinks from '../contactLinks/contactLinks.component';
import { EMERGENCY_NUMBERS, REGION, AGENCIES } from '../../config/constants';
import styles from './page.module.css';

interface HowItWorksProps {
  onClose: () => void;
}

const primaryAgency = AGENCIES[0];

const HowItWorks = ({ onClose }: HowItWorksProps) => {
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>{t('howItWorks.title')}</h1>
            <p>{t('howItWorks.subtitle')}</p>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t('common.close')}
          >
            ✕
          </button>
        </div>
        <hr />
        <section className={styles.howItWorksSection}>
          <p>
            <strong>{t('howItWorks.step1Title')}</strong>{' '}
            {t('howItWorks.step1Body')}
          </p>
          <p>
            <strong>{t('howItWorks.step2Title')}</strong>{' '}
            {t('howItWorks.step2Body')}
          </p>
          <p>
            <strong>{t('howItWorks.step3Title')}</strong>{' '}
            {t('howItWorks.step3Body')}
          </p>
          <p>
            <strong>{t('howItWorks.step4Title')}</strong>{' '}
            {t('howItWorks.step4Body')}
          </p>
        </section>
        <div className={styles.emergencySection}>
          <p>
            {t('howItWorks.emergency', {
              primary: EMERGENCY_NUMBERS.primary ?? '767',
              secondary: EMERGENCY_NUMBERS.secondary ?? '112',
            })}
          </p>
           <ContactLinks
            phone={primaryAgency.phone}
            website={primaryAgency.website}
            email={primaryAgency.email}
          />
          <p className={styles.serviceHours}>
            {REGION.serviceHours.weekday} · {REGION.serviceHours.emergency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;