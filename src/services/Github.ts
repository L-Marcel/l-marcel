import axios from "axios";
import { formatters } from "../constants/formatters";

export type Formatter = {
  regex: string;
  replace: string;
};

export type Config = {
  name: string;
  icon: string;
  translatedDescription: string;
  technologies: string[];
  pinned: boolean;
  links?: { 
    [key: string]: string 
  };
};

export type Repository = {
  id: number;
  name: string;
  fullname: string;
  formattedName?: string;
  description?: string;
  fork?: boolean;
  url: string;
  github: string;
  languagesUrl: string;
  language: string;
  languages?: { [key: string]: number };
  branch: string;
  importedConfig?: Config;
  badge?: string;
  license?: string;
  template?: boolean;
};

export type License = {
  name: string;
};

export interface GithubRepositoryData  {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  fork?: boolean;
  is_template: boolean;
  svn_url: string;
  languages_url: string;
  language: string;
  url: string;
  default_branch: string;
  license?: License;
}

export type GithubGetReposOptions = {
  reposPerPage?: number;
  initialPage?: number;
  repos?: Repository[];
  getLanguages?: boolean;
  locale?: string;
};

export class Github {
  private static readonly auth = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

  static raw = axios.create({
    baseURL: "https://raw.githubusercontent.com"
  });

  static api = axios.create({
    baseURL: "https://api.github.com",
    headers: {
      "Authorization": "Bearer  " + this.auth
    }
  });

  static async getReadme(locale: string, repo = "l-marcel/next-l-marcel") {
    return await this.raw
      .get(`${repo}/main/README${locale === "en-us"? ".en-US":""}.md`)
      .then(res => res.data)
      .catch(async() => {
        return await this.raw
          .get(`l-marcel/next-l-marcel/main/README_ERROR${locale === "en-us"? ".en-US":""}.md`)
          .then(res => res.data);
      });
  }

  private static getFormattedRepositoryName(name: string) {
    try {
      let formattedName = name;
  
      for(const f in formatters) {
        const regex = new RegExp(formatters[f].regex, "g");
        formattedName = formattedName.replace(regex, formatters[f].replace);
      }
  
      return formattedName;
    } catch (error) {
      return name;
    }
  }

  
  private static async getRepositoryLanguages(languageUrl: string) {
    return await this.api.get(languageUrl).then(res => res.data).catch(() => null);
  }

  static async getRepositories({ 
    reposPerPage = 50, 
    initialPage = 1,
    repos = [],
    getLanguages = false,
    locale = "pt-br"
  }: GithubGetReposOptions): Promise<Repository[]> {
    const url = "https://api.github.com/users/l-marcel/repos";
  
    const pageRepos = await this.api.get<GithubRepositoryData[]>(`${url}?per_page=${reposPerPage}&page=${initialPage}`).then(async(res) => {
      const data = res.data;
      const repos: Repository[] = data.map(repo => {
        return {
          id: repo.id,
          name: repo?.name,
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
  
      for(const i in repos) {
        const config: Config = await this.raw.get(`${repos[i].fullname}/${repos[i].branch}/l-marcel.config.json`)
          .then(config => config.data).catch(() => ({}));

        const nameAlreadyDefined = !!config?.name;
  
        if(locale === "pt-BR" && config?.translatedDescription) repos[i].description = config?.translatedDescription;
        
        if(!config.name) config.name = repos[i]?.name ?? "";
        if(!config.icon) config.icon = repos[i]?.language ?? "default";
        if(!config.technologies) config.technologies = [];

        if(config.pinned !== true && config.pinned !== false) config.pinned = false;
        if(config.icon !== "self" && config.technologies.length > 0) config.icon = config.technologies[0];
  
        const languageIsIncluded = config.technologies.includes(repos[i].language);
  
        if(!languageIsIncluded && repos[i].language) config.technologies.push(repos[i].language);
  
        const haveTypeScript = config.technologies.includes("TypeScript");
        const notHaveJavaScript = !config.technologies.includes("JavaScript");
  
        if(haveTypeScript && notHaveJavaScript) config.technologies.push("JavaScript");

        config.technologies = Array.from(new Set(config.technologies)) as string[];
  
        const badges = repos[i].description?.match(/\[+.+\]/g);
      
        if(badges) {
          repos[i].badge = badges[0].replace(/\[/g, "").replace(/\]/g, "");
          repos[i].description = repos[i].description?.replace(/\[+.+\]/g, "");
        }
  
        const newName = config.name;
  
        repos[i].importedConfig = config;
        repos[i].formattedName = nameAlreadyDefined? newName:this.getFormattedRepositoryName(newName);
  
        repos[i].languages = getLanguages && !repos[i].fork? await this.getRepositoryLanguages(repos[i].languagesUrl):null;
      }
  
      return repos;
    }).catch((err) => {
      console.log(err);
      return [] as Repository[];
    });
  
    const reposListLength = repos.length + pageRepos.length;
  
    if(Math.floor(reposListLength/initialPage) >= reposPerPage) {
      return await this.getRepositories({ 
        reposPerPage, 
        initialPage: initialPage + 1, 
        repos: [ ...repos, ...pageRepos ],
        getLanguages,
        locale
      });
    }
  
    return [ ...repos, ...pageRepos ];
  }
}