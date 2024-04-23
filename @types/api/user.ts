export type SearchHistory = { url: string; title: string };

export interface Recipient {
  name: string;
  phone: string;
}

interface User extends Recipient {
  email: string;
}

export interface UserResponse {
  auth: boolean;
  user?: User;
}

export interface Subscribe {
  email_subscription: boolean;
  sms_subscription: boolean;
  push_subscription: boolean;
  email: string;
}
