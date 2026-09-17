import Image from 'next/image';
import Back from '../../../../public/assets/images/back.svg';
import Shield from '../../../../public/assets/images/shield.svg';
import Dark from '../../../../public/assets/images/dark.svg';
import Logo from '../../../../public/assets/images/logo.svg';
import styles from './page.module.css';

const ReportNav = () => {
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
            <Image src={Back} alt="go back icon" width={50} height={50} />
            <div className={styles.logoText}>
                <h1 className={styles.logoTitle}>Report an Incident</h1>
                <p>Lagos State CivicWatch Intake</p>
            </div>
        </div>
        <p>
            <Image src={Shield} alt="shield icon" width={20} height={20} />
            Encrypted
        </p>
        <Image src={Dark} alt="dark mode icon" width={50} height={50} />
        <div className={styles.logo}>
            <Image src={Logo} alt="Civic Watch Logo" width={50} height={50} />
            <div className={styles.logoText}>
                <h1 className={styles.logoTitle}>Civic <span className={styles.logoHighlight}>Watch</span></h1>
            </div>
        </div>
    </div>
  )
}

export default ReportNav;