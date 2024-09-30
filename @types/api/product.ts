export interface FeaturedImage {
  ord: number;
  alt_text: string;
  filename: string;
  bouquetHeight: Nullable<string>;
}

interface Image {
  ord: number;
  alt_text: string;
  filename: string;
  bouquetHeight: Nullable<string>;
}

interface ExternalKeys {
  stripe: Nullable<string>;
}

interface Item {
  type: string;
  title: string;
  quantity: number;
}

interface Position {
  external_keys: ExternalKeys;
  title: string;
  items: Item[];
  price: string;
  height: Nullable<string>;
}

interface DefaultOption {
  type: string;
  title: string;
  quantity: number;
}

interface SEO {
  title: string;
  description: string;
  h1: Nullable<string>;
  top_text: Nullable<string>;
  bottom_text: Nullable<string>;
  keywords: Nullable<string>;
}

interface Meta {
  include: $ReplaceItType[];
  custom: $ReplaceItType[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface Data {
  object: string;
  id: string;
  real_id: number;
  title: string;
  slug: string;
  rating: string;
  reviews: number;
  like: boolean;
  price: string;
  position_name: string;
  description: string;
  featured_image: FeaturedImage;
  images: Image[];
  positions: Position[];
  default_option: DefaultOption[];
  category_name: string;
  seo: SEO;
  faq: FAQ[];
}

interface Category {
  title: string;
  prefix: string;
  slug: string;
  img?: string;
}

export interface PopularCategoriesResponse {
  title: string;
  categories: Category[];
}

export interface ProductResponse {
  data: Data;
  meta: Meta;
}
