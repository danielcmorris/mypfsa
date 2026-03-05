export interface FestaEvent {
  date: string;
  time: string;
  event: string;
}

export interface FestaContactInfo {
  hall?: string;
  address?: string;
  mailingAddress?: string;
  phone?: string;
  email?: string;
}

export interface FestaManager {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  position?: string;
}

export type FestaStatus = 'draft' | 'submitted' | 'under-review' | 'rejected' | 'approved' | 'active';

export interface Festa {
  id: number;
  city: string;
  state: string;
  organizationName: string;
  festaName?: string;
  councilNumber?: string;
  contactInfo: FestaContactInfo;
  schedule: FestaEvent[];
  additionalNotes?: string;
  year: number;
  eventLink?: string;
  internalComments?: string;
  managers?: FestaManager[];
  status?: FestaStatus;
}

// API response models (GET from backend)

export interface ApiFestaResponseSchedule {
  festaScheduleID: number;
  festaID: number;
  eventDate: string;
  eventTime: string | null;
  description: string;
  status: string;
}

export interface ApiFestaResponseManager {
  festaManagerID: number;
  festaID: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  position: string;
  status: string;
}

export interface ApiFestaResponse {
  festaID: number;
  organization: string;
  festaName: string;
  councilID: number | null;
  councilCode: string | null;
  city: string | null;
  state: string | null;
  eventYear: number;
  locationName: string;
  streetAddress: string | null;
  mailingAddress: string | null;
  phone: string | null;
  email: string | null;
  eventLink: string | null;
  publicNotes: string | null;
  internalNotes: string | null;
  status: string;
  schedules: ApiFestaResponseSchedule[];
  managers: ApiFestaResponseManager[];
}

// API request models matching the backend Festa controller

export interface ApiFestaSchedule {
  festaID: number;
  eventDate: string;
  eventTime?: string | null;
  description: string;
  createdByID: number;
  updatedByID: number;
}

export interface ApiFestaManager {
  festaID: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  position: string;
  createdByID: number;
  updatedByID: number;
}

export interface ApiFestaRequest {
  organization: string;
  festaName: string;
  councilID?: number | null;
  councilCode?: string | null;
  city?: string | null;
  state?: string | null;
  eventYear: number;
  locationName: string;
  streetAddress?: string | null;
  mailingAddress?: string | null;
  phone?: string | null;
  email?: string | null;
  eventLink?: string | null;
  publicNotes?: string | null;
  internalNotes?: string | null;
  createdByID: number;
  updatedByID: number;
  schedules: ApiFestaSchedule[];
  managers: ApiFestaManager[];
}
