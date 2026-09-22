"use client";

import { useState, useRef, ChangeEvent, SyntheticEvent } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { ReportData } from '../../report-incident/page';
import { t } from '../../lib/i18n';
import {
  MAX_MEDIA_FILES,
  MAX_MEDIA_SIZE_MB,
} from '../../config/constants';
import { compressImage } from '../../components/imageCompressor/imageCompressor.component';
import { stripMetadata } from '../../lib/metadata';
import ArrowLeftIcon from '../../../../public/assets/images/back.svg';
import UploadIcon from '../../../../public/assets/images/upload.svg';
import CameraIcon from '../../../../public/assets/images/take-photo.svg';
import ImageIcon from '../../../../public/assets/images/upload-photo.svg';
import VideoIcon from '../../../../public/assets/images/upload-video.svg';
import ShieldIcon from '../../../../public/assets/images/shield.svg';

interface Props {
  data: ReportData;
  onBack: () => void;
  onSubmit: (mediaUrls?: string[]) => Promise<void>;
  submitting: boolean;
}

interface QueuedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

const ACCEPT_PHOTO = 'image/jpeg,image/png,image/heic,image/heif';
const ACCEPT_VIDEO = 'video/mp4,video/quicktime';

const MAX_BYTES = MAX_MEDIA_SIZE_MB * 1024 * 1024;

const Media = ({ data, onBack, onSubmit, submitting }: Props) => {
  const [queued, setQueued] = useState<QueuedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const isAnonymous = data.anonymous || data.category === 'safety';

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    const remaining = MAX_MEDIA_FILES - queued.length;
    const incoming = Array.from(files).slice(0, remaining);

    const accepted: QueuedFile[] = [];
    for (const file of incoming) {
      let processed = file;

      if (file.type.startsWith('image/')) {
        try {
          processed = await stripMetadata(file);
          processed = await compressImage(processed, {
            maxWidth: 1600,
            maxHeight: 1600,
            quality: 0.8,
          });
        } catch {
          processed = file;
        }
      }

      if (processed.size > MAX_BYTES) {
        setError(`"${file.name}" exceeds ${MAX_MEDIA_SIZE_MB} MB.`);
        continue;
      }

      accepted.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: processed.name,
        size: processed.size,
        type: processed.type,
        url: URL.createObjectURL(processed),
      });
    }

    if (accepted.length > 0) setQueued((q) => [...q, ...accepted]);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await handleFiles(e.target.files);
    e.target.value = '';
  };

  const removeFile = (id: string) => {
    setQueued((q) => {
      const target = q.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return q.filter((f) => f.id !== id);
    });
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    await onSubmit([]);
  };

  return (
    <div className={styles.mainCard}>
      <div className={styles.mainHeader}>
        <h1>{t('wizard.media.title')}</h1>
        <p>{t('wizard.media.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.dropzone}>
          <div className={styles.uploadIconWrapper}>
            <Image src={UploadIcon} alt="" width={20} height={20} />
          </div>
          <h3 className={styles.dropzoneTitle}>{t('wizard.media.dropTitle')}</h3>
          <p className={styles.dropzoneSubtitle}>{t('wizard.media.dropSubtitle')}</p>

          <div className={styles.uploadButtons}>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => cameraInputRef.current?.click()}
              disabled={queued.length >= MAX_MEDIA_FILES}
            >
              <Image src={CameraIcon} alt="" width={16} height={16} />
              {t('wizard.media.takePhoto')}
            </button>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => photoInputRef.current?.click()}
              disabled={queued.length >= MAX_MEDIA_FILES}
            >
              <Image src={ImageIcon} alt="" width={16} height={16} />
              {t('wizard.media.uploadPhoto')}
            </button>
            <button
              type="button"
              className={styles.uploadBtn}
              onClick={() => videoInputRef.current?.click()}
              disabled={queued.length >= MAX_MEDIA_FILES}
            >
              <Image src={VideoIcon} alt="" width={16} height={16} />
              {t('wizard.media.uploadVideo')}
            </button>
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept={ACCEPT_PHOTO}
            capture="environment"
            hidden
            onChange={handleChange}
          />
          <input
            ref={photoInputRef}
            type="file"
            accept={ACCEPT_PHOTO}
            multiple
            hidden
            onChange={handleChange}
          />
          <input
            ref={videoInputRef}
            type="file"
            accept={ACCEPT_VIDEO}
            multiple
            hidden
            onChange={handleChange}
          />
        </div>

        {queued.length > 0 && (
          <ul className={styles.previewList}>
            {queued.map((f) => (
              <li key={f.id} className={styles.previewItem}>
                <div className={styles.previewThumb}>
                  {f.type.startsWith('image/') ? (
                    <img src={f.url} alt="" />
                  ) : (
                    <span className={styles.previewVideoBadge}>MP4</span>
                  )}
                </div>
                <div className={styles.previewMeta}>
                  <span className={styles.previewName} title={f.name}>
                    {f.name}
                  </span>
                  <span className={styles.previewSize}>
                    {(f.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.previewRemove}
                  onClick={() => removeFile(f.id)}
                  aria-label={`Remove ${f.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p className={styles.helperText} role="alert">
            {error}
          </p>
        )}

        <div className={styles.footerWrapper}>
          <div className={styles.footerNav}>
            <button
              type="button"
              onClick={onBack}
              className={styles.backBtn}
              disabled={submitting}
            >
              <Image src={ArrowLeftIcon} alt="" width={16} height={16} />
              {t('common.back')}
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
            >
              <Image
                src={ShieldIcon}
                alt=""
                width={20}
                height={20}
                className={styles.submitIcon}
              />
              {submitting
                ? `${t('common.submit')}…`
                : t('wizard.media.submitSecure')}
            </button>
          </div>
          <p className={styles.footerContext}>
            {t('wizard.media.submittingAs', {
              mode: t(
                isAnonymous
                  ? 'wizard.media.modes.anonymous'
                  : 'wizard.media.modes.identified'
              ),
              category: data.category,
              area: data.area,
            })}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Media;