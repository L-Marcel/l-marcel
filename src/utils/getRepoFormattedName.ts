function getRepoFormattedName(name: string, formatters: Formatter[]) {
  try {
    let formattedName = name;

    for(let f in formatters) {
      let regex = new RegExp(formatters[f].regex, "g");
      formattedName = formattedName.replace(regex, formatters[f].replace);
    };

    return formattedName;
  } catch (error) {
    return name;
  }
};

export { getRepoFormattedName };