"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { t } from '../../lib/i18n';
import styles from './page.module.css';

interface Props {
  onAccept: () => void;
}

const ConsentScreen = ({ onAccept }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <FontAwesomeIcon icon={faShieldHalved} />
      </div>

      <h2 className={styles.title}>Before you sign in</h2>
      <p className={styles.body}>
        Here is exactly what we store and how your data is handled.
      </p>

      <ul className={styles.list}>
        <li>Your email is used only to link reports to your account.</li>
        <li>Anonymous reports never attach your identity.</li>
        <li>Photos have metadata stripped before publishing.</li>
        <li>You can delete your account and data at any time.</li>
      </ul>

      <button type="button" className={styles.accept} onClick={onAccept}>
        I understand — continue
      </button>
    </div>
  );
};

export default ConsentScreen;