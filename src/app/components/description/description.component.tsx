import { useState, SyntheticEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

import ShieldIcon from '../../../../public/assets/images/shield.svg';
import EyeOffIcon from '../../../../public/assets/images/eye-off.svg';
import LockIcon from '../../../../public/assets/images/lock.svg';
import CheckIcon from '../../../../public/assets/images/check.svg';
import ArrowLeftIcon from '../../../../public/assets/images/back.svg';
import ArrowRightIcon from '../../../../public/assets/images/arrow-right.svg';

const Description = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const router = useRouter();

  const steps = [
    { id: 1, label: 'Category', active: false, completed: true },
    { id: 2, label: 'Description', active: true, completed: false },
    { id: 3, label: 'Location', active: false, completed: false },
    { id: 4, label: 'Media & privacy', active: false, completed: false },
  ];

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/report/location');
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
            <h1>Describe the incident</h1>
            <p>Be specific about what is happening and the nearest landmark. Response teams use this to prioritise.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Short title <span className={styles.required}>*</span>
              </label>
              <input
                id="title"
                type="text"
                className={styles.input}
                placeholder="Summarise the issue in a few words"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <p className={styles.helperText}>
                A one-line summary, e.g. &ldquo;Blocked drainage causing flooding&rdquo;.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Full description <span className={styles.required}>*</span>
              </label>
              <textarea
                id="description"
                className={styles.textarea}
                placeholder="Describe what happened and where..."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={30}
                maxLength={600}
              />
              <p className={styles.charCount}>
                {description.length}/600 characters · minimum 30
              </p>
            </div>

            <div className={styles.guidanceBox}>
              <ul>
                <li>Include how long the issue has existed.</li>
                <li>Mention if people, homes or businesses are already affected.</li>
                <li>Do not include other people&apos;s personal details.</li>
              </ul>
            </div>

            <div className={styles.footerNav}>
              <Link href="/report/category" className={styles.cancelBtn}>
                <Image src={ArrowLeftIcon} alt="Back" width={16} height={16} />
                Back
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

export default Description;