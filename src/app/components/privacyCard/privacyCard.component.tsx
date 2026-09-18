import Image from 'next/image';
import ShieldIcon from '../../../../public/assets/images/shield.svg';
import EyeOffIcon from '../../../../public/assets/images/eye-off.svg';
import LockIcon from '../../../../public/assets/images/lock.svg';
import styles from './page.module.css';

const PrivacyCard = () => (
  <div className={styles.privacyCard}>
    <div className={styles.privacyHeader}>
      <Image src={ShieldIcon} alt="Shield" width={16} height={16} />
      <span>Privacy</span>
    </div>
    <div className={styles.privacyBody}>
      <div className={styles.toggleRow}>
        <div className={styles.toggleSwitch}>
          <div className={styles.toggleKnob} />
        </div>
        <div className={styles.toggleText}>
          <strong>Submit Anonymously</strong>
          <p>Your identity will be hidden from the public dashboard.</p>
        </div>
      </div>
      <div className={styles.privacyDivider} />
      <div className={styles.privacyNote}>
        <Image src={EyeOffIcon} alt="Hidden" width={14} height={14} />
        <span>No name, phone number or email is attached to this report.</span>
      </div>
      <div className={styles.privacyNote}>
        <Image src={LockIcon} alt="Encrypted" width={14} height={14} />
        <span>Submission is encrypted in transit, and photo location metadata is stripped.</span>
      </div>
    </div>
  </div>
);

export default PrivacyCard;