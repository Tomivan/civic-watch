import { MouseEvent } from 'react';
import styles from './page.module.css';

interface NotificationsProps {
  onClose: () => void;
}

const Notifications = ({ onClose }: NotificationsProps) => {
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
            <h1>Notifications</h1>
            <p>Updates on reports you are following.</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <hr />
        <div className={styles.notificationList}>
          <p><strong>LGS-84920 assigned to LASEMA</strong></p>
          <p>Drainage clearance crew scheduled for Oshodi service lane within 24 hours.</p>
          <p>18 min ago</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;