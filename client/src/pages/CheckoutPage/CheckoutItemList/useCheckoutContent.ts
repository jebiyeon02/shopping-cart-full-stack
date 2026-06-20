import { useEffect, useState } from "react";
import {
  getCheckoutContent,
  updateCheckoutRemoteArea,
  type CheckoutContent,
  type CheckoutRemoteAreaResponse,
} from "../../../domain/checkout/checkout.api";
import useAsyncTask, {
  type ExecuteAsyncFunctionProps,
} from "../../../shared/useAsyncTask";

export const useCheckoutContent = (checkoutId: number) => {
  const { asyncState, executeAsyncFunction } = useAsyncTask<CheckoutContent>();
  const updateCheckoutRemoteAreaAsyncTask =
    useAsyncTask<CheckoutRemoteAreaResponse>();

  const [checkoutContent, setCheckoutContent] =
    useState<CheckoutContent | null>(null);

  useEffect(() => {
    executeAsyncFunction({
      asyncFunction: () => getCheckoutContent(checkoutId),
      options: {
        onSuccess: (fetchedCheckoutContent) =>
          setCheckoutContent(fetchedCheckoutContent),
        onFail: (error) => alert(error.message),
      },
    });
  }, [executeAsyncFunction]);

  updateCheckoutRemoteArea;

  const requestUpdateCheckoutRemoteArea = async (
    nextRemoteArea: boolean,
    options: ExecuteAsyncFunctionProps<CheckoutRemoteAreaResponse>["options"],
  ) => {
    updateCheckoutRemoteAreaAsyncTask.executeAsyncFunction({
      asyncFunction: () => updateCheckoutRemoteArea(checkoutId, nextRemoteArea),
      options,
    });
  };

  return {
    checkoutContent,
    requestUpdateCheckoutRemoteArea,
    remoteAreaAsyncState: updateCheckoutRemoteAreaAsyncTask.asyncState,
  };
};
