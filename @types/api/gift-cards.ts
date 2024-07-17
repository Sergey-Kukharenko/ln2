export interface GiftCard {
  id: string;
  real_id: number;
  title: string;
  description: string;
  img: string;
  slug: string;
  rating: string;
  price: string;
  type_name: string;
}

interface Data {
  list: GiftCard[];
}

export interface GiftCardResponse extends ApiResponse<Data> {}
