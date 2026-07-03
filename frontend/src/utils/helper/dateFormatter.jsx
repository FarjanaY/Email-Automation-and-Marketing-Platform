export const formatCreatedAtDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};
