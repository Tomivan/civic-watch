"use client";

import Image from 'next/image';
import ShieldIcon from '../../../../public/assets/images/shield.svg';
import EyeOffIcon from '../../../../public/assets/images/eye-off.svg';
import LockIcon from '../../../../public/assets/images/lock.svg';
import { t } from '../../lib/i18n';
import styles from './page.module.css';

interface Props {
  anonymous: boolean;
  onChange: (value: boolean) => void;
  locked?: boolean;
}

const PrivacyCard = ({ anonymous, onChange, locked }: Props) => (
  <div className={styles.privacyCard}>
    <div className={styles.privacyHeader}>
      <Image src={ShieldIcon} alt="" width={16} height={16} />
      <span>{t('privacy.title')}</span>
    </div>
    <div className={styles.privacyBody}>
      <div className={styles.toggleRow}>
        <button
          type="button"
          className={`${styles.toggleSwitch} ${anonymous ? styles.toggleOn : ''}`}
          onClick={() => !locked && onChange(!anonymous)}
          disabled={locked}
          aria-pressed={anonymous}
          aria-label={t('privacy.anonymousLabel')}
        >
          <span className={styles.toggleKnob} />
        </button>
        <div className={styles.toggleText}>
          <strong>{t('privacy.anonymousLabel')}</strong>
          <p>{locked ? t('privacy.lockedHelp') : t('privacy.anonymousHelp')}</p>
        </div>
      </div>
      <div className={styles.privacyDivider} />
      <div className={styles.privacyNote}>
        <Image src={EyeOffIcon} alt="" width={14} height={14} />
        <span>{t('privacy.noPii')}</span>
      </div>
      <div className={styles.privacyNote}>
        <Image src={LockIcon} alt="" width={14} height={14} />
        <span>{t('privacy.encrypted')}</span>
      </div>
    </div>
  </div>
);

export default PrivacyCard;