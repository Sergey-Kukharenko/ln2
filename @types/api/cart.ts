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
  offer_slug: string;
  title: string;
  slug: string;
  price: string;
  external_keys: ExternalKeys;
  image: Image;
  like: boolean;
  category_name: string;
  quantity: number;
  height?: string;
  package?: string;
}

interface PromoCode {
  code: string;
  discount: string;
}

export interface CartResponse
  extends ApiResponse<{
    id?: string;
    positions: Position[];
    promo_code: PromoCode;
    real_id?: number;
    position_cost: string;
    total_cost: string;
  }> {}
