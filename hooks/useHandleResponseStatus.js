import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import handleResponseStatus from "../helpers/handleResponseStatus";
import { setImage } from "../store/image/slice";

/**
 * Custom hook to handle API response status and perform actions accordingly.
 *
 * @param {boolean} status - The success status of the API response.
 * @param {string} errorStatus - The error status or message from the API response.
 * @param {Function} setStatusText - Action to set the status text in the Redux store.
 * @param {string} navigatePath - The path to navigate to on success (optional).
 * @param {Function} clearStatus - Action to clear the status in the Redux store.
 */
const useHandleResponseStatus = (
  status,
  errorStatus,
  navigatePath,
  setStatusText,
  clearStatus
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStatus = useCallback(() => {
    handleResponseStatus({
      status,
      errorStatus,
      dispatchActions: [
        { action: dispatch, payload: setStatusText(null) },
        { action: dispatch, payload: setImage(null) },
      ],
      successMessage: "Հաջողությամբ ստեղծված է",
      errorMessage: errorStatus,
      clearStatusAction: () => dispatch(clearStatus()),
      onSuccess: () => {
        if (navigatePath) navigate(navigatePath);
      },
    });
  }, [
    status,
    errorStatus,
    dispatch,
    setStatusText,
    clearStatus,
    navigate,
    navigatePath,
  ]);

  useEffect(() => {
    if (status || errorStatus) {
      handleStatus();
    }
  }, [status, errorStatus, handleStatus]);
};

export default useHandleResponseStatus;
