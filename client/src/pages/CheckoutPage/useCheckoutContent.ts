import { useEffect } from "react";
import {
  getCheckoutContent,
  updateCheckoutRemoteArea,
  type CheckoutContent,
  type CheckoutRemoteAreaResponse,
} from "../../domain/checkout/checkout.api";
import useAsyncTask, {
  type ExecuteAsyncFunctionProps,
} from "../../shared/useAsyncTask";

export const useCheckoutContent = (checkoutId: number) => {
  const {
    asyncState: getCheckoutContentAsyncState,
    executeAsyncFunction: executeGetCheckoutContent,
    setData: setCheckoutContent,
  } = useAsyncTask<CheckoutContent>();
  const updateCheckoutRemoteAreaAsyncTask =
    useAsyncTask<CheckoutRemoteAreaResponse>();

  useEffect(() => {
    executeGetCheckoutContent({
      asyncFunction: () => getCheckoutContent(checkoutId),
      options: {
        onFail: (error) => alert(error.message),
      },
    });
  }, [executeGetCheckoutContent]);

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

  const updateCheckoutContent = (updateContent: Partial<CheckoutContent>) => {
    const checkoutContent = getCheckoutContentAsyncState.data;
    if (checkoutContent) {
      setCheckoutContent({ ...checkoutContent, ...updateContent });
    }
  };

  return {
    getCheckoutContentAsyncState,
    requestUpdateCheckoutRemoteArea,
    remoteAreaAsyncState: updateCheckoutRemoteAreaAsyncTask.asyncState,
    updateCheckoutContent,
  };
};
