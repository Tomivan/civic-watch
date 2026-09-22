"use client";

import { SyntheticEvent } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { ReportData } from '../../report-incident/page';
import { t } from '../../lib/i18n';
import {
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
} from '../../config/constants';
import VoiceInput from '../voiceInput/voiceInput.component';
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
        <h1>{t('wizard.description.title')}</h1>
        <p>{t('wizard.description.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="short-title" className={styles.label}>
            {t('wizard.description.shortTitle')}{' '}
            <span className={styles.required}>*</span>
          </label>
          <input
            id="short-title"
            type="text"
            className={styles.input}
            placeholder={t('wizard.description.shortPlaceholder')}
            value={data.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            required
          />
          <p className={styles.helperText}>
            {t('wizard.description.shortHelper')}
          </p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="full-description" className={styles.label}>
              {t('wizard.description.fullLabel')}{' '}
              <span className={styles.required}>*</span>
            </label>
            <VoiceInput
              onTranscript={(text) => {
                const next = data.description
                  ? `${data.description} ${text}`.trim()
                  : text;
                onUpdate({ description: next.slice(0, MAX_DESCRIPTION_LENGTH) });
              }}
            />
          </div>
          <textarea
            id="full-description"
            className={styles.textarea}
            placeholder={t('wizard.description.fullPlaceholder')}
            rows={6}
            value={data.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            required
            minLength={MIN_DESCRIPTION_LENGTH}
            maxLength={MAX_DESCRIPTION_LENGTH}
          />
          <p
            className={`${styles.charCount} ${
              data.description.length > 0 &&
              data.description.length < MIN_DESCRIPTION_LENGTH
                ? styles.charCountWarn
                : ''
            }`}
          >
            {t('wizard.description.charCount', {
              count: data.description.length,
            })}
          </p>
        </div>

        <div className={styles.guidanceBox}>
          <ul>
            <li>{t('wizard.description.guidance.duration')}</li>
            <li>{t('wizard.description.guidance.affected')}</li>
            <li>{t('wizard.description.guidance.privacy')}</li>
          </ul>
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
            disabled={data.description.length < MIN_DESCRIPTION_LENGTH}
          >
            {t('common.continue')}
            <Image src={ArrowRightIcon} alt="" width={16} height={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Description;