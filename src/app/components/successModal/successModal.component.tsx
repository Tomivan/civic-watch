"use client";

import Link from 'next/link';
import { t } from '../../lib/i18n';
import NextStepsCard from '../nextStepsCard/nextStepsCard.component';
import styles from './page.module.css';

interface SuccessModalProps {
  referenceId?: string;
  category?: string;
  agencyId?: string;
  slaHours?: number;
}

const SuccessModal = ({
  referenceId,
  category,
  agencyId,
  slaHours,
}: SuccessModalProps) => {
  const resolvedReference = referenceId ?? 'LGS-84921';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resolvedReference);
    } catch {
      // noop
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: t('common.appName'),
          text: `${t('success.referenceId')}: ${resolvedReference}`,
        });
        return;
      } catch {
        // fall through to copy
      }
    }
    handleCopy();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2>{t('success.title')}</h2>
        <p>{t('success.body')}</p>

        <div className={styles.refBox}>
          <span>{t('success.referenceId')}</span>
          <strong>{resolvedReference}</strong>
        </div>

        {category && (
          <NextStepsCard
            referenceId={resolvedReference}
            category={category}
            agencyId={agencyId}
            slaHours={slaHours}
          />
        )}

        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleCopy}
          >
            {t('success.nextSteps.copyReference')}
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleShare}
          >
            {t('success.nextSteps.shareReference')}
          </button>
        </div>

        <Link href="/" className={styles.homeBtn}>
          {t('success.returnHome')}
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;