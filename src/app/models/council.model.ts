
export interface Council {
  councilNumber: string;
  councilName: string;
  meetingLocation: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  meetingSchedule: string;
  meetingNote: string;
  secretary: {
    name: string;
    phone: string;
    email: string;
  };
}