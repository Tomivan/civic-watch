import { MouseEvent } from 'react';
import styles from './page.module.css';

interface HowItWorksProps {
  onClose: () => void;
}

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
            <h1>How CivicWatch Works</h1>
            <p>Reports are triaged and routed to the responsible Lagos State agency.</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <hr />
        <section className={styles.howItWorksSection}>
          <p><strong>1. Report in under two minutes.</strong> Pick a category, describe the issue, drop a location and attach photos or video.</p>
          <p><strong>2. Keep your reference ID.</strong> Every report returns an ID such as LGS-84920 that works without an account.</p>
          <p><strong>3. Track the response.</strong> Received → AI triage → agency assigned → resolution.</p>
          <p><strong>4. Sensitive reports stay private.</strong> Personal Safety / GBV reports are handled on a restricted channel and never appear in the public feed.</p>
        </section>
        <div className={styles.emergencySection}>
          <p>Emergency? Call the Lagos State toll-free emergency line <strong>767</strong> or <strong>112</strong> as well as filing a report.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;