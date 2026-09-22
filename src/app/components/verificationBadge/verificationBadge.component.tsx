import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { t } from '../../lib/i18n';
import styles from './page.module.css';

interface Props {
  verified: boolean;
  count?: number;
}

const VerificationBadge = ({ verified, count }: Props) => {
  if (!verified) return null;

  return (
    <span className={styles.badge} title={t('issues.verified')}>
      <FontAwesomeIcon icon={faCircleCheck} size="sm" />
      {count && count > 1
        ? t('issues.verifiedBy', { count })
        : t('issues.verified')}
    </span>
  );
};

export default VerificationBadge;