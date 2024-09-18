export interface SessionResponse {
  token: string;
  exp_data: string;
}

export interface SendVerificationCodeResponse extends ApiErrorResponse {
  next_code_seconds_left: number;
}
export interface CheckVerificationCodeResponse extends ApiResponse<{ is_new_user: boolean; token: string }> {}
