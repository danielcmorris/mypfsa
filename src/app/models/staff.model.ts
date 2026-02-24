export interface Staff {
  staffID: number;
  title: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  imgUri: string;
  councilID: number | null;
}
