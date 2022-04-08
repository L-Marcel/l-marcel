import { api } from "./api";
import { getRepoFormattedName } from "../utils/getRepoFormattedName"; 

type GithubGetReposOptions = {
  reposPerPage: number;
  initialPage: number;
  repos: Repository[];
  formatters: Formatter[];
  getLanguages?: boolean;
};

async function getGithubRepos(url: string, { 
  reposPerPage = 30, 
  initialPage = 1,
  repos = [],
  formatters = [],
  getLanguages = false,
}: GithubGetReposOptions) {
  const pageRepos = await api.get(`${url}?per_page=${reposPerPage}&page=${initialPage}`).then(async(res) => {
    const data = res.data;
    const repos: Repository[] = data.map(repo => {
      return {
        id: repo.id,
        name: repo.name,
        fullname: repo.full_name,
        description: repo.description,
        fork: repo.fork,
        template: repo.is_template,
        url: repo.url,
        github: repo.svn_url,
        languagesUrl: repo.languages_url,
        language: repo.language,
        branch: repo.default_branch,
        license: repo.license?.name ?? null,
      } as Repository;
    });

    for(let i in repos) {
      let config: Config = await api.get(`https://raw.githubusercontent.com/${repos[i].fullname}/${repos[i].branch}/l-marcel.config.json`)
      .then(config => config.data).catch(() => null);
      config = {
        name: repos[i].name,
        icon: repos[i].language ?? "default",
        links: null,
        pinned: config?.pinned? config?.pinned:false,
        technologies: [],
        ...config,
      };

      if(config.icon !== "self" && config.technologies.length > 0) {
        config.icon = config.technologies[0];
      };

      const languageIsIncluded = config.technologies.includes(repos[i].language);

      if(!languageIsIncluded && repos[i].language) {
        config.technologies.push(repos[i].language);
      };

      const haveTypeScript = config.technologies.includes("TypeScript");
      const notHaveJavaScript = !config.technologies.includes("JavaScript");

      if(haveTypeScript && notHaveJavaScript) {
        config.technologies.push("JavaScript");
      };

      config.technologies = Array.from(new Set(config.technologies)) as string[];

      let badges = repos[i].description?.match(/\[+.+\]/g);
    
      if(badges) {
        repos[i].badge = badges[0].replace(/\[/g, "").replace(/\]/g, "");
        repos[i].description = repos[i].description.replace(/\[+.+\]/g, "");
      };

      repos[i].importedConfig = config;
      repos[i].formattedName = getRepoFormattedName(repos[i].importedConfig.name, formatters);

      repos[i].languages = getLanguages && !repos[i].fork? await getGithubReposLanguages(repos[i].languagesUrl):{};
    };

    return repos;
  }).catch(() => [] as Repository[]);

  const reposListLength = repos.length + pageRepos.length;

  if(Math.floor(reposListLength/initialPage) >= reposPerPage) {
    return await getGithubRepos(url, { 
      reposPerPage, 
      initialPage: initialPage + 1, 
      repos: [ ...repos, ...pageRepos ],
      formatters,
      getLanguages
    });
  };

  return [ ...repos, ...pageRepos ];
};

async function getGithubUser() {
  return await api.get("https://api.github.com/users/l-marcel")
  .then(res => {
    const data = res.data;
    const splitedName = data.name.split(" ");
    const firstName = splitedName.length > 0 ? splitedName[0]:"";
    const lastName = splitedName.length > 1 ? splitedName[splitedName.length - 1]:"";

    return {
      username: String(data.login).toLowerCase(),
      fullname: data.name,
      name: `${firstName} ${lastName}`,
      avatar: data.avatar_url,
      reposUrl: data.repos_url,
      qtdRepos: data.public_repos,
      about: ""
    } as User;
  });
};

async function getGithubReposLanguages(languageUrl: string) {
  return await api.get(languageUrl).then(res => res.data).catch(() => null);
};

function getGithubReposTopLanguages(repos: Repository[]): { [key: string]: number } {
  const data = repos.reduce((pre, cur) => {
    const entries = Object.entries(cur.languages);

    for(let e in entries) {
      let [key, value] = entries[e];

      if(pre[key]) {
        pre[key] += Number(value); 
      } else {
        pre[key] = Number(value); 
      };
    };

    return pre;
  }, {});

  return data;
};

export { 
  getGithubRepos,
  getGithubUser,
  getGithubReposLanguages,
  getGithubReposTopLanguages
 };