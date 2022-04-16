function getAllFIlterConfigIsActived(config: { [key: string]: boolean }) {
  const entries = Object.entries(config);

  let allIsActived = true;

  for(let e in entries) {
    const [key, value] = entries[e];

    if(key !== "some" && !value) {
      allIsActived = false;
    };
  };

  return allIsActived;
};

export { getAllFIlterConfigIsActived };