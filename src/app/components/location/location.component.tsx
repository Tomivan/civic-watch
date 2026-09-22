"use client";

import { useState, SyntheticEvent } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { ReportData } from '../../report-incident/page';
import { t } from '../../lib/i18n';
import { LGAS, REGION } from '../../config/constants';
import GeolocationPrompt from '../geolocationPrompt/geolocationPrompt.component';
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
  const [gpsBusy, setGpsBusy] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [promptOpen, setPromptOpen] = useState(true);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  const handleGps = () => {
    setGpsError(null);

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGpsError('Location is not supported on this device.');
      return;
    }

    setGpsBusy(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setGpsBusy(false);
        if (!data.address) {
          onUpdate({ address: 'Current GPS location' });
        }
      },
      (err) => {
        setGpsBusy(false);
        setGpsError(err.message || 'Unable to access GPS location.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div className={styles.mainCard}>
      <div className={styles.mainHeader}>
        <h1>{t('wizard.location.title')}</h1>
        <p>{t('wizard.location.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {promptOpen && !data.address && (
          <GeolocationPrompt
            busy={gpsBusy}
            onAllow={() => {
              setPromptOpen(false);
              handleGps();
            }}
            onSkip={() => setPromptOpen(false)}
          />
        )}
        <button
          type="button"
          className={styles.gpsBanner}
          onClick={handleGps}
          disabled={gpsBusy}
        >
          <div className={styles.gpsIconBox}>
            <Image src={GpsIcon} alt="" width={20} height={20} />
          </div>
          <div className={styles.gpsText}>
            <strong>
              {gpsBusy
                ? 'Locating…'
                : t('wizard.location.gpsTitle')}
            </strong>
            <p>{t('wizard.location.gpsSubtitle')}</p>
          </div>
        </button>

        {gpsError && (
          <p className={styles.helperText} role="alert">
            {gpsError}
          </p>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            {t('wizard.location.addressLabel')}{' '}
            <span className={styles.required}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="address"
              type="text"
              className={`${styles.input} ${styles.inputWithIcon}`}
              placeholder={t('wizard.location.addressPlaceholder')}
              value={data.address}
              onChange={(e) => onUpdate({ address: e.target.value })}
              required
            />
          </div>
          <p className={styles.helperText}>
            {t('wizard.location.addressHelper')}
          </p>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="area" className={styles.label}>
              {t('wizard.location.areaLabel')}{' '}
              <span className={styles.required}>*</span>
            </label>
            <select
              id="area"
              className={styles.select}
              value={data.area}
              onChange={(e) => onUpdate({ area: e.target.value })}
              required
            >
              {LGAS.map((lga) => (
                <option key={lga.id} value={lga.name}>
                  {lga.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="landmark" className={styles.label}>
              {t('wizard.location.landmarkLabel')}
            </label>
            <input
              id="landmark"
              type="text"
              className={styles.input}
              placeholder={t('wizard.location.landmarkPlaceholder')}
              value={data.landmark}
              onChange={(e) => onUpdate({ landmark: e.target.value })}
            />
            <p className={styles.helperText}>
              {t('wizard.location.landmarkHelper')}
            </p>
          </div>
        </div>

        <div className={styles.mapPreview}>
          <div className={styles.mapCanvas} aria-hidden="true">
            <div className={styles.mapPinWrapper}>
              <div className={styles.mapPinPulse} />
              <span className={styles.mapPinLabel}>{data.area}</span>
            </div>
          </div>
          <div className={styles.mapFooter}>
            <span className={styles.mapFooterLabel}>
              {t('wizard.location.mapLabel')}
            </span>
            <p className={styles.mapFooterText}>
              {t('wizard.location.mapDescription', {
                area: data.area,
                region: REGION.name,
              })}
            </p>
          </div>
        </div>

        <div className={styles.footerNav}>
          <button
            type="button"
            onClick={onBack}
            className={styles.cancelBtn}
          >
            <Image src={ArrowLeftIcon} alt="" width={16} height={16} />
            {t('common.back')}
          </button>
          <button
            type="submit"
            className={styles.continueBtn}
            disabled={!data.address || !data.area}
          >
            {t('common.continue')}
            <Image src={ArrowRightIcon} alt="" width={16} height={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Location;