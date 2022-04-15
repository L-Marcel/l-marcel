function getFormattedDate(date: string, locale?: string) {
  let newDate = new Intl.DateTimeFormat(locale ?? "en-US", {
    year: "numeric",
    month: "long"
  }).format(new Date(date));

  if(locale === "pt-BR") {
    newDate = newDate.replace("de ", "");
  };

  return newDate;
};

export { getFormattedDate };