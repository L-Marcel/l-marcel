function getFilterConfigIsIndeterminated(config: { [key: string]: boolean }) {
  const entries = Object.entries(config);

  for(let e in entries) {
    const [key, value] = entries[e];

    if(key !== "some" && value) {
      return true;
    };
  };

  return false;
};

export { getFilterConfigIsIndeterminated };