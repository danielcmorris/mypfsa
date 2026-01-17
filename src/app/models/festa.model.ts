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
