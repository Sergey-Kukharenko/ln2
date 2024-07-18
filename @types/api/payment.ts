export type PaymentMethod = 'checkout-com' | 'paypal' | 'link' | 'googlepay' | 'applepay';

interface StripeIntent {
  client_secret: string;
  order_id: string;
  total_cost: string;
  public_key: string;
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

interface CheckoutComPayment {
  payment_session_token: string;
  total_cost: string;
  order_hash_id: string;
  id: string;
  href: string;
}

export interface CheckoutComPaymentSessionResponse extends ApiResponse<CheckoutComPayment> {}
export interface PaypalClientResponse extends ApiResponse<PaypalClient> {}
export interface PaypalCreateResponse extends ApiResponse<PaypalCreate> {}
export interface PaypalCaptureResponse extends ApiResponse<PaypalCapture> {}
export interface StripeIntentResponse extends ApiResponse<StripeIntent> {}
