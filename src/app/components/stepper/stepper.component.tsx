import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

interface StepperProps {
  currentStep: number;
}

const Stepper = ({ currentStep }: StepperProps) => {
  const steps = [
    { id: 1, label: 'Category' },
    { id: 2, label: 'Description' },
    { id: 3, label: 'Location' },
    { id: 4, label: 'Media & privacy' },
  ];

  return (
    <div className={styles.stepper}>
      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        return (
          <div
            key={step.id}
            className={`${styles.stepItem} ${isActive ? styles.stepActive : ''} ${isCompleted ? styles.stepCompleted : ''}`}
          >
            <div className={styles.stepNumber}>
              {isCompleted ? (
                <FontAwesomeIcon icon={faCheck} size="1x" color="#ffffff" className={styles.icon1} />
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