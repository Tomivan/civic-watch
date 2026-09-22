"use client";

import { useState, SyntheticEvent } from 'react';
import Image from 'next/image';
import Navbar from '../components/navbar/navbar.component';
import Location from '../../../public/assets/images/location.svg';
import Environment from '../../../public/assets/images/environment.svg';
import Timer from '../../../public/assets/images/timer.svg';
import High from '../../../public/assets/images/high.svg';
import Residents from '../../../public/assets/images/residents.svg';
import Updates from '../../../public/assets/images/updates.svg';
import ShieldIcon from '../../../public/assets/images/shield.svg';
import VerificationBadge from '../components/verificationBadge/verificationBadge.component';
import EscalationButton from '../components/escalationButton/escalationButton.component';
import { isEscalationDue } from '../config/sla';
import { t } from '../lib/i18n';
import { REGION } from '../config/constants';
import { formatRelativeTime } from '../lib/format';
import styles from './reports.module.css';

interface Report {
  id: string;
  referenceId: string;
  title: string;
  description: string;
  area: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  agency?: string;
  createdAt: Date;
  residentsConfirmed?: number;
  officialUpdates?: number;
  verified?: boolean;
}

const SAMPLE_REPORTS: Report[] = [
  {
    id: 'r-1',
    referenceId: 'LGS-84920',
    title: 'Blocked drainage causing flooding',
    description:
      'Drainage is blocked with debris, water has been standing for 3 days and is now entering nearby shops.',
    area: 'Oshodi · Oshodi-Isolo LGA',
    category: 'environment',
    priority: 'high',
    status: 'in-progress',
    agency: 'LASEMA',
    createdAt: new Date(Date.now() - 22 * 60 * 1000),
    residentsConfirmed: 41,
    officialUpdates: 3,
  },
  {
    id: 'r-2',
    referenceId: 'LGS-84911',
    title: 'Streetlight fault on Allen Avenue',
    description:
      'Streetlight out for over a week. Confirmed as a feeder fault and queued for repair.',
    area: 'Ikeja · Ikeja LGA',
    category: 'infrastructure',
    priority: 'medium',
    status: 'open',
    agency: 'LASG Works',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    residentsConfirmed: 12,
    officialUpdates: 1,
  },
];

const PRIORITY_LABEL_KEY: Record<string, string> = {
  low: 'priorities.low',
  medium: 'priorities.medium',
  high: 'priorities.high',
};

const STATUS_LABEL_KEY: Record<string, string> = {
  open: 'statuses.open',
  'in-progress': 'statuses.in-progress',
  resolved: 'statuses.resolved',
};

const CATEGORY_LABEL_KEY: Record<string, string> = {
  infrastructure: 'wizard.category.infrastructure.title',
  environment: 'wizard.category.environment.title',
  sanitation: 'wizard.category.sanitation.title',
  safety: 'wizard.category.safety.title',
};

