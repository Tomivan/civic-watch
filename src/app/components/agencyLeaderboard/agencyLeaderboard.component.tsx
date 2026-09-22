import { REGION } from '../../config/constants';
import styles from './page.module.css';

interface AgencyStat {
  id: string;
  name: string;
  openCount: number;
  resolvedCount: number;
  medianResponseHours: number;
}

const SAMPLE_STATS: AgencyStat[] = [
  { id: 'lasema', name: 'LASEMA', openCount: 4, resolvedCount: 12, medianResponseHours: 8 },
  { id: 'lawma', name: 'LAWMA', openCount: 6, resolvedCount: 9, medianResponseHours: 26 },
  { id: 'lamata', name: 'LAMATA', openCount: 3, resolvedCount: 5, medianResponseHours: 48 },
  { id: 'lasg-works', name: 'LASG Works', openCount: 2, resolvedCount: 3, medianResponseHours: 72 },
];

const formatHours = (h: number) =>
  h < 24 ? `${h}h` : `${Math.round(h / 24)}d`;

const AgencyLeaderboard = () => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Agency response times</h3>
      <p className={styles.subtitle}>This month in {REGION.name}</p>

      <ul className={styles.list}>
        {SAMPLE_STATS.map((a) => (
          <li key={a.id} className={styles.item}>
            <span className={styles.agencyName}>{a.name}</span>
            <span className={styles.stat}>
              <strong>{formatHours(a.medianResponseHours)}</strong>
              <span className={styles.statLabel}>median</span>
            </span>
            <span className={styles.stat}>
              <strong>{a.resolvedCount}</strong>
              <span className={styles.statLabel}>resolved</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgencyLeaderboard;