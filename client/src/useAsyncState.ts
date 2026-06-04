import { useState } from "react";
type AsyncState = "idle" | "loading" | "success" | "fail";

const useAsyncState = () => {
  const [asyncState, setAsyncState] = useState<AsyncState>("idle");

  const setLoading = () => {
    setAsyncState("loading");
  };

  const setSuccess = () => {
    setAsyncState("success");
  };

  const setFail = () => {
    setAsyncState("fail");
  };

  return { asyncState, setLoading, setSuccess, setFail };
};

export default useAsyncState;