const Reports = () => {
  const [trackOpen, setTrackOpen] = useState(false);
  const [trackValue, setTrackValue] = useState('');
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupBusy, setLookupBusy] = useState(false);

  const reports = SAMPLE_REPORTS;

  const handleOpenTrack = () => {
    setTrackValue('');
    setLookupError(null);
    setTrackOpen(true);
  };

  const handleCloseTrack = () => {
    setTrackOpen(false);
    setLookupError(null);
  };

  const handleLookup = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLookupError(null);

    const normalized = trackValue.trim().toUpperCase();
    if (!normalized) {
      setLookupError('Please enter a reference ID.');
      return;
    }

    setLookupBusy(true);
    try {
      // Wire to findReportByReferenceId(normalized) when the backend is live.
      // For now, surface a friendly placeholder.
      await new Promise((r) => setTimeout(r, 400));
      setLookupError('No report found for that reference ID.');
    } finally {
      setLookupBusy(false);
    }
  };

  return (
    <div className={styles.reportPage}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{t('reports.title')}</h1>
          <div className={styles.lower}>
            <p className={styles.subtitle}>
              {t('reports.subtitle')} — {REGION.name}, {REGION.country}
            </p>
            <button
              type="button"
              className={styles.trackBtn}
              onClick={handleOpenTrack}
            >
              Track Reference by ID
            </button>
          </div>
        </div>

        <span className={styles.span}>{t('privacy.noPii')}</span>

        {reports.length === 0 ? (
          <p className={styles.empty}>{t('reports.empty')}</p>
        ) : (
          reports.map((report) => (
            <div key={report.id} className={styles.issueCard}>
              <div className={styles.cardBorderLeft} />
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleGroup}>
                    <Image src={Environment} alt="" width={20} height={20} />
                    <h3>{report.title}</h3>
                  </div>
                  <div className={styles.cardHeaderRight}>
                    <VerificationBadge verified={!!report.verified} />
                    <span className={styles.statusBadge}>
                      <Image src={Timer} alt="" width={16} height={16} />
                      {t(STATUS_LABEL_KEY[report.status])}
                    </span>
                  </div>
                </div>

                <p className={styles.cardMeta}>
                  <Image src={Location} alt="" width={16} height={16} />
                  {report.area}
                </p>

                <p className={styles.cardMeta}>
                  <Image src={Timer} alt="" width={16} height={16} />
                  {formatRelativeTime(report.createdAt)}
                </p>

                <p className={styles.cardDescription}>{report.description}</p>

                <div className={styles.tagGroup}>
                  <span className={styles.tagHigh}>
                    <Image src={High} alt="" width={16} height={16} />
                    {t(PRIORITY_LABEL_KEY[report.priority])}
                  </span>
                  <span className={styles.tagEnv}>
                    {t(CATEGORY_LABEL_KEY[report.category]).toUpperCase()}
                  </span>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.footerStats}>
                    <span>
                      <Image src={Residents} alt="" width={16} height={16} />
                      {report.residentsConfirmed ?? 0} residents confirmed
                    </span>
                    <span>
                      <Image src={Updates} alt="" width={16} height={16} />
                      {report.officialUpdates ?? 0} official updates
                    </span>
                  </div>
                  <div className={styles.cardFooterRight}>
                    {isEscalationDue(
                      report.category,
                      report.status,
                      report.createdAt
                    ) && (
                      <EscalationButton
                        reportId={report.id}
                        onEscalate={(id) => {
                          console.log(id);
                        }}
                      />
                    )}
                    <span className={styles.agency}>
                      {report.agency ?? '—'}
                      <span className={styles.referenceId}>
                        {' '}
                        · {report.referenceId}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {trackOpen && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseTrack();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderText}>
                <h2>Track an existing report</h2>
                <p>
                  No account needed. Your reference ID is the only thing
                  required.
                </p>
              </div>
              <button
                type="button"
                className={styles.modalClose}
                onClick={handleCloseTrack}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form className={styles.modalForm} onSubmit={handleLookup}>
              <label htmlFor="reference" className={styles.modalLabel}>
                Reference ID <span className={styles.required}>*</span>
              </label>
              <input
                id="reference"
                type="text"
                value={trackValue}
                onChange={(e) => setTrackValue(e.target.value.toUpperCase())}
                placeholder="LGS-00000"
                className={styles.modalInput}
                autoFocus
                required
              />
              <p className={styles.modalHelper}>For example LGS-84920</p>

              <div className={styles.privacyNote}>
                <Image src={ShieldIcon} alt="" width={18} height={18} />
                <span>
                  Looking up a report never reveals who filed it. Anonymous
                  reports stay anonymous.
                </span>
              </div>

              {lookupError && (
                <p className={styles.modalError} role="alert">
                  {lookupError}
                </p>
              )}

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.modalCancel}
                  onClick={handleCloseTrack}
                  disabled={lookupBusy}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.modalSubmit}
                  disabled={lookupBusy || !trackValue.trim()}
                >
                  {lookupBusy ? 'Looking up…' : 'Look up report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;