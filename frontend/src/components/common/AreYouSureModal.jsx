import React from "react";

const AreYouSureModal = ({
  isOpen,
  title,
  message,
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "default",
  closeOnBackdropClick = true,
  className = "",
}) => {
  if (!isOpen) return null;

  const iconColor =
    variant === "danger" ? "text-red-600" : "text-(--link-color)";

  const confirmButtonClass =
    variant === "danger"
      ? "delete-button-shadow text-white"
      : "gn-button-shadow text-white";

  return (
    <div
      className="fixed inset-0 z-50 flex 
    items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 
        bg-slate-900/50 backdrop-blur-sm"
        onClick={closeOnBackdropClick ? onCancel : undefined}
      />

      <div
        className="relative w-full max-w-sm 
      rounded-2xl bg-white p-6 text-center
      dropdown-menu-box-shadow"
      >
        <div
          className="flex items-center 
        justify-center gap-2"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`h-6 w-6 ${iconColor}`}
            aria-hidden="true"
          >
            <path
              d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.82A2 2 0 0 0 4.62 20h14.76a2 2 0 0 0 1.73-3.32l-7.4-12.82a2 2 0 0 0-3.42 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {title && (
            <h2
              className="font-bold 
            text-(--card-heading-color)"
            >
              {title}
            </h2>
          )}
        </div>

        {message && (
          <p
            className="mt-3 text-sm 
          text-(--text-color)"
          >
            {message}
          </p>
        )}

        {children}

        <div
          className="mt-6 flex justify-center 
        gap-x-3"
        >
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border 
            border-(--text-color)/20 bg-white 
            cancel-button-shadow"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md 
            font-bold dropdown-menu-box-shadow
            ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSureModal;
