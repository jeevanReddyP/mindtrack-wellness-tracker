// src/utils/toast.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Configure toast defaults
toast.configure = toast; // For backward compatibility

// Toast configuration
const toastConfig = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Toast methods
export const showSuccess = (message) => {
  toast.success(message, toastConfig);
};

export const showError = (message) => {
  toast.error(message, {
    ...toastConfig,
    autoClose: 5000, // Longer display for errors
  });
};

export const showInfo = (message) => {
  toast.info(message, toastConfig);
};

export const showWarning = (message) => {
  toast.warn(message, {
    ...toastConfig,
    autoClose: 4000, // Slightly longer for warnings
  });
};

// Initialize toast container (moved from configure)
toast.configure(toastConfig);