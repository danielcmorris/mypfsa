export interface SimpleMail {
  to: string;
  from: string;
  cc?: string;
  bcc?: string;
  subject: string;
  message: string;
  key?: string;
}