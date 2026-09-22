import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { t } from '../../lib/i18n';
import styles from './page.module.css';

interface Props {
  phone?: string;
  website?: string;
  email?: string;
}

const ContactLinks = ({ phone, website, email }: Props) => {
  if (!phone && !website && !email) return null;

  return (
    <div className={styles.group}>
      {phone && (
        <a href={`tel:${phone}`} className={styles.link}>
          <FontAwesomeIcon icon={faPhone} size="sm" />
          {phone}
        </a>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <FontAwesomeIcon icon={faGlobe} size="sm" />
          {t('success.nextSteps.visitWebsite')}
        </a>
      )}
      {email && (
        <a href={`mailto:${email}`} className={styles.link}>
          <FontAwesomeIcon icon={faEnvelope} size="sm" />
          {email}
        </a>
      )}
    </div>
  );
};

export default ContactLinks;