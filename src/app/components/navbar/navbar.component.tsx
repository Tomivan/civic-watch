import Logo from '../../../../public/assets/images/logo.svg';
import Issues from '../../../../public/assets/images/issues.svg';
import Reports from '../../../../public/assets/images/reports.svg';
import Notifications from '../../../../public/assets/images/notification.svg';
import Dark from '../../../../public/assets/images/dark.svg';
import Add from '../../../../public/assets/images/add.svg';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.logo}>
            <Image src={Logo} alt="Civic Watch Logo" width={50} height={50} />
            <div className={styles.logoText}>
                <h1 className={styles.logoTitle}>Civic <span className={styles.logoHighlight}>Watch</span></h1>
                <p>Lagos State Civic Reporting</p>
            </div>
        </div>
        <div className={styles.links}>
            <a href="/">
              <Image src={Issues} alt="Public Issues" width={20} height={20} className={styles.linkIcon} />
              <span>Public Issues</span>
            </a>
            <a href="/reports">
                <Image src={Reports} alt="My Reports" width={20} height={20} className={styles.linkIcon} />
                <span>My Reports</span>
            </a>
        </div>
        <input type="text" placeholder="Search reports, locations, ..." className={styles.search} />
        <div className={styles.icons}>
            <Image src={Notifications} alt="Notifications" width={40} height={40} className={styles.icon} />
            <FontAwesomeIcon icon={faCog} size="1x" color="#0f5730" className={styles.icon1} />
            <Image src={Dark} alt="Dark Mode" width={40} height={40} className={styles.icon} />
        </div>
        <button className={styles.addButton}>
            <Image src={Add} alt="Add Report" width={20} height={20} className={styles.addIcon} />
            Report Incident
        </button>
    </nav>
  );
};

export default Navbar;