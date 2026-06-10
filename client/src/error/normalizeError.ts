import ApiError from "./ApiError";

export type AsyncError = {
  message: string;
  code?: string;
};

export const normalizeError = (error: unknown): AsyncError => {
  if (error instanceof ApiError) {
    return {
      code: error.code,
      message: error.message,
    };
  }

  return {
    message: "알 수 없는 에러가 발생했습니다.",
  };
};
