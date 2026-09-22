"use client";

import Image, { StaticImageData } from 'next/image';
import Location from '../../../../public/assets/images/location.svg';
import Infrastructure from '../../../../public/assets/images/infrastructure.svg';
import Environment from '../../../../public/assets/images/environment.svg';
import Sanitation from '../../../../public/assets/images/sanitation.svg';
import Timer from '../../../../public/assets/images/timer.svg';
import High from '../../../../public/assets/images/high.svg';
import Residents from '../../../../public/assets/images/residents.svg';
import Updates from '../../../../public/assets/images/updates.svg';
import { t } from '../../lib/i18n';
import { REGION } from '../../config/constants';
import VerificationBadge from '../../components/verificationBadge/verificationBadge.component';
import AgencyLeaderboard from '../../components/agencyLeaderboard/agencyLeaderboard.component';
import SlaTracker from '../../components/slaTracker/slaTracker.component';
import { formatRelativeTime } from '../../lib/format';
import styles from './civicIssues.module.css';

interface Report {
  id: string;
  title: string;
  description: string;
  area: string;
  category: string;
  priority: string;
  status: 'open' | 'in-progress' | 'resolved';
  agencyId?: string;
  createdAt: Date;
  residentsConfirmed?: number;
  officialUpdates?: number;
  verified?: boolean;
}

const SAMPLE_REPORTS: Report[] = [
  {
    id: 'sample-1',
    title: 'Blocked drainage causing flooding',
    description:
      'Drainage is blocked with debris, water has been standing for 3 days and is now entering nearby shops.',
    area: 'Oshodi · Oshodi-Isolo LGA',
    category: 'environment',
    priority: 'high',
    status: 'in-progress',
    agencyId: 'lasema',
    createdAt: new Date(Date.now() - 22 * 60 * 1000),
    residentsConfirmed: 41,
    officialUpdates: 3,
  },
  {
    id: 'sample-2',
    title: 'Broken streetlight on main road',
    description:
      'The streetlight has been out for over a week. The area is very dark at night and residents feel unsafe.',
    area: 'Ikeja · Ikeja LGA',
    category: 'infrastructure',
    priority: 'high',
    status: 'open',
    agencyId: 'lasg-works',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    residentsConfirmed: 12,
    officialUpdates: 1,
  },
  {
    id: 'sample-3',
    title: 'Illegal dumping on vacant lot',
    description:
      'People have been dumping refuse on the empty plot next to the school. It is attracting rodents.',
    area: 'Surulere · Surulere LGA',
    category: 'sanitation',
    priority: 'high',
    status: 'open',
    agencyId: 'lawma',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    residentsConfirmed: 27,
    officialUpdates: 0,
  },
];

const CATEGORY_ICON: Record<string, StaticImageData> = {
  infrastructure: Infrastructure,
  environment: Environment,
  sanitation: Sanitation,
};

const CATEGORY_LABEL_KEY: Record<string, string> = {
  infrastructure: 'wizard.category.infrastructure.title',
  environment: 'wizard.category.environment.title',
  sanitation: 'wizard.category.sanitation.title',
  safety: 'wizard.category.safety.title',
};

const PRIORITY_CLASS: Record<string, string> = {
  high: 'tagHigh',
  medium: 'tagMedium',
  low: 'tagLow',
};

const PRIORITY_LABEL_KEY: Record<string, string> = {
  high: 'priorities.high',
  medium: 'priorities.medium',
  low: 'priorities.low',
};

const STATUS_LABEL_KEY: Record<string, string> = {
  open: 'statuses.open',
  'in-progress': 'statuses.in-progress',
  resolved: 'statuses.resolved',
};

const STATUS_CLASS: Record<string, string> = {
  open: 'statusOpen',
  'in-progress': 'statusInProgress',
  resolved: 'statusResolved',
};

const findAgencyName = (id?: string): string | undefined =>
  REGION.agencies.find((a) => a.id === id)?.name;

