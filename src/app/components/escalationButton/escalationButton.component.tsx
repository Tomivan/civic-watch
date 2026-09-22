"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { t } from '../../lib/i18n';
import styles from './page.module.css';

interface Props {
  reportId: string;
  onEscalate?: (reportId: string) => void;
}

const EscalationButton = ({ reportId, onEscalate }: Props) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => onEscalate?.(reportId)}
    >
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
      {t('issues.escalate')}
    </button>
  );
};

export default EscalationButton;