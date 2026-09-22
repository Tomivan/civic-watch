import slaData from './sla.json';

export interface SlaRule {
  openHours: number;
  inProgressHours: number;
  resolvedHours: number;
  escalationThresholdHours: number;
}

export interface ReminderConfig {
  beforeEscalationHours: number;
  afterSubmissionHours: number;
}

const defaults = slaData.default as SlaRule;
const overrides = slaData.overrides as Record<string, Partial<SlaRule>>;
export const reminders: ReminderConfig = slaData.reminders as ReminderConfig;

export const getSla = (category: string): SlaRule => ({
  ...defaults,
  ...(overrides[category] ?? {}),
});

export const isEscalationDue = (
  category: string,
  status: string,
  createdAt: Date
): boolean => {
  if (status !== 'open') return false;
  const sla = getSla(category);
  const elapsedHours = (Date.now() - createdAt.getTime()) / 3_600_000;
  return elapsedHours >= sla.escalationThresholdHours;
};

export const hoursOpen = (createdAt: Date): number =>
  Math.floor((Date.now() - createdAt.getTime()) / 3_600_000);

export const formatDuration = (hours: number): string => {
  if (hours < 1) return 'just now';
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w`;
};