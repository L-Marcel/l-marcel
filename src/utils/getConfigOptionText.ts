const keyTexts = {
  deploy: ["implementado", "deployed"],
  description: ["com descrição", "with description"],
  figmaLink: ["com projeto do figma", "with figma link"],
  license: ["licenciado", "licensed"],
  template: ["modelo", "template"],
  fork: ["bifurcação", "fork"],
  highlight: ["destaque", "highlight"],
  any: ["qualquer", "any"],
  stagnated: ["estagnado", "stagnated"],
  canceled: ["cancelado", "canceled"],
  paused: ["pausado", "paused"],
  "not deployed": ["não implementado", "not deployed"]
}

function getConfigOptionText(key: string, locale: string) {
  const i = locale === "pt-BR"? 0:1;
  try {
    return keyTexts[key][i] ?? 0;
  } catch (error) {
    return "";
  }
};

export { getConfigOptionText };

