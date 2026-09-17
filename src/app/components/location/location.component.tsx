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
import GpsIcon from '../../../../public/assets/images/gps.svg';
import PinIcon from '../../../../public/assets/images/pin.svg';

const Location = () => {
  const [address, setAddress] = useState<string>('');
  const [area, setArea] = useState<string>('Ikeja');
  const [landmark, setLandmark] = useState<string>('');
  const router = useRouter();

  const steps = [
    { id: 1, label: 'Category', active: false, completed: true },
    { id: 2, label: 'Description', active: false, completed: true },
    { id: 3, label: 'Location', active: true, completed: false },
    { id: 4, label: 'Media & privacy', active: false, completed: false },
  ];

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/report/media');
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
              <label htmlFor="address" className={styles.label}>
                Street address or description <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <Image src={PinIcon} alt="Pin" width={16} height={16} className={styles.inputIcon} />
                <input
                  id="address"
                  type="text"
                  className={`${styles.input} ${styles.inputWithIcon}`}
                  placeholder="e.g. 14 Allen Avenue, near Computer Village"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <p className={styles.helperText}>Street name and number, or the closest junction.</p>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="area" className={styles.label}>
                  Area / LGA <span className={styles.required}>*</span>
                </label>
                <select
                  id="area"
                  className={styles.select}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
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
                <label htmlFor="landmark" className={styles.label}>
                  Nearest landmark
                </label>
                <input
                  id="landmark"
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Ikeja City Mall"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
                <p className={styles.helperText}>Optional but speeds up dispatch.</p>
              </div>
            </div>

            <div className={styles.mapPreview}>
              <div className={styles.mapCanvas}>
                <div className={styles.mapPinWrapper}>
                  <div className={styles.mapPinPulse} />
                  <span className={styles.mapPinLabel}>{area}</span>
                </div>
              </div>
              <div className={styles.mapFooter}>
                <span className={styles.mapFooterLabel}>Location preview</span>
                <p className={styles.mapFooterText}>
                  Pin placed in <strong>{area}</strong>, Lagos State. Drag-accurate mapping is applied when the agency opens the report.
                </p>
              </div>
            </div>

            <div className={styles.footerNav}>
              <Link href="/report/description" className={styles.cancelBtn}>
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

export default Location;