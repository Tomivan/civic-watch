import { useState, SyntheticEvent } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

import InfrastructureIcon from '../../../../public/assets/images/infrastructure.svg';
import EnvironmentIcon from '../../../../public/assets/images/environment.svg';
import SanitationIcon from '../../../../public/assets/images/sanitation.svg';
import SafetyIcon from '../../../../public/assets/images/safety.svg';
import ShieldIcon from '../../../../public/assets/images/shield.svg';
import CheckIcon from '../../../../public/assets/images/check.svg';
import ArrowLeftIcon from '../../../../public/assets/images/back.svg';
import ArrowRightIcon from '../../../../public/assets/images/arrow-right.svg';
import EyeOffIcon from '../../../../public/assets/images/eye-off.svg';
import LockIcon from '../../../../public/assets/images/lock.svg';

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: StaticImageData;
  restricted?: boolean;
}

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();

  const steps = [
    { id: 1, label: 'Category', active: true, completed: false },
    { id: 2, label: 'Description', active: false, completed: false },
    { id: 3, label: 'Location', active: false, completed: false },
    { id: 4, label: 'Media & privacy', active: false, completed: false },
  ];

  const categories: CategoryItem[] = [
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      description: 'Roads, bridges, streetlights, public buildings',
      icon: InfrastructureIcon,
    },
    {
      id: 'environment',
      title: 'Environment',
      description: 'Drainage, flooding, air and water pollution',
      icon: EnvironmentIcon,
    },
    {
      id: 'sanitation',
      title: 'Sanitation',
      description: 'Waste collection, illegal dumping, public hygiene',
      icon: SanitationIcon,
    },
    {
      id: 'safety',
      title: 'Personal Safety / GBV',
      description: 'Handled on a restricted, confidential channel',
      icon: SafetyIcon,
      restricted: true,
    },
  ];

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCategory) return;
    router.push('/report/description');
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.stepper}>
          {steps.map((step) => (
            <div
              key={step.id}
              className={`${styles.stepItem} ${
                step.active ? styles.stepActive : ''
              } ${step.completed ? styles.stepCompleted : ''}`}
            >
              <div className={styles.stepNumber}>
                {step.completed ? (
                  <Image src={CheckIcon} alt="Completed" width={14} height={14} />
                ) : (
                  step.id
                )}
              </div>
              <span className={styles.stepLabel}>{step.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.privacyCard}>
          <div className={styles.privacyHeader}>
            <Image src={ShieldIcon} alt="Shield" width={16} height={16} />
            <span>Privacy</span>
          </div>
          <div className={styles.privacyBody}>
            <div className={styles.toggleRow}>
              <div className={styles.toggleSwitch}>
                <div className={styles.toggleKnob} />
              </div>
              <div className={styles.toggleText}>
                <strong>Submit Anonymously</strong>
                <p>Your identity will be hidden from the public dashboard.</p>
              </div>
            </div>
            <div className={styles.privacyDivider} />
            <div className={styles.privacyNote}>
              <Image src={EyeOffIcon} alt="Hidden" width={14} height={14} />
              <span>No name, phone number or email is attached to this report.</span>
            </div>
            <div className={styles.privacyNote}>
              <Image src={LockIcon} alt="Encrypted" width={14} height={14} />
              <span>Submission is encrypted in transit, and photo location metadata is stripped.</span>
            </div>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
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
                  className={`${styles.categoryCard} ${
                    selectedCategory === cat.id ? styles.categorySelected : ''
                  } ${cat.restricted ? styles.categoryRestricted : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
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
                  {selectedCategory === cat.id && (
                    <div className={styles.checkBadge}>
                      <Image src={CheckIcon} alt="Selected" width={14} height={14} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={selectedCategory}
              required
              readOnly
              className={styles.hiddenInput}
            />

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
      </main>
    </div>
  );
};

export default Category;