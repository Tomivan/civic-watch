"use client";

import Location from '../../../../public/assets/images/location.svg';
import Infrastructure from '../../../../public/assets/images/infrastructure.svg';
import Environment from '../../../../public/assets/images/environment.svg';
import Sanitation from '../../../../public/assets/images/sanitation.svg';
import Timer from '../../../../public/assets/images/timer.svg';
import High from '../../../../public/assets/images/high.svg';
import Residents from '../../../../public/assets/images/residents.svg';
import Updates from '../../../../public/assets/images/updates.svg';
import Image from 'next/image';
import styles from './civicIssues.module.css';

const CivicIssues = () => {
  return (
    <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
            <div className={styles.header}>
                <p className={styles.location}>
                    <Image src={Location} alt="Location Icon" width={16} height={16} className={styles.locationIcon}/>
                    Lagos, Nigeria · Ikeja & surrounding LGAs
                </p>
                <h1>Civic Issues Near You</h1>
                <p className={styles.subtitle}>
                7 open reports and 3 resolved in the last 30 days, routed to the responsible Lagos State agency.
                </p>
            </div>

            <div className={styles.filterGroup}>
                <button className={`${styles.filterBtn} ${styles.active}`}>
                 All issues <span className={styles.badgeActive}>10</span>
                </button>
                <button className={styles.filterBtn}>
                    <Image src={Infrastructure} alt="Infrastructure Icon" width={16} height={16} />
                    Infrastructure <span className={styles.badge}>5</span>
                </button>
                <button className={styles.filterBtn}>
                    <Image src={Environment} alt="Environment Icon" width={16} height={16} />
                    Environment <span className={styles.badge}>3</span>
                </button>
                <button className={styles.filterBtn}>
                    <Image src={Sanitation} alt="Sanitation Icon" width={16} height={16} />
                     Sanitation <span className={styles.badge}>2</span>
                </button>
            </div>

            <div className={styles.statusTabs}>
                <div className={styles.tabsLeft}>
                    <button className={`${styles.tabBtn} ${styles.tabActive}`}>All</button>
                    <button className={styles.tabBtn}>Open</button>
                    <button className={styles.tabBtn}>Resolved</button>
                </div>
                <span className={styles.reportCount}>10 reports</span>
            </div>

            <div className={styles.issueCard}>
                <div className={styles.cardBorderLeft}></div>
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitleGroup}>
                            <Image src={Environment} alt="Environment Icon" width={20} height={20} />
                            <h3>Blocked drainage causing flooding</h3>
                        </div>
                        <span className={styles.statusBadge}>
                            <Image src={Timer} alt="Timer Icon" width={16} height={16} className={styles.timerIcon}/>
                             IN PROGRESS
                        </span>
                    </div>
            
                    <p className={styles.cardMeta}>
                        <Image src={Location} alt="Location Icon" width={16} height={16} className={styles.locationIcon}/> 
                        Oshodi  Oshodi-Isolo LGA 
                    </p>

                    <p className={styles.cardMeta}>
                        <Image src={Timer} alt="Timer Icon" width={16} height={16} className={styles.timerIcon}/>
                        22 min ago
                    </p>

                    <div className={styles.tagGroup}>
                        <span className={styles.tagHigh}>
                            <Image src={High} alt="High Priority Icon" width={16} height={16} className={styles.highIcon}/>
                            HIGH
                        </span>
                        <span className={styles.tagEnv}>ENVIRONMENT</span>
                    </div>

                    <div className={styles.cardFooter}>
                        <div className={styles.footerStats}>
                            <span>
                                <Image src={Residents} alt="Residents Icon" width={16} height={16} className={styles.residentsIcon} />
                                41 residents confirmed
                            </span>
                            <span>
                                <Image src={Updates} alt="Updates Icon" width={16} height={16} className={styles.updatesIcon} />
                                 3 official updates
                            </span>
                        </div>
                        <span className={styles.agency}>LASEMA</span>
                    </div>
                </div>
            </div>
        </main>

        <aside className={styles.sidebar}>
            
            <div className={styles.sidebarCard}>
                <h3>Report map</h3>
                <p className={styles.cardSubtitle}>Live reports across Lagos State</p>
                <div className={styles.mapDummy}>
                    <div className={styles.mapBackground}></div>
                    <div className={`${styles.pin} ${styles.pinRed}`} style={{ top: '25%', left: '35%' }}></div>
                    <div className={`${styles.pin} ${styles.pinRed}`} style={{ top: '40%', left: '55%' }}></div>
                    <div className={`${styles.pin} ${styles.pinYellow}`} style={{ top: '20%', left: '45%' }}></div>
                    <div className={`${styles.pin} ${styles.pinYellow}`} style={{ top: '60%', left: '70%' }}></div>
                    <div className={`${styles.pin} ${styles.pinGreen}`} style={{ top: '30%', left: '80%' }}></div>
                    <div className={styles.mapLabel}>Lagos State · stylised</div>
                </div>
          
                <div className={styles.mapLegend}>
                    <span><span className={styles.dotRed}></span> HIGH</span>
                    <span><span className={styles.dotYellow}></span> MEDIUM</span>
                    <span><span className={styles.dotGreen}></span> LOW</span>
                </div>
            </div>
            <div className={styles.sidebarCard}>
                <h3>This week in Lagos</h3>
                <ul className={styles.statsList}>
                    <li>
                        <span>Open reports</span>
                        <strong>7</strong>
                    </li>
                    <li>
                        <span>High urgency</span>
                        <strong className={styles.textRed}>3</strong>
                    </li>
                    <li>
                        <span>Resolved</span>
                        <strong>3</strong>
                    </li>
                    <li>
                        <span>Median response</span>
                        <strong>2h 40m</strong>
                    </li>
                </ul>
          
            </div>

        </aside>
    </div>
  );
};

export default CivicIssues;