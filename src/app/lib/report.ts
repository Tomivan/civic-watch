import {
  collection, addDoc, getDocs, query, where, orderBy, limit,
  startAfter, doc, updateDoc, serverTimestamp,
  QueryDocumentSnapshot, DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

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
}

export const createReport = async (payload: ReportPayload) => {
  const ref = await addDoc(collection(db, 'reports'), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
};

export const updateReportStatus = async (id: string, status: ReportStatus) => {
  await updateDoc(doc(db, 'reports', id), {
    status,
    updatedAt: serverTimestamp(),
  });
};

export const fetchOpenReports = async (
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
) => {
  const constraints: any[] = [
    where('status', '==', 'open'),
    orderBy('createdAt', 'desc'),
    limit(pageSize),
  ];
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const q = query(collection(db, 'reports'), ...constraints);
  const snap = await getDocs(q);
  return {
    reports: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === pageSize,
  };
};

export const fetchAllReports = async (
  pageSize: number,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
) => {
  const constraints: any[] = [orderBy('createdAt', 'desc'), limit(pageSize)];
  if (lastDoc) constraints.push(startAfter(lastDoc));
  const q = query(collection(db, 'reports'), ...constraints);
  const snap = await getDocs(q);
  return {
    reports: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === pageSize,
  };
};

export const fetchMyReports = async (userId: string) => {
  const q = query(
    collection(db, 'reports'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};