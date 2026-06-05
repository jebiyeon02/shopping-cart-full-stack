import { useState } from "react";
import type { AsyncError } from "../error/normalizeError";

type AsyncState<T> =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "fail"; data: null; error: AsyncError };

const useAsyncState = <T>() => {
  const [asyncState, setAsyncState] = useState<AsyncState<T>>({
    status: "idle",
    data: null,
    error: null,
  });

  const setLoading = () => {
    setAsyncState({
      status: "loading",
      data: null,
      error: null,
    });
  };

  const setSuccess = (data: T) => {
    setAsyncState({
      status: "success",
      data,
      error: null,
    });
  };

  const setFail = (error: AsyncError) => {
    setAsyncState({
      status: "fail",
      data: null,
      error,
    });
  };

  return {
    asyncState,
    setLoading,
    setSuccess,
    setFail,
  };
};

export default useAsyncState;
