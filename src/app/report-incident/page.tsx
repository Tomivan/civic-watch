"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { createReport } from '../lib/report';
import { buildReferenceId } from '../lib/report';
import { CATEGORY_ROUTING, CATEGORY_SLA_HOURS, RESTRICTED_CATEGORIES } from '../config/constants';
import { t } from '../lib/i18n';
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

const DRAFT_KEY = 'civicwatch:draft';

const emptyDraft: ReportData = {
  category: '',
  title: '',
  description: '',
  address: '',
  area: 'Ikeja',
  landmark: '',
  anonymous: false,
};

const ReportIncidentPage = () => {
  const { user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<ReportData>(emptyDraft);

  const isRestricted = RESTRICTED_CATEGORIES.includes(reportData.category);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ReportData;
        setReportData({ ...emptyDraft, ...parsed });
      }
    } catch {
      // ignore corrupt drafts
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(reportData));
    } catch {
      // quota errors are non-fatal
    }
  }, [reportData]);

  useEffect(() => {
    if (isRestricted && !reportData.anonymous) {
      setReportData((p) => ({ ...p, anonymous: true }));
    }
  }, [isRestricted, reportData.anonymous]);

  const updateData = (fields: Partial<ReportData>) =>
    setReportData((prev) => ({ ...prev, ...fields }));

  const handleNext = () => setCurrentStep((p) => Math.min(p + 1, 4));
  const handleBack = () => setCurrentStep((p) => Math.max(p - 1, 1));

  const handleSubmit = async (mediaUrls: string[] = []) => {
    setError(null);
    setSubmitting(true);
    try {
      const anonymous = isRestricted || reportData.anonymous;
      const id = await createReport({
        category: reportData.category,
        title: reportData.title,
        description: reportData.description,
        address: reportData.address,
        area: reportData.area,
        landmark: reportData.landmark,
        anonymous,
        restricted: isRestricted,
        userId: anonymous ? null : user?.uid ?? null,
        userEmail: anonymous ? null : user?.email ?? null,
        status: 'open',
        priority: isRestricted ? 'high' : 'medium',
        mediaUrls,
      });

      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // ignore
      }

      setSubmittedId(id);
    } catch (e: any) {
      setError(e?.message ?? t('errors.unknown'));
    } finally {
      setSubmitting(false);
    }
  };

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
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        );
    }
  };

  const referenceId = submittedId ? buildReferenceId(submittedId) : null;
  const routedAgencyIds = CATEGORY_ROUTING[reportData.category] ?? [];
  const slaHours = CATEGORY_SLA_HOURS[reportData.category] ?? 72;

  return (
    <div className={styles.pageWrapper}>
      <ReportNav />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <Stepper currentStep={currentStep} />
          <PrivacyCard
            anonymous={reportData.anonymous}
            onChange={(v) => updateData({ anonymous: v })}
            locked={isRestricted}
          />
        </aside>
        <main className={styles.main}>
          {error && (
            <div className={styles.errorBanner} role="alert">
              {error}
            </div>
          )}
          {renderStep()}
        </main>
      </div>

      {submittedId && referenceId && (
        <SuccessModal
          referenceId={referenceId}
          category={reportData.category}
          agencyId={routedAgencyIds[0]}
          slaHours={slaHours}
        />
      )}
    </div>
  );
};

export default ReportIncidentPage;