interface Order {
  order_id: number;
  status: string;
  img: string;
  amount_prod: number;
  date: Date | null;
}

interface Data {
  current: Order[];
  archive: Order[];
}

interface Response {
  success: boolean;
  data: Data;
}

export interface ProfileOrdersResponse extends ApiResponse<Response> {}
