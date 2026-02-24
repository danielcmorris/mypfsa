export interface Agent {
  agentID: number;
  firstName: string;
  lastName: string;
  license: string;
  phone: string | null;
  email: string | null;
  imgUri: string | null;
  councilID: number | null;
  officeHours: string | null;
  languages: string | null;
  facebook: string | null;
  linkedIn: string | null;
  fax: string | null;
}
