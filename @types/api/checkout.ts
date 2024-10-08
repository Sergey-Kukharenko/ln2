export interface Interval {
  id: number;
  label: string;
  delivery_amount: number;
  delivery_type: string;
  disabled: boolean;
}

export interface DailyIterval {
  date: string;
  intervals: Interval[];
}

export interface IntervalResponse<T> extends ApiResponse<T> {}
