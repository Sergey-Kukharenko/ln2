interface Order {
  order_id: number;
  img: string;
  amount_prod: number | null;
  status: string;
  date: string | null;
  statusText?: string;
}

interface Data {
  current: Order[];
}

interface Response {
  success: boolean;
  data: Data;
}

export interface ProfileOrdersResponse extends ApiResponse<Response> {}
