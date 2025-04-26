import { toast } from "react-toastify";

const commonToastConfig = {
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

/**
 * Displays a success toast notification with the given message.
 *
 * @param {string} message - The message to display in the toast notification.
 * @param {number} [time=1000] - The duration in milliseconds to display the toast notification. Defaults to 1000.
 * @param {Object} [options={}] - Additional options for the toast notification.
 * @param {Function} [options.onClose] - Callback function to be called when the toast notification is closed.
 * @return {void}
 */
const Toast = {
  success: (message, time = 1000, options = {}) => {
    toast.success(message, {
      ...commonToastConfig,
      position: "top-right",
      autoClose: time,
      pauseOnHover: false,
      onClose: options.onClose,
      ...options,
    });
  },

  error: (message, options = {}) => {
    toast.error(message, {
      ...commonToastConfig,
      position: "top-center",
      autoClose: 2500,
      pauseOnHover: true,
      onClose: options.onClose,
      ...options,
    });
  },
};

export default Toast;
