export interface NotificationsResponse
  extends ApiResponse<{
    email: string | null;
    email_subscription: boolean;
    sms_subscription: boolean;
    push_subscription: boolean;
  }> {}
