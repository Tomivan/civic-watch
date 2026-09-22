import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';
import { getSla, isEscalationDue, hoursOpen } from '../config/sla';

export type ReportStatus = 'open' | 'in-progress' | 'resolved';
export type ReportPriority = 'low' | 'medium' | 'high';

export interface ReportPayload {
  category: string;
  title: string;
  description: string;
  address: string;
  area: string;
  landmark?: string;
  anonymous: boolean;
  restricted?: boolean;
  userId: string | null;
  userEmail: string | null;
  status: ReportStatus;
  priority: ReportPriority;
  mediaUrls?: string[];
  verified?: boolean;
  lastVerifiedAt?: Timestamp | null;
}

export interface Report extends ReportPayload {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FetchResult {
  reports: Report[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

const COLLECTION = 'reports';

const mapDoc = (d: QueryDocumentSnapshot<DocumentData>): Report =>
  ({ id: d.id, ...d.data() } as Report);

export const createReport = async (payload: ReportPayload): Promise<string> => {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...payload,
    verified: false,
    lastVerifiedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
};

export const getReportById = async (id: string): Promise<Report | null> => {
  const snap = await getDoc(doc(db, COLLECTION, id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Report) : null;
};

export const updateReportStatus = async (
  id: string,
  status: ReportStatus
): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), {
    status,
    updatedAt: serverTimestamp(),
  });
};

export const updateReportPriority = async (
  id: string,
  priority: ReportPriority
): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), {
    priority,
    updatedAt: serverTimestamp(),
  });
};

export const verifyReport = async (id: string): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), {
    verified: true,
    lastVerifiedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const deleteReport = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, id));
};

export const fetchOpenReports = async (
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<FetchResult> => {
  const constraints: any[] = [
    where('status', '==', 'open'),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const q = query(collection(db, COLLECTION), ...constraints);
  const snap = await getDocs(q);
  return {
    reports: snap.docs.map(mapDoc),
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === pageSize,
  };
};

export const fetchReportsByStatus = async (
  status: ReportStatus,
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<FetchResult> => {
  const constraints: any[] = [
    where('status', '==', status),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const q = query(collection(db, COLLECTION), ...constraints);
  const snap = await getDocs(q);
  return {
    reports: snap.docs.map(mapDoc),
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === pageSize,
  };
};

export const fetchAllReports = async (
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<FetchResult> => {
  const constraints: any[] = [orderBy('createdAt', 'desc'), limit(pageSize)];
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const q = query(collection(db, COLLECTION), ...constraints);
  const snap = await getDocs(q);
  return {
    reports: snap.docs.map(mapDoc),
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === pageSize,
  };
};

export const fetchMyReports = async (userId: string): Promise<Report[]> => {
  const q = query(
    collection(db, COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(mapDoc);
};

export const fetchReportsByCategory = async (
  category: string,
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<FetchResult> => {
  const constraints: any[] = [
    where('category', '==', category),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const q = query(collection(db, COLLECTION), ...constraints);
  const snap = await getDocs(q);
  return {
    reports: snap.docs.map(mapDoc),
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === pageSize,
  };
};

export const fetchReportsByArea = async (
  area: string,
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<FetchResult> => {
  const constraints: any[] = [
    where('area', '==', area),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const q = query(collection(db, COLLECTION), ...constraints);
  const snap = await getDocs(q);
  return {
    reports: snap.docs.map(mapDoc),
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === pageSize,
  };
};

export const fetchVerifiedReports = async (
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<FetchResult> => {
  const constraints: any[] = [
    where('verified', '==', true),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const q = query(collection(db, COLLECTION), ...constraints);
  const snap = await getDocs(q);
  return {
    reports: snap.docs.map(mapDoc),
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === pageSize,
  };
};

export const toJsDate = (ts: Timestamp | Date | undefined | null): Date | null => {
  if (!ts) return null;
  if (ts instanceof Date) return ts;
  return ts.toDate();
};

export interface ReportMeta {
  createdAt: Date | null;
  updatedAt: Date | null;
  hoursOpen: number;
  escalationDue: boolean;
  slaHours: number;
}

export const getReportMeta = (report: Report): ReportMeta => {
  const createdAt = toJsDate(report.createdAt);
  const updatedAt = toJsDate(report.updatedAt);
  const sla = getSla(report.category);
  return {
    createdAt,
    updatedAt,
    hoursOpen: createdAt ? hoursOpen(createdAt) : 0,
    escalationDue: createdAt
      ? isEscalationDue(report.category, report.status, createdAt)
      : false,
    slaHours: sla.escalationThresholdHours,
  };
};

export const groupByStatus = (reports: Report[]) => ({
  open: reports.filter((r) => r.status === 'open'),
  'in-progress': reports.filter((r) => r.status === 'in-progress'),
  resolved: reports.filter((r) => r.status === 'resolved'),
});

export const buildReferenceId = (id: string): string =>
  `LGS-${id.slice(0, 5).toUpperCase()}`;

export const findReportByReferenceId = async (
  referenceId: string
): Promise<Report | null> => {
  const normalized = referenceId.replace(/^LGS-?/i, '').toLowerCase();
  if (!normalized) return null;
  const q = query(
    collection(db, COLLECTION),
    where('__name__', '>=', normalized),
    orderBy('__name__'),
    limit(20)
  );
  const snap = await getDocs(q);
  const match = snap.docs.find((d) =>
    d.id.toLowerCase().startsWith(normalized)
  );
  return match ? mapDoc(match) : null;
};