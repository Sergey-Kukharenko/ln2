interface FAQ {
  question: string;
  answer: string;
}

interface SEO {
  title: Nullable<string>;
  description: Nullable<string>;
  h1: Nullable<string>;
  top_text: Nullable<string>;
  bottom_text: Nullable<string>;
  keywords: Nullable<string>;
}

interface Main {
  title: string;
  prefix: Nullable<string>;
  slug: string;
}

interface List {
  id: string;
  real_id: number;
  title: string;
  img: string;
  slug: string;
  rating: string;
  reviews: number;
  like: boolean;
  price: string;
  position_name: string;
  is_new: boolean;
  category_name?: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
}

export interface CategoryResponse {
  seo: SEO;
  faq: FAQ[];
  main: Main;
  list: List[];
  pagination: Pagination;
}
