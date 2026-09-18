"use client";

import { SyntheticEvent } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { ReportData } from '../../report-incident/page';
import ArrowLeftIcon from '../../../../public/assets/images/back.svg';
import ArrowRightIcon from '../../../../public/assets/images/arrow-right.svg';
import GpsIcon from '../../../../public/assets/images/gps.svg';

interface Props {
  data: ReportData;
  onUpdate: (fields: Partial<ReportData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Location = ({ data, onUpdate, onNext, onBack }: Props) => {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className={styles.mainCard}>
      <div className={styles.mainHeader}>
        <h1>Where is this happening?</h1>
        <p>An accurate location lets the assigned agency dispatch to the right street the first time.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="button" className={styles.gpsBanner}>
          <div className={styles.gpsIconBox}>
            <Image src={GpsIcon} alt="GPS" width={20} height={20} />
          </div>
          <div className={styles.gpsText}>
            <strong>Use current GPS location in Lagos</strong>
            <p>Coordinates are attached to the report, never to your identity.</p>
          </div>
        </button>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Street address or description <span className={styles.required}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={`${styles.input} ${styles.inputWithIcon}`}
              placeholder="e.g. 14 Allen Avenue, near Computer Village"
              value={data.address}
              onChange={(e) => onUpdate({ address: e.target.value })}
              required
            />
          </div>
          <p className={styles.helperText}>Street name and number, or the closest junction.</p>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Area / LGA <span className={styles.required}>*</span>
            </label>
            <select
              className={styles.select}
              value={data.area}
              onChange={(e) => onUpdate({ area: e.target.value })}
              required
            >
              <option value="Ikeja">Ikeja</option>
              <option value="Oshodi">Oshodi</option>
              <option value="Surulere">Surulere</option>
              <option value="Eti-Osa">Eti-Osa</option>
              <option value="Lagos Island">Lagos Island</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nearest landmark</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. Ikeja City Mall"
              value={data.landmark}
              onChange={(e) => onUpdate({ landmark: e.target.value })}
            />
            <p className={styles.helperText}>Optional but speeds up dispatch.</p>
          </div>
        </div>

        <div className={styles.mapPreview}>
          <div className={styles.mapCanvas}>
            <div className={styles.mapPinWrapper}>
              <div className={styles.mapPinPulse} />
              <span className={styles.mapPinLabel}>{data.area}</span>
            </div>
          </div>
          <div className={styles.mapFooter}>
            <span className={styles.mapFooterLabel}>Location preview</span>
            <p className={styles.mapFooterText}>
              Pin placed in <strong>{data.area}</strong>, Lagos State. Drag-accurate mapping is applied when the agency opens the report.
            </p>
          </div>
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

export default Location;