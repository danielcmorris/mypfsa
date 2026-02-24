export interface Council {
  councilID: number;
  code: string;
  name: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  state: string | null;
  secretary: {
    name: string | null;
    phone: string | null;
    email: string | null;
  };
}
