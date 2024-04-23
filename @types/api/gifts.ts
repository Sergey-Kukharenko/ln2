type CategoryName = 'Balloons' | 'Chocolate' | 'Teddies';

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
  category_name: CategoryName | null;
  count_in_basket: number;
}

interface Main {
  title: string;
  prefix: Nullable<string>;
  slug: string;
}

interface SEO {
  title: string;
  description: string;
  h1: string;
  top_text: Nullable<string>;
  bottom_text: Nullable<string>;
  keywords: Nullable<string>;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface GiftsResponse
  extends ApiResponse<{
    seo: SEO;
    faq: FAQ[];
    main: Main;
    list: List[];
    is_basket_has_gift: boolean;
  }> {}
