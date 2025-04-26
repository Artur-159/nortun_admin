/**
 * Handles the response status by displaying a toast notification and performing actions based on the status.
 *
 * @param {Object} params - The parameters for handling the response status.
 * @param {boolean} params.status - The success status of the response.
 * @param {string} params.errorStatus - The error status or message if the response failed.
 * @param {Array} [params.dispatchActions=[]] - The actions to dispatch on success, each containing an action and a payload.
 * @param {string} [params.successMessage="Հաջողությամբ ստեղծված է"] - The message to display on successful response.
 * @param {string} params.errorMessage - The message to display on error response.
 * @param {Function} params.navigate - The navigation function to call on success.
 * @param {string} [params.navigatePath="/"] - The path to navigate to on success.
 * @param {Function} params.clearErrorAction - The action to clear errors on error response.
 * @return {void}
 */

import Toast from "../helpers/status-text";

export const handleResponseStatus = ({
  status,
  errorStatus,
  dispatchActions = [],
  successMessage = "Հաջողությամբ ստեղծված է",
  errorMessage,
  navigate,
  navigatePath = "/",
  clearErrorAction,
}) => {
  if (status) {
    Toast.success(successMessage, false, {
      onClose: () => {
        dispatchActions.forEach(({ action, payload }) => {
          action(payload);
        });

        if (navigate && navigatePath) {
          navigate(navigatePath);
        }
      },
    });
  } else if (errorStatus) {
    Toast.error(errorMessage || errorStatus, false, {
      onClose: () => {
        if (clearErrorAction) {
          clearErrorAction();
        }
      },
    });
  }
};
