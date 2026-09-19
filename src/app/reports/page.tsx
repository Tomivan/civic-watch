"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar/navbar.component';
import { useAuthStore } from '../store/authStore';
import { fetchMyReports } from '../lib/report';
import styles from './reports.module.css';

interface Report {
  id: string;
  title: string;
  description: string;
  status: string;
  area: string;
  createdAt: any;
}

const Reports = () => {
  const { user, isAdmin } = useAuthStore();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setReports([]);
      return;
    }
    setLoading(true);
    fetchMyReports(user.uid)
      .then((r) => setReports(r as Report[]))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className={styles.reportPage}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>My Reports</h1>
          <p className={styles.subtitle}>
            Reports filed from this account. Reference IDs are linked to your signed-in identity.
          </p>
        </div>

        {!user ? (
          <div className={styles.signInPrompt}>
            <p>Sign in to view your reports and receive status updates.</p>
            <Link href="/signin" className={styles.trackBtn}>
              Sign in
            </Link>
          </div>
        ) : loading ? (
          <p>Loading…</p>
        ) : reports.length === 0 ? (
          <p>You haven&apos;t filed any reports yet.</p>
        ) : (
          reports.map((r) => (
            <div key={r.id} className={styles.issueCard}>
              <div className={styles.cardBorderLeft} />
              <div className={styles.cardContent}>
                <h3>{r.title}</h3>
                <p className={styles.cardMeta}>{r.area}</p>
                <p className={styles.cardMeta}>{r.description}</p>
                <span className={styles.statusBadge}>{r.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;