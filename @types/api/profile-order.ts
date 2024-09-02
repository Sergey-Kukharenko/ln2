interface Order {
  order_id: number;
  img: string;
  amount_prod: number | null;
  status: string;
  date: string | null;
  statusText?: string;
}

interface Response {
  order: Order;
}

export interface ProfileOrderResponse extends ApiResponse<Response> {}
