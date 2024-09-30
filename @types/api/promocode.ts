import { FeaturedImage } from '~/@types/api/product';

interface PromocodeGift {
  gift_price: number;
  featured_image: FeaturedImage;
  real_id: number;
}
export interface Promocode {
  title?: string;
  gift: Nullable<PromocodeGift>;
  valid_until: Nullable<string>;
}
