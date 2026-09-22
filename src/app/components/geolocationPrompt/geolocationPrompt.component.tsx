"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

interface Props {
  onAllow: () => void;
  onSkip: () => void;
  busy?: boolean;
}

const GeolocationPrompt = ({ onAllow, onSkip, busy }: Props) => {
  return (
    <div className={styles.prompt}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faLocationCrosshairs} />
      </div>
      <div className={styles.text}>
        <strong>Auto-detect your LGA?</strong>
        <p>We&apos;ll use your current location to fill in the area automatically.</p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={onAllow} disabled={busy}>
          {busy ? 'Locating…' : 'Allow'}
        </button>
        <button type="button" className={styles.ghost} onClick={onSkip} disabled={busy}>
          Not now
        </button>
      </div>
    </div>
  );
};

export default GeolocationPrompt;