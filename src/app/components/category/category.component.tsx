"use client";

import { SyntheticEvent } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import styles from './page.module.css';
import { ReportData } from '../../report-incident/page';
import { t } from '../../lib/i18n';
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
    {
      id: 'infrastructure',
      title: t('wizard.category.infrastructure.title'),
      description: t('wizard.category.infrastructure.description'),
      icon: InfrastructureIcon,
    },
    {
      id: 'environment',
      title: t('wizard.category.environment.title'),
      description: t('wizard.category.environment.description'),
      icon: EnvironmentIcon,
    },
    {
      id: 'sanitation',
      title: t('wizard.category.sanitation.title'),
      description: t('wizard.category.sanitation.description'),
      icon: SanitationIcon,
    },
    {
      id: 'safety',
      title: t('wizard.category.safety.title'),
      description: t('wizard.category.safety.description'),
      icon: SafetyIcon,
      restricted: true,
    },
  ];

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data.category) return;
    onNext();
  };

  return (
    <div className={styles.mainCard}>
      <div className={styles.mainHeader}>
        <h1>{t('wizard.category.title')}</h1>
        <p>{t('wizard.category.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.categoryGrid} role="radiogroup" aria-label={t('wizard.category.title')}>
          {categories.map((cat) => {
            const selected = data.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`${styles.categoryCard} ${
                  selected ? styles.categorySelected : ''
                } ${cat.restricted ? styles.categoryRestricted : ''}`}
                onClick={() => onUpdate({ category: cat.id })}
              >
                <div className={styles.categoryIcon}>
                  <Image src={cat.icon} alt="" width={24} height={24} />
                </div>
                <div className={styles.categoryInfo}>
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  {cat.restricted && (
                    <div className={styles.restrictedBadge}>
                      <Image src={LockIcon} alt="" width={12} height={12} />
                      {t('wizard.category.restrictedBadge')}
                    </div>
                  )}
                </div>
                {selected && (
                  <div className={styles.checkBadge} aria-hidden="true">
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="1x"
                      color="#ffffff"
                      className={styles.icon1}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className={styles.footerNav}>
          <Link href="/" className={styles.cancelBtn}>
            <Image src={ArrowLeftIcon} alt="" width={16} height={16} />
            {t('common.cancel')}
          </Link>
          <button
            type="submit"
            className={styles.continueBtn}
            disabled={!data.category}
          >
            {t('common.continue')}
            <Image src={ArrowRightIcon} alt="" width={16} height={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Category;