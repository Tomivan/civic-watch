import lagos from './lagos.json';

export interface Agency {
  id: string;
  name: string;
  fullName: string;
  phone: string;
  website: string;
  email: string;
  categories: string[];
  slaHours: number;
}

export interface Lga {
  id: string;
  name: string;
  zone: string;
}

export interface RegionConfig {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  currency: string;
  timezone: string;
  defaultLocale: string;
  supportedLocales: string[];
  emergencyNumbers: Record<string, string>;
  serviceHours: Record<string, string>;
  lgas: Lga[];
  agencies: Agency[];
  categoryRouting: Record<string, string[]>;
  categorySlaHours: Record<string, number>;
  restrictedCategories: string[];
}

const regions: Record<string, RegionConfig> = {
  lagos: lagos as RegionConfig,
};

export const getRegion = (id: string = 'lagos'): RegionConfig => {
  const region = regions[id];
  if (!region) throw new Error(`Region "${id}" is not configured`);
  return region;
};

export const activeRegion = getRegion(
  process.env.NEXT_PUBLIC_REGION ?? 'lagos'
);