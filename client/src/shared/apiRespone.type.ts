export type ApiResponse<T> = {
  code: string;
  message: string;
  result: T;
};

export type ApiErrorResponse = {
  code: string;
  message: string;
};
