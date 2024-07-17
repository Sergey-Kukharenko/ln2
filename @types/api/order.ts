type OrderStatus = 'BASKET' | 'ORDER' | 'PAYMENT' | 'PAID' | 'FAIL_PAID';

interface Recipient {
  name: Nullable<string>;
  phone: Nullable<string>;
}

interface Intervals {
  date: string;
  time: string;
}

interface User {
  name: string;
  phone: string;
  email: string;
}

interface ExternalKeys {
  stripe: Nullable<string>;
}

interface Image {
  ord: number;
  alt_text: string;
  filename: string;
  bouquetHeight: Nullable<string>;
}

interface Position {
  offer_id: string;
  offer_real_id: number;
  offer_title: string;
  title: string;
  slug: string;
  price: string;
  external_keys: ExternalKeys;
  image: Image;
  is_paid: boolean;
  payment_id: number;
  base_category_name: string;
  is_bouquet: boolean;
  quantity: number;
  height?: string;
  package?: string;
  policy_id?: string | number;
}

interface ShippingAddress {
  full_address: string;
  id?: Nullable<string>;
  address1: Nullable<string>;
  address2: Nullable<string>;
  city: Nullable<string>;
  full_name?: Nullable<string>;
  formatted?: Nullable<string>;
  postal_code: Nullable<string>;
  latitude: Nullable<string>;
  longitude: Nullable<string>;
  comment: Nullable<string>;
}

interface PromoCode {
  code: string;
  discount: string;
}

interface Data {
  object: string;
  id: string;
  real_id: number;
  status: OrderStatus;
  recipient: Recipient;
  self_recipient: boolean;
  user: User;
  total_cost: string;
  delivery_amount: string;
  positions_cost: string;
  cashback: string;
  currency: string;
  positions: Position[];
  shipping_address: ShippingAddress;
  comment: Nullable<string>;
  fast_delivery: number;
  interval: Intervals;
  clarify_address: boolean;
  promo_code: PromoCode;
  is_paid: boolean;
  payment_id: number;
  gift: Nullable<string>;
  delivery_type: string;
  has_google_ads_fired: boolean;
}

export type OrderId = number | string;
export interface OrderResponse extends ApiResponse<Data> {}
