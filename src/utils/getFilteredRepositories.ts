import { getLocaleTag } from "./getLocaleTag";

function getFilteredRepositories(repos: Repository[], filter: RepositoriesFilterOptions, locale?: string) {
  //with
  if(filter.with.some) {
    const { description, figmaLink, license, deploy } = filter.with;
    repos = repos.filter(r => {
      const a = r.description || !description;
      const b = r.license || !license;
      let c = false;
      let d = false;

      try {
        c = r.importedConfig.links["self"] !== undefined || !deploy;
      } catch (error) {
        c = !deploy;
      };
      
      try {
        d = r.importedConfig.links["figma"] !== undefined || !figmaLink;
      } catch (error) {
        d = !figmaLink;
      };

      if(a && c && b && d) {
        return true;
      };

      return false;
    });
  };

  //is
  if(filter.is.some) {
    const { fork, template, highlight } = filter.is;
    repos = fork? repos.filter(r => r.fork):repos;
    repos = template? repos.filter(r => r.template):repos;
    repos = highlight? repos.filter(r => r.importedConfig?.pinned):repos;
  };

  //technologies
  if(filter.technologies?.some) {
    repos = repos.filter(r => {
      const techs = r.importedConfig?.technologies ?? [];
      const entries = Object.entries(filter.technologies?.data ?? {});
  
      for(let e in entries) {
        const [key, value] = entries[e];
        
        if(value) {
          const haveTech = techs.some(t => t.toLowerCase() === key);
  
          if(!haveTech) {
            return false;
          };
        };
      };
     
      return true;
    });
  };

  //tag
  repos = repos.filter(r => {
    return filter.tag === "any"? true:
    r.badge? r.badge?.toLowerCase() === getLocaleTag(filter.tag, locale)
    :false;
  });

  //query
  repos = repos.filter(r => {
    return r.name.toLowerCase()
    .match(filter.query.toLowerCase()) ||
    r.formattedName.toLowerCase()
    .match(filter.query.toLowerCase());
  });

  //pinnedsFirst
  repos = repos.sort((a, b) => {
    return a.importedConfig.pinned === b.importedConfig.pinned? 0:
    a.importedConfig.pinned? -1:1;
  });

  return repos;
};

export { getFilteredRepositories };