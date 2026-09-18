"use client";

import { useState, SyntheticEvent } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { ReportData } from '../../report-incident/page';
import SuccessModal from '../successModal/successModal.component';
import ArrowLeftIcon from '../../../../public/assets/images/back.svg';
import UploadIcon from '../../../../public/assets/images/upload.svg';
import CameraIcon from '../../../../public/assets/images/take-photo.svg';
import ImageIcon from '../../../../public/assets/images/upload-photo.svg';
import VideoIcon from '../../../../public/assets/images/upload-video.svg';
import ShieldIcon from '../../../../public/assets/images/shield.svg';

interface Props {
  data: ReportData;
  onBack: () => void;
}

const Media = ({ data, onBack }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.mainCard}>
        <div className={styles.mainHeader}>
          <h1>Add photos or video</h1>
          <p>Optional, but evidence raises the urgency score and speeds up verification. Up to 5 files, 25 MB each.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.dropzone}>
            <div className={styles.uploadIconWrapper}>
              <Image src={UploadIcon} alt="Upload" width={20} height={20} />
            </div>
            <h3 className={styles.dropzoneTitle}>Attach evidence from your device</h3>
            <p className={styles.dropzoneSubtitle}>
              JPG, PNG, HEIC, MP4 · location metadata is stripped before publishing
            </p>
            <div className={styles.uploadButtons}>
              <button type="button" className={styles.uploadBtn}>
                <Image src={CameraIcon} alt="Camera" width={16} height={16} />
                Take photo
              </button>
              <button type="button" className={styles.uploadBtn}>
                <Image src={ImageIcon} alt="Image" width={16} height={16} />
                Upload photo
              </button>
              <button type="button" className={styles.uploadBtn}>
                <Image src={VideoIcon} alt="Video" width={16} height={16} />
                Upload video
              </button>
            </div>
          </div>

          <div className={styles.footerWrapper}>
            <div className={styles.footerNav}>
              <button type="button" onClick={onBack} className={styles.backBtn}>
                <Image src={ArrowLeftIcon} alt="Back" width={16} height={16} />
                Back
              </button>
              <button type="submit" className={styles.submitBtn}>
                <Image src={ShieldIcon} alt="Shield" width={20} height={20} className={styles.submitIcon} />
                Submit Report Securely
              </button>
            </div>
            <p className={styles.footerContext}>
              Submitting as <strong>anonymous</strong> · {data.category} · {data.area}
            </p>
          </div>
        </form>
      </div>

      {isModalOpen && <SuccessModal referenceId="LGS-84921" />}
    </>
  );
};

export default Media;