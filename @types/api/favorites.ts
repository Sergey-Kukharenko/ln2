interface FavoriteItem {
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
  category_name: string;
  type_name: string;
  old_price: number | null;
  discount: number | null;
}

export interface FavoritesResponse {
  list: FavoriteItem[];
}
