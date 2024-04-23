export type CountKey = 20 | 50 | 35 | 100;

export type PackageSize = 'short' | 'long';

export type ProductColor = 'pink' | 'hot_pink' | 'mix' | 'white' | 'red' | 'white_and_red';

interface Image {
  ord: number;
  alt_text: string;
  filename: string;
}

interface Size {
  price: number;
  images: Image[];
}

type Heights = Record<PackageSize, Size>;

interface Color {
  id: string;
  title: string;
  image: string;
}

interface Height {
  id: string;
  title: string;
  is_recommended: boolean;
}

interface Package {
  id: string;
  title: string;
  is_recommended: boolean;
  image: string;
  price: number;
}

interface Settings {
  colors: Color[];
  heights: Height[];
  packages: Package[];
}

interface SEO {
  title: Nullable<string>;
  description: Nullable<string>;
  h1: Nullable<string>;
  top_text: Nullable<string>;
  bottom_text: Nullable<string>;
  keywords: Nullable<string>;
}

interface PriceColor {
  offer_id: string;
  real_id: number;
  description: string;
  uri: string;
  heights: Heights;
}

type Prices = Record<CountKey, Record<ProductColor, PriceColor>>;

interface Data {
  settings: Settings;
  prices: Prices;
  real_id: number;
  title: string;
  description: string;
  rating: Nullable<string>;
  reviews: number;
  like: boolean;
  category_name: string;
  seo: SEO;
  flower_color: string;
  flower_count: CountKey;
}

interface Meta {
  include: $ReplaceItType[];
  custom: $ReplaceItType[];
}

interface TooltipContent {
  title: string;
  description: string;
}

interface Tooltip {
  icon: string;
  content: TooltipContent[];
}

export interface ProductContructorResponse {
  data: Data;
  meta: Meta;
}

export interface MappedProductContructor {
  settings: Settings;
  prices: Prices;
  real_id: number;
  title: string;
  description: string;
  rating: Nullable<string>;
  reviews: number;
  like: boolean;
  category_name: string;
  seo: SEO;
  flowerColor: string;
  flowerCount: CountKey;
  tooltip: Tooltip;
}
