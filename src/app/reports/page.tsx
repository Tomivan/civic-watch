import Navbar from '../components/navbar/navbar.component';
import Location from '../../../public/assets/images/location.svg';
import Environment from '../../../public/assets/images/environment.svg';
import Timer from '../../../public/assets/images/timer.svg';
import High from '../../../public/assets/images/high.svg';
import Residents from '../../../public/assets/images/residents.svg';
import Updates from '../../../public/assets/images/updates.svg';
import Image from 'next/image';
import styles from './reports.module.css';

const Reports = () => {
    return (
        <div className={styles.reportPage}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>My Reports</h1>
                    <div className={styles.lower}>
                        <p className={styles.subtitle}>
                            Reports filed from this device. No account required — reference IDs are stored locally and can be looked up any time.
                        </p>
                        <button className={styles.trackBtn}>Track Reference by ID</button>
                    </div>
                </div>
                <span className={styles.span}>Reports you submitted anonymously appear here without linking your identity. Clearing this browser's storage removes the local list — keep your reference IDs somewhere safe.</span>

                <div className={styles.issueCard}>
                    <div className={styles.cardBorderLeft}></div>
                    <div className={styles.cardContent}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitleGroup}>
                                <Image src={Environment} alt="Environment Icon" width={20} height={20} />
                                <h3>Blocked drainage causing flooding</h3>
                            </div>
                            <span className={styles.statusBadge}>
                                <Image src={Timer} alt="Timer Icon" width={16} height={16} />
                                IN PROGRESS
                            </span>
                        </div>
                
                        <p className={styles.cardMeta}>
                            <Image src={Location} alt="Location Icon" width={16} height={16} /> 
                            Oshodi  Oshodi-Isolo LGA 
                        </p>

                        <p className={styles.cardMeta}>
                            <Image src={Timer} alt="Timer Icon" width={16} height={16} />
                            22 min ago
                        </p>

                        <div className={styles.tagGroup}>
                            <span className={styles.tagHigh}>
                                <Image src={High} alt="High Priority Icon" width={16} height={16} />
                                HIGH
                            </span>
                            <span className={styles.tagEnv}>ENVIRONMENT</span>
                        </div>

                        <div className={styles.cardFooter}>
                            <div className={styles.footerStats}>
                                <span>
                                    <Image src={Residents} alt="Residents Icon" width={16} height={16} />
                                    41 residents confirmed
                                </span>
                                <span>
                                    <Image src={Updates} alt="Updates Icon" width={16} height={16} />
                                    3 official updates
                                </span>
                            </div>
                            <span className={styles.agency}>LASEMA</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports;