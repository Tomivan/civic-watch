import { getSla, isEscalationDue, hoursOpen, formatDuration } from '../../config/sla';
import { t } from '../../lib/i18n';
import styles from './page.module.css';

interface Props {
  category: string;
  status: string;
  createdAt: Date;
}

const SlaTracker = ({ category, status, createdAt }: Props) => {
  if (status !== 'open' && status !== 'in-progress') return null;

  const sla = getSla(category);
  const elapsed = hoursOpen(createdAt);
  const due = isEscalationDue(category, status, createdAt);
  const remaining = Math.max(sla.escalationThresholdHours - elapsed, 0);

  return (
    <span className={`${styles.badge} ${due ? styles.due : ''}`}>
      {due
        ? t('issues.awaitingResponse')
        : `${formatDuration(remaining)} left`}
    </span>
  );
};

export default SlaTracker;