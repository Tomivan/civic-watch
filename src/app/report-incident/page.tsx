"use client";

import { useState } from 'react';
import ReportNav from '../components/reportNav/reportNav.component';
import Category from '../components/category/category.component';
import Description from '../components/description/description.component';
import Location from '../components/location/location.component';
import Media from '../components/media/media.component';
import Stepper from '../components/stepper/stepper.component';
import PrivacyCard from '../components/privacyCard/privacyCard.component';
import styles from './page.module.css';

export interface ReportData {
  category: string;
  title: string;
  description: string;
  address: string;
  area: string;
  landmark: string;
}

const ReportIncidentPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [reportData, setReportData] = useState<ReportData>({
    category: '',
    title: '',
    description: '',
    address: '',
    area: 'Ikeja',
    landmark: '',
  });

  const updateData = (fields: Partial<ReportData>) => {
    setReportData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Category
            data={reportData}
            onUpdate={updateData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Description
            data={reportData}
            onUpdate={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Location
            data={reportData}
            onUpdate={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Media
            data={reportData}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <ReportNav />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Stepper currentStep={currentStep} />
          <PrivacyCard />
        </aside>
        <main className={styles.main}>
          {renderStep()}
        </main>
      </div>
    </div>
  );
};

export default ReportIncidentPage;