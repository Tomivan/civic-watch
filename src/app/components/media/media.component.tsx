import { useState, SyntheticEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import SuccessModal from '../successModal/successModal.compnent';

import ShieldIcon from '../../../../public/assets/images/shield.svg';
import EyeOffIcon from '../../../../public/assets/images/eye-off.svg';
import LockIcon from '../../../../public/assets/images/lock.svg';
import CheckIcon from '../../../../public/assets/images/check.svg';
import ArrowLeftIcon from '../../../../public/assets/images/arrow-left.svg';
import UploadIcon from '../../../../public/assets/images/upload.svg';
import CameraIcon from '../../../../public/assets/images/camera.svg';
import ImageIcon from '../../../../public/assets/images/image.svg';
import VideoIcon from '../../../../public/assets/images/video.svg';

const Media = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const steps = [
    { id: 1, label: 'Category', active: false, completed: true },
    { id: 2, label: 'Description', active: false, completed: true },
    { id: 3, label: 'Location', active: false, completed: true },
    { id: 4, label: 'Media & privacy', active: true, completed: false },
  ];

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
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
                <Link href="/report/location" className={styles.backBtn}>
                  <Image src={ArrowLeftIcon} alt="Back" width={16} height={16} />
                  Back
                </Link>
                <button type="submit" className={styles.submitBtn}>
                  <Image src={ShieldIcon} alt="Shield" width={16} height={16} />
                  Submit Report Securely
                </button>
              </div>
              <p className={styles.footerContext}>
                Submitting as <strong>anonymous</strong> · Sanitation · Ikeja
              </p>
            </div>
          </form>
        </div>
      </main>

      {isModalOpen && <SuccessModal referenceId="LGS-84921" />}
    </div>
  );
};

export default Media;