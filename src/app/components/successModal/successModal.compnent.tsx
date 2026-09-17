import Link from 'next/link';
import styles from './page.module.css';

interface SuccessModalProps {
  referenceId?: string;
}

const SuccessModal = ({ referenceId }: SuccessModalProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2>Report Submitted Successfully</h2>
        <p>
          Your report has been securely submitted. Response teams will review the details shortly.
        </p>
        <div className={styles.refBox}>
          <span>Reference ID</span>
          <strong>{referenceId ?? 'LGS-84921'}</strong>
        </div>
        <Link href="/" className={styles.homeBtn}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;