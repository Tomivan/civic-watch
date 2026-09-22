"use client";

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShareNodes,
  faCopy
} from '@fortawesome/free-solid-svg-icons';
import { REGION, AGENCIES, CATEGORY_SLA_HOURS } from '../../config/constants';
import { t } from '../../lib/i18n';
import ClockIcon from '../../../../public/assets/images/timer.svg';
import ContactLinks from '../contactLinks/contactLinks.component';
import styles from './page.module.css';

interface Props {
  referenceId: string;
  category: string;
  agencyId?: string;
  slaHours?: number;
}

const NextStepsCard = ({ referenceId, category, agencyId, slaHours }: Props) => {
  const routedAgencyIds = REGION.categoryRouting[category] ?? [];
  const agency =
    AGENCIES.find((a) => a.id === agencyId) ??
    AGENCIES.find((a) => routedAgencyIds.includes(a.id)) ??
    AGENCIES[0];

  const resolvedSlaHours = slaHours ?? CATEGORY_SLA_HOURS[category] ?? 72;
  const escalationHours = resolvedSlaHours * 2;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referenceId);
    } catch {
      // noop
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: t('common.appName'),
          text: `${t('success.referenceId')}: ${referenceId}`,
        });
        return;
      } catch {
        // user dismissed or share failed — fall through to copy
      }
    }
    handleCopy();
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{t('success.nextSteps.title')}</h3>

      <ol className={styles.list}>
        <li>
          <span className={styles.bullet}>1</span>
          <span>{t('success.nextSteps.step1', { agency: agency.name })}</span>
        </li>
        <li>
          <span className={styles.bullet}>2</span>
          <span className={styles.withIcon}>
            <Image src={ClockIcon} alt="" width={14} height={14} />
            {t('success.nextSteps.step2', { slaHours: resolvedSlaHours })}
          </span>
        </li>
        <li>
          <span className={styles.bullet}>3</span>
          <span>{t('success.nextSteps.step3')}</span>
        </li>
      </ol>

      <div className={styles.escalation}>
        {t('success.nextSteps.escalation', { escalationHours })}
      </div>

      <div className={styles.actions}>
            <ContactLinks
                phone={agency.phone}
                website={agency.website}
                email={agency.email}
            />
            <button type="button" className={styles.action} onClick={handleCopy}>
                <FontAwesomeIcon icon={faCopy} size="sm" />
                {t('success.nextSteps.copyReference')}
            </button>
            <button type="button" className={styles.action} onClick={handleShare}>
                <FontAwesomeIcon icon={faShareNodes} size="sm" />
                {t('success.nextSteps.shareReference')}
            </button>
        </div>
    </div>
  );
};

export default NextStepsCard;