const CivicIssues = () => {
  const reports = SAMPLE_REPORTS;

  const openCount = reports.filter((r) => r.status === 'open').length;
  const resolvedCount = reports.filter((r) => r.status === 'resolved').length;
  const highCount = reports.filter((r) => r.priority === 'high').length;

  const categoryCounts = reports.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <p className={styles.location}>
            <Image
              src={Location}
              alt=""
              width={16}
              height={16}
              className={styles.locationIcon}
            />
            {REGION.name}, {REGION.country} · Ikeja & surrounding LGAs
          </p>
          <h1>{t('issues.title')}</h1>
          <p className={styles.subtitle}>
            {t('issues.subtitle', { region: REGION.name })}
          </p>
        </div>

        <div className={styles.filterGroup} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected="true"
            className={`${styles.filterBtn} ${styles.active}`}
          >
            All issues <span className={styles.badgeActive}>{reports.length}</span>
          </button>
          {Object.entries(CATEGORY_ICON).map(([id, icon]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected="false"
              className={styles.filterBtn}
            >
              <Image src={icon} alt="" width={16} height={16} />
              {t(CATEGORY_LABEL_KEY[id])}{' '}
              <span className={styles.badge}>{categoryCounts[id] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className={styles.statusTabs}>
          <div className={styles.tabsLeft} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected="true"
              className={`${styles.tabBtn} ${styles.tabActive}`}
            >
              All
            </button>
            <button type="button" role="tab" aria-selected="false" className={styles.tabBtn}>
              Open
            </button>
            <button type="button" role="tab" aria-selected="false" className={styles.tabBtn}>
              In Progress
            </button>
            <button type="button" role="tab" aria-selected="false" className={styles.tabBtn}>
              Resolved
            </button>
          </div>
          <span className={styles.reportCount}>
            {reports.length} reports
          </span>
        </div>

        {reports.map((report) => {
          const Icon = CATEGORY_ICON[report.category] ?? Environment;
          const agencyName = findAgencyName(report.agencyId);

          return (
            <div key={report.id} className={styles.issueCard}>
              <div className={styles.cardBorderLeft} />
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardTitleGroup}>
                        <Image src={Icon} alt="" width={20} height={20} />
                        <h3>{report.title}</h3>
                    </div>
                    <div className={styles.cardHeaderRight}>
                        <VerificationBadge
                        verified={!!report.verified}
                        count={report.residentsConfirmed}
                        />
                        <span className={`${styles.statusBadge} ${styles[STATUS_CLASS[report.status]]}`}>
                            <Image src={Timer} alt="" width={16} height={16} className={styles.timerIcon} />
                            {t(STATUS_LABEL_KEY[report.status])}
                        </span>
                    </div>
                </div>

                <p className={styles.cardMeta}>
                  <Image
                    src={Location}
                    alt=""
                    width={16}
                    height={16}
                    className={styles.locationIcon}
                  />
                  {report.area}
                </p>

                <p className={styles.cardMeta}>
                  <Image
                    src={Timer}
                    alt=""
                    width={16}
                    height={16}
                    className={styles.timerIcon}
                  />
                  {formatRelativeTime(report.createdAt)}
                </p>

                <SlaTracker
                category={report.category}
                status={report.status}
                createdAt={report.createdAt}
                />

                <p className={styles.cardDescription}>{report.description}</p>

                <div className={styles.tagGroup}>
                  <span className={styles[PRIORITY_CLASS[report.priority]]}>
                    <Image src={High} alt="" width={16} height={16} className={styles.highIcon} />
                    {t(PRIORITY_LABEL_KEY[report.priority])}
                  </span>
                  <span className={styles.tagEnv}>
                    {t(CATEGORY_LABEL_KEY[report.category]).toUpperCase()}
                  </span>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.footerStats}>
                    <span>
                      <Image src={Residents} alt="" width={16} height={16} className={styles.residentsIcon} />
                      {report.residentsConfirmed ?? 0} residents confirmed
                    </span>
                    <span>
                      <Image src={Updates} alt="" width={16} height={16} className={styles.updatesIcon} />
                      {report.officialUpdates ?? 0} official updates
                    </span>
                  </div>
                  {agencyName && <span className={styles.agency}>{agencyName}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <aside className={styles.sidebar}>
        <div className={styles.sidebarCard}>
          <h3>Report map</h3>
          <p className={styles.cardSubtitle}>Live reports across {REGION.name}</p>
          <div className={styles.mapDummy}>
            <div className={styles.mapBackground} />
            <div className={`${styles.pin} ${styles.pinRed}`} style={{ top: '25%', left: '35%' }} />
            <div className={`${styles.pin} ${styles.pinRed}`} style={{ top: '40%', left: '55%' }} />
            <div className={`${styles.pin} ${styles.pinYellow}`} style={{ top: '20%', left: '45%' }} />
            <div className={`${styles.pin} ${styles.pinYellow}`} style={{ top: '60%', left: '70%' }} />
            <div className={`${styles.pin} ${styles.pinGreen}`} style={{ top: '30%', left: '80%' }} />
            <div className={styles.mapLabel}>{REGION.name} · stylised</div>
          </div>

          <div className={styles.mapLegend}>
            <span>
              <span className={styles.dotRed} /> {t('priorities.high').toUpperCase()}
            </span>
            <span>
              <span className={styles.dotYellow} /> {t('priorities.medium').toUpperCase()}
            </span>
            <span>
              <span className={styles.dotGreen} /> {t('priorities.low').toUpperCase()}
            </span>
          </div>
        </div>

        <div className={styles.sidebarCard}>
          <h3>This week in {REGION.name}</h3>
          <ul className={styles.statsList}>
            <li>
              <span>{t('statuses.open')}</span>
              <strong>{openCount}</strong>
            </li>
            <li>
              <span>{t('priorities.high')} urgency</span>
              <strong className={styles.textRed}>{highCount}</strong>
            </li>
            <li>
              <span>{t('statuses.resolved')}</span>
              <strong>{resolvedCount}</strong>
            </li>
            <li>
              <span>Median response</span>
              <strong>2h 40m</strong>
            </li>
          </ul>
        </div>
        <AgencyLeaderboard />
      </aside>
    </div>
  );
};

export default CivicIssues;