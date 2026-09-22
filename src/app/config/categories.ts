import categoriesData from './categories.json';

export type CategoryId =
  | 'infrastructure'
  | 'environment'
  | 'sanitation'
  | 'safety';

export type StatusId = 'open' | 'in-progress' | 'resolved';
export type PriorityId = 'low' | 'medium' | 'high';

export interface CategoryConfig {
  id: CategoryId;
  icon: string;
  restricted: boolean;
  defaultPriority: PriorityId;
}

export interface StatusConfig {
  id: StatusId;
  color: string;
  order: number;
}

export interface PriorityConfig {
  id: PriorityId;
  color: string;
}

export const categories: CategoryConfig[] =
  categoriesData.categories as CategoryConfig[];

export const statuses: StatusConfig[] =
  categoriesData.statuses as StatusConfig[];

export const priorities: PriorityConfig[] =
  categoriesData.priorities as PriorityConfig[];

export const getCategory = (id: string): CategoryConfig | undefined =>
  categories.find((c) => c.id === id);

export const getStatus = (id: string): StatusConfig | undefined =>
  statuses.find((s) => s.id === id);

export const getPriority = (id: string): PriorityConfig | undefined =>
  priorities.find((p) => p.id === id);

export const isRestrictedCategory = (id: string): boolean =>
  getCategory(id)?.restricted ?? false;