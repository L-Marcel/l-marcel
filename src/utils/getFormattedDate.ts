function getFormattedDate(date: string, locale?: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long"
  }).format(new Date(date));
};

export { getFormattedDate };