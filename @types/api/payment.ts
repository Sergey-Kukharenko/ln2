export type PaymentMethod = 'stripe' | 'paypal' | 'link' | 'googlepay' | 'applepay';

interface StripeIntent {
  client_secret: string;
  order_id: string;
  total_cost: string;
}

interface PaypalClient {
  'client-id': string;
}

interface Link {
  href: string;
  rel: string;
  method: string;
}

interface PaypalCreate {
  success: boolean;
  orderId: string;
  links: Link[];
}

interface PaypalCapture {
  success: boolean;
  message: string;
}

export interface PaypalClientResponse extends ApiResponse<PaypalClient> {}
export interface PaypalCreateResponse extends ApiResponse<PaypalCreate> {}
export interface PaypalCaptureResponse extends ApiResponse<PaypalCapture> {}
export interface StripeIntentResponse extends ApiResponse<StripeIntent> {}
