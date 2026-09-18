"use client";

import { SyntheticEvent } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import styles from './page.module.css';
import { ReportData } from '../../report-incident/page';
import InfrastructureIcon from '../../../../public/assets/images/infrastructure.svg';
import EnvironmentIcon from '../../../../public/assets/images/environment.svg';
import SanitationIcon from '../../../../public/assets/images/sanitation.svg';
import SafetyIcon from '../../../../public/assets/images/safety.svg';
import LockIcon from '../../../../public/assets/images/lock.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ArrowLeftIcon from '../../../../public/assets/images/back.svg';
import ArrowRightIcon from '../../../../public/assets/images/arrow-right.svg';

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: StaticImageData;
  restricted?: boolean;
}

interface Props {
  data: ReportData;
  onUpdate: (fields: Partial<ReportData>) => void;
  onNext: () => void;
}

const Category = ({ data, onUpdate, onNext }: Props) => {
  const categories: CategoryItem[] = [
    { id: 'infrastructure', title: 'Infrastructure', description: 'Roads, bridges, streetlights, public buildings', icon: InfrastructureIcon },
    { id: 'environment', title: 'Environment', description: 'Drainage, flooding, air and water pollution', icon: EnvironmentIcon },
    { id: 'sanitation', title: 'Sanitation', description: 'Waste collection, illegal dumping, public hygiene', icon: SanitationIcon },
    { id: 'safety', title: 'Personal Safety / GBV', description: 'Handled on a restricted, confidential channel', icon: SafetyIcon, restricted: true },
  ];

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.category) return;
    onNext();
  };

  return (
    <div className={styles.mainCard}>
        <div className={styles.mainHeader}>
            <h1>What kind of issue are you reporting?</h1>
            <p>This decides which Lagos State agency receives your report first.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.categoryGrid}>
                {categories.map((cat) => (
                    <button
                    key={cat.id}
                    type="button"
                    className={`${styles.categoryCard} ${data.category === cat.id ? styles.categorySelected : ''} ${cat.restricted ? styles.categoryRestricted : ''}`}
                    onClick={() => onUpdate({ category: cat.id })}
                    >
                        <div className={styles.categoryIcon}>
                            <Image src={cat.icon} alt={cat.title} width={24} height={24} />
                        </div>
                        <div className={styles.categoryInfo}>
                            <h3>{cat.title}</h3>
                            <p>{cat.description}</p>
                            {cat.restricted && (
                                <div className={styles.restrictedBadge}>
                                    <Image src={LockIcon} alt="Lock" width={12} height={12} />
                                    RESTRICTED CHANNEL
                                </div>
                                )}
                        </div>
                        {data.category === cat.id && (
                            <div className={styles.checkBadge}>
                                <FontAwesomeIcon icon={faCheck} size="1x" color="#ffffff" className={styles.icon1} />
                            </div>
                        )}
                    </button>
                ))}
            </div>
            
            <div className={styles.footerNav}>
                <Link href="/" className={styles.cancelBtn}>
                <Image src={ArrowLeftIcon} alt="Back" width={16} height={16} />
                    Cancel
                </Link>
                <button type="submit" className={styles.continueBtn}>
                    Continue
                    <Image src={ArrowRightIcon} alt="Next" width={16} height={16} />
                </button>
            </div>
        </form>
    </div>
  );
};

export default Category;