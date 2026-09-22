"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { t } from '../../lib/i18n';
import styles from './page.module.css';

interface StepperProps {
  currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => {
  const steps = [
    { id: 1, label: t('wizard.steps.category') },
    { id: 2, label: t('wizard.steps.description') },
    { id: 3, label: t('wizard.steps.location') },
    { id: 4, label: t('wizard.steps.media') },
  ];

  const total = steps.length;

  return (
    <div
      className={styles.stepper}
      role="list"
      aria-label={t('wizard.stepLabel', { current: currentStep, total })}
    >
      <p className={styles.stepperAnnounce} aria-live="polite">
        {t('wizard.stepLabel', { current: currentStep, total })}
      </p>

      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        return (
          <div
            key={step.id}
            role="listitem"
            aria-current={isActive ? 'step' : undefined}
            className={`${styles.stepItem} ${
              isActive ? styles.stepActive : ''
            } ${isCompleted ? styles.stepCompleted : ''}`}
          >
            <div className={styles.stepNumber} aria-hidden="true">
              {isCompleted ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  size="1x"
                  color="#ffffff"
                  className={styles.icon1}
                />
              ) : (
                step.id
              )}
            </div>
            <span className={styles.stepLabel}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;