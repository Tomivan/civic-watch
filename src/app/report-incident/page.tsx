"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { createReport } from '../lib/report';
import ReportNav from '../components/reportNav/reportNav.component';
import Category from '../components/category/category.component';
import Description from '../components/description/description.component';
import Location from '../components/location/location.component';
import Media from '../components/media/media.component';
import Stepper from '../components/stepper/stepper.component';
import PrivacyCard from '../components/privacyCard/privacyCard.component';
import SuccessModal from '../components/successModal/successModal.component';
import styles from './page.module.css';

export interface ReportData {
  category: string;
  title: string;
  description: string;
  address: string;
  area: string;
  landmark: string;
  anonymous: boolean;
}

const ReportIncidentPage = () => {
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [reportData, setReportData] = useState<ReportData>({
    category: '',
    title: '',
    description: '',
    address: '',
    area: 'Ikeja',
    landmark: '',
    anonymous: false,
  });

  const isGBV = reportData.category === 'safety';

  useEffect(() => {
    if (isGBV && !reportData.anonymous) {
      setReportData((p) => ({ ...p, anonymous: true }));
    }
  }, [isGBV, reportData.anonymous]);

  const updateData = (fields: Partial<ReportData>) =>
    setReportData((prev) => ({ ...prev, ...fields }));

  const handleNext = () => setCurrentStep((p) => Math.min(p + 1, 4));
  const handleBack = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const handleSubmit = async (mediaUrls: string[] = []) => {
    setSubmitting(true);
    try {
      const anonymous = isGBV || reportData.anonymous;
      const id = await createReport({
        category: reportData.category,
        title: reportData.title,
        description: reportData.description,
        address: reportData.address,
        area: reportData.area,
        landmark: reportData.landmark,
        anonymous,
        restricted: isGBV,
        userId: anonymous ? null : user?.uid ?? null,
        userEmail: anonymous ? null : user?.email ?? null,
        status: 'open',
        priority: isGBV ? 'high' : 'medium',
        mediaUrls,
      });
      setSubmittedId(id);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Category data={reportData} onUpdate={updateData} onNext={handleNext} />;
      case 2:
        return <Description data={reportData} onUpdate={updateData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Location data={reportData} onUpdate={updateData} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Media data={reportData} onBack={handleBack} onSubmit={handleSubmit} submitting={submitting} />;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <ReportNav />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Stepper currentStep={currentStep} />
          <PrivacyCard
            anonymous={reportData.anonymous}
            onChange={(v) => updateData({ anonymous: v })}
            locked={isGBV}
          />
        </aside>
        <main className={styles.main}>{renderStep()}</main>
      </div>

      {submittedId && <SuccessModal referenceId={submittedId} />}
    </div>
  );
};

export default ReportIncidentPage;