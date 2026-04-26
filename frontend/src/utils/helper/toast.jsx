import { toast } from "react-toastify";

export const showLoadingToast = (msg) => {
  return toast.loading(msg);
};

export const showSuccessToast = (id, msg) => {
  if (!id) return toast.success(msg); //fallback
  toast.update(id, {
    render: msg,
    type: "success",
    isLoading: false,
    autoClose: 300000,
    closeOnClick: true,
    draggable: true,
  });
};

export const showErrorToast = (id, msg) => {
  if (!id) return toast.error(msg); // fallback
  toast.update(id, {
    render: msg,
    type: "error",
    isLoading: false,
    autoClose: 300000,
    closeOnClick: true,
    draggable: true,
  });
};
