const value = {
  any: ["qualquer", "any"],
  stagnated: ["estagnado", "stagnated"],
  canceled: ["cancelado", "canceled"],
  paused: ["pausado", "paused"],
  "not deployed": ["não implementado", "not deployed"]
};

function getLocaleTag(tag: RepositoriesFilterOptionsTag, locale?: string) {
  const index = locale === "pt-BR"? 0:1;
  return value[tag][index];
};

export { getLocaleTag };