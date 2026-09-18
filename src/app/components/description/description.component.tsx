"use client";

import { SyntheticEvent } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { ReportData } from '../../report-incident/page';
import ArrowLeftIcon from '../../../../public/assets/images/back.svg';
import ArrowRightIcon from '../../../../public/assets/images/arrow-right.svg';

interface Props {
  data: ReportData;
  onUpdate: (fields: Partial<ReportData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Description = ({ data, onUpdate, onNext, onBack }: Props) => {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className={styles.mainCard}>
      <div className={styles.mainHeader}>
        <h1>Describe the incident</h1>
        <p>Be specific about what is happening and the nearest landmark. Response teams use this to prioritise.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Short title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            className={styles.input}
            placeholder="Summarise the issue in a few words"
            value={data.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            required
          />
          <p className={styles.helperText}>A one-line summary, e.g. &ldquo;Blocked drainage causing flooding&rdquo;.</p>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Full description <span className={styles.required}>*</span>
          </label>
          <textarea
            className={styles.textarea}
            placeholder="Describe what happened and where..."
            rows={6}
            value={data.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            required
            minLength={30}
            maxLength={600}
          />
          <p className={styles.charCount}>{data.description.length}/600 characters · minimum 30</p>
        </div>

        <div className={styles.guidanceBox}>
          <ul>
            <li>Include how long the issue has existed.</li>
            <li>Mention if people, homes or businesses are already affected.</li>
            <li>Do not include other people&apos;s personal details.</li>
          </ul>
        </div>

        <div className={styles.footerNav}>
          <button type="button" onClick={onBack} className={styles.cancelBtn}>
            <Image src={ArrowLeftIcon} alt="Back" width={16} height={16} />
            Back
          </button>
          <button type="submit" className={styles.continueBtn}>
            Continue
            <Image src={ArrowRightIcon} alt="Next" width={16} height={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Description;