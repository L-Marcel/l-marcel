function filterRepositories(repos: Repository[], filter: RepositoriesFilterOptions) {
  /*//with
  if(filter.with.some) {
    const { description, figmaLink, license } = filter.with;
    repos = repos.filter(r => {
      const a = r.description || !description;
      const b = r.license || !license;
      let c = false;
      
      try {
        c = r.importedConfig.links["figma"] !== undefined || !figmaLink;
      } catch (error) {
        c = !figmaLink;
      }

      if(a && c && b) {
        return true;
      };

      return false;
    });
  };

  //is
  if(filter.is.some) {
    const { fork, template } = filter.is;
    repos = fork? repos.filter(r => r.fork):repos;
    repos = template? repos.filter(r => r.template):repos;
  };

  // technologies: string[];
  repos = repos.filter(r => {
    return r.importedConfig.technologies.map(reposTech => {
      return filter.technologies.includes(reposTech.toLowerCase());
    }).every(Boolean);
  });*/
  
  // query: string;
  repos = repos.filter(r => {
    return r.name.toLowerCase()
    .match(filter.query.toLowerCase()) ||
    r.formattedName.toLowerCase()
    .match(filter.query.toLowerCase());
  });

  if(filter.pinnedsFirst) {
    repos = repos.sort((a, b) => {
      return a.importedConfig.pinned === b.importedConfig.pinned? 0:
      a.importedConfig.pinned? -1:1;
    });
  };

  return repos;
};

export { filterRepositories };