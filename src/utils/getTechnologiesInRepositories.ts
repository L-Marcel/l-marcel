function getTechnologiesInRepositories(repos: Repository[]) {
  return repos.reduce((pre, cur) => {
    const technologies = cur.importedConfig?.technologies ?? [];

    for(let t in technologies) {
      const tech = technologies[t];

      if(!pre.includes(tech)) {
        pre.push(tech);
      };
    };

    return pre;
  }, []);
};

export { getTechnologiesInRepositories };