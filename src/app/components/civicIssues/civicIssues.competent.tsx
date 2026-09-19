"use client";

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useAuthStore } from '../../store/authStore';
import {
  fetchOpenReports,
  updateReportStatus,
  ReportStatus,
} from '../../lib/report';
import Location from '../../../../public/assets/images/location.svg';
import styles from './civicIssues.module.css';

const PAGE_SIZES = [10, 20, 50];

interface Report {
  id: string;
  title: string;
  description: string;
  area: string;
  category: string;
  priority: string;
  status: ReportStatus;
  createdAt: any;
}

const CivicIssues = () => {
  const { isAdmin } = useAuthStore();
  const [reports, setReports] = useState<Report[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [cursorStack, setCursorStack] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<any>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadFirstPage = useCallback(async (size: number) => {
    setLoading(true);
    const { reports, lastDoc, hasMore } = await fetchOpenReports(size);
    setReports(reports as Report[]);
    setNextCursor(lastDoc);
    setHasMore(hasMore);
    setCursorStack([]);
    setPage(0);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFirstPage(pageSize);
  }, [pageSize, loadFirstPage]);

  const goNext = async () => {
    if (!nextCursor) return;
    setLoading(true);
    const { reports: next, lastDoc, hasMore: more } = await fetchOpenReports(pageSize, nextCursor);
    setCursorStack((s) => [...s, nextCursor]);
    setReports(next as Report[]);
    setNextCursor(lastDoc);
    setHasMore(more);
    setPage((p) => p + 1);
    setLoading(false);
  };

  const goPrev = async () => {
    if (page === 0) return;
    const newStack = [...cursorStack];
    newStack.pop();
    const prevCursor = newStack[newStack.length - 1];
    setLoading(true);
    const { reports: prevReports, lastDoc, hasMore: more } = await fetchOpenReports(
      pageSize,
      prevCursor
    );
    setReports(prevReports as Report[]);
    setNextCursor(lastDoc);
    setHasMore(more);
    setCursorStack(newStack);
    setPage((p) => p - 1);
    setLoading(false);
  };

  const handleStatusChange = async (id: string, status: ReportStatus) => {
    await updateReportStatus(id, status);
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          <div className={styles.header}>
            <h1>Civic Issues Near You</h1>
            <p className={styles.subtitle}>
              Open reports across Lagos State, routed to the responsible agency.
            </p>
          </div>

          <div className={styles.pageSizeBar}>
            <span>Show:</span>
            {PAGE_SIZES.map((n) => (
              <button
                key={n}
                className={pageSize === n ? styles.pageSizeActive : styles.pageSizeBtn}
                onClick={() => setPageSize(n)}
              >
                {n}
              </button>
            ))}
          </div>

          {loading ? (
            <p>Loading…</p>
          ) : reports.length === 0 ? (
            <p>No open reports.</p>
          ) : (
            reports.map((r) => (
              <div key={r.id} className={styles.issueCard}>
                <div className={styles.cardBorderLeft} />
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitleGroup}>
                      <h3>{r.title}</h3>
                    </div>
                    {isAdmin ? (
                      <select
                        className={styles.statusSelect}
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value as ReportStatus)}
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    ) : (
                      <span className={styles.statusBadge}>{r.status}</span>
                    )}
                  </div>
                  <p className={styles.cardMeta}>
                    <Image src={Location} alt="" width={16} height={16} /> {r.area}
                  </p>
                  <p className={styles.cardMeta}>{r.description}</p>
                </div>
              </div>
            ))
          )}

          <div className={styles.pagination}>
            <button onClick={goPrev} disabled={page === 0 || loading}>
              Previous
            </button>
            <span>Page {page + 1}</span>
            <button onClick={goNext} disabled={!hasMore || loading}>
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CivicIssues;