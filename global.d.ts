type Nullable<T> = T | null | undefined;

type $ReplaceItType = any;

interface ApiResponse<T> {
  success: boolean;
  message?: Nullable<string>;
  data: T;
}
