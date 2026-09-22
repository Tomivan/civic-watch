"use client";

import { useEffect, useState } from 'react';
import { t } from '../../lib/i18n';
import styles from './page.module.css';

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [queued, setQueued] = useState(0);

  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);

    const readQueue = () => {
      try {
        const raw = localStorage.getItem('civicwatch:queue');
        const parsed = raw ? JSON.parse(raw) : [];
        setQueued(Array.isArray(parsed) ? parsed.length : 0);
      } catch {
        setQueued(0);
      }
    };
    readQueue();

    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <span className={styles.text}>
        {t('offline.banner')}
        {queued > 0 ? ` · ${t('offline.queued', { count: queued })}` : ''}
      </span>
    </div>
  );
};

export default OfflineBanner;