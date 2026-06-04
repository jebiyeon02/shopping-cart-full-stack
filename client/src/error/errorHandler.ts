import ApiError from "./ApiError";

export const errorHandler = (error: unknown) => {
  if (error instanceof ApiError) {
    alert(error.message);
    return;
  }

  alert("알 수 없는 에러가 발생했습니다.");
};
