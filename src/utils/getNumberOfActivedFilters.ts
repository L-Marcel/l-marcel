function getNumberOfActivedFilters(config: { [key: string]: boolean }[], add?: number) {
  let num = add ?? 0;

  for(let c in config) {
    const entries = Object.entries(config[c]);

    for(let e in entries) {
      const [key, value] = entries[e];

      if(key !== "some" && value) {
        num++;
      };
    };
  };

  return num;
};

export { getNumberOfActivedFilters };