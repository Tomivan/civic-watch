import { activeRegion } from './regions';
import { categories, statuses, priorities } from './categories';
import { getSla } from './sla';

export const APP_NAME = 'CivicWatch';
export const APP_TAGLINE = 'Lagos State Civic Reporting';

export const REGION = activeRegion;
export const CATEGORIES = categories;
export const STATUSES = statuses;
export const PRIORITIES = priorities;

export const EMERGENCY_NUMBERS = activeRegion.emergencyNumbers;
export const SERVICE_HOURS = activeRegion.serviceHours;

export const LGAS = activeRegion.lgas;
export const AGENCIES = activeRegion.agencies;
export const CATEGORY_ROUTING = activeRegion.categoryRouting;
export const CATEGORY_SLA_HOURS = activeRegion.categorySlaHours;
export const RESTRICTED_CATEGORIES = activeRegion.restrictedCategories;

export const PAGE_SIZES = [10, 20, 50];
export const DEFAULT_PAGE_SIZE = 10;

export const MAX_MEDIA_FILES = 5;
export const MAX_MEDIA_SIZE_MB = 25;
export const MIN_DESCRIPTION_LENGTH = 30;
export const MAX_DESCRIPTION_LENGTH = 600;

export { getSla };