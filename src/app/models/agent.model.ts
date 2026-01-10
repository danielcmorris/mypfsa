export interface Agent {
  name: string;
  license: string;
  image: string;
  contact: {
    phone: string;
    email: string;
  };
}