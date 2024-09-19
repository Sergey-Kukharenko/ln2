interface UserOrder {
  id: number;
  status: string;
  img: string;
}

interface User {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  gender: string | null;
  birth: string | null;
  unfinished_orders_count: number;
  favorites_count: number;
  order: UserOrder;
  bonus_amount: number;
  bonus_level: string;
  orders_sum_amount: string;
  cashback: number;
  left_for_next_level: number;
}

export interface PersonalResponse {
  auth: boolean;
  real_id: number;
  user: User;
}
