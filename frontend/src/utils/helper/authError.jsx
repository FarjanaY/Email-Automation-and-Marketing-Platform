export function getAuthErrorMessage(error) {
  if (!error) return null;
  if (typeof error === "string") return error;
  return error?.common?.msg || error?.validationErr.msg || "Somthing Wrong.";
}

export function getValidationsErrors(error) {
  return error?.validationErr?.error || {};
}

export function getUserNameSugesstions(error) {
  return error?.validationErr?.userNameSugesstions || [];
}
