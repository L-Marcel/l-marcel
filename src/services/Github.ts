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
  progress?: number;
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
  _filtered: boolean;
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
  repositories?: Repository[];
  getLanguages?: boolean;
  locale?: string;
};

export type GithubGetRepoOptions = {
  repositoryName: string;
  getLanguages?: boolean;
  locale?: string;
};

export type GithubGetRepoData = {
  repository: Repository;
  readme: string;
  demoVideoURL: string;
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

  private static getReadmeContent(res: {
    data: {
      content: string,
      encoding: "utf8"
    }
  }): string {
    const { content, encoding } = res.data;
    const buf = Buffer.from(content, encoding);

    return buf.toString();
  }

  static async getReadme(locale: string, repository = "l-marcel/l-marcel") {
    let readme = await this.api
      .get(`repos/${repository}/contents/README${locale === "en-us"? ".en-US":""}.md`)
      .then(res => this.getReadmeContent(res))
      .catch(async() => {
        return await this.api
          .get(`repos/${repository}/contents/readme${locale === "en-us"? ".en-US":""}.md`)
          .then(res => this.getReadmeContent(res))
          .catch(async() => {
            return await this.api
              .get(`repos/l-marcel/l-marcel/contents/README_ERROR${locale === "en-us"? ".en-US":""}.md`)
              .then(res => this.getReadmeContent(res));
          });
      });

    readme = readme.replace("<div id=\"repository-buttons\"/>", `<a class="navigation-link" href="https://github.com/${repository}" target="__blank__">
    ${locale !== "pt-br"? "repository":"repositório"}
</a>
<span id="only-if-not-last">•</span>`);
    
    return readme;
  }

  static async getDemoVideoURL(repository = "l-marcel/l-marcel") {
    return await this.api
      .get(`repos/${repository}/contents/public/demo.mp4`)
      .then((res) => res.data.download_url)
      .catch(() => null);
  }

  static async checkRepository(name: string) {
    const url = `https://api.github.com/repos/l-marcel/${name}`;
  
    return await this.api.get(url).then(() => true).catch(() => false);
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
    repositories = [],
    getLanguages = false,
    locale = "pt-br"
  }: GithubGetReposOptions): Promise<Repository[]> {
    const url = "https://api.github.com/users/l-marcel/repos";
  
    const pageRepos = await this.api.get<GithubRepositoryData[]>(`${url}?sort=pushed&per_page=${reposPerPage}&page=${initialPage}`).then(async(res) => {
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
          _filtered: true,
        } as Repository;
      });
  
      for(const i in repos) {
        const config: Config = await this.raw.get(`${repos[i].fullname}/${repos[i].branch}/l-marcel.config.json`)
          .then(config => config.data).catch(() => ({}));

        const nameAlreadyDefined = !!config?.name;
  
        if(locale === "pt-br" && config?.translatedDescription) {
          repos[i].description = config?.translatedDescription;
        } else if(locale === "pt-br") {
          repos[i].description = "";
        }
        
        if(!config.name) config.name = repos[i]?.name ?? "";
        if(!config.icon) config.icon = repos[i]?.language ?? "default";
        if(!config.progress) config.progress = 0;
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
  
    const reposListLength = repositories.length + pageRepos.length;
  
    if(Math.floor(reposListLength/initialPage) >= reposPerPage) {
      return await this.getRepositories({ 
        reposPerPage, 
        initialPage: initialPage + 1, 
        repositories: [ ...repositories, ...pageRepos ],
        getLanguages,
        locale
      });
    }
  
    return [ ...repositories, ...pageRepos ];
  }

  static async getRepository({ 
    repositoryName,
    getLanguages = false,
    locale = "pt-br"
  }: GithubGetRepoOptions): Promise<GithubGetRepoData> {
    const url = "https://api.github.com/repos/l-marcel/";
  
    const repository = await this.api.get<GithubRepositoryData>(`${url}${repositoryName}`).then((res) => {
      const repo = res.data;
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
        _filtered: true,
      } as Repository;
    });
  
    const config: Config = await this.raw.get(`${repository.fullname}/${repository.branch}/l-marcel.config.json`)
      .then(config => config.data).catch(() => ({}));

    const nameAlreadyDefined = !!config?.name;

    if(locale === "pt-br" && config?.translatedDescription) {
      repository.description = config?.translatedDescription;
    } else if(locale === "pt-br") {
      repository.description = "";
    }
    
    if(!config.name) config.name = repository?.name ?? "";
    if(!config.icon) config.icon = repository?.language ?? "default";
    if(!config.progress) config.progress = 0;
    if(!config.technologies) config.technologies = [];

    if(config.pinned !== true && config.pinned !== false) config.pinned = false;
    if(config.icon !== "self" && config.technologies.length > 0) config.icon = config.technologies[0];

    const languageIsIncluded = config.technologies.includes(repository.language);

    if(!languageIsIncluded && repository.language) config.technologies.push(repository.language);

    const haveTypeScript = config.technologies.includes("TypeScript");
    const notHaveJavaScript = !config.technologies.includes("JavaScript");

    if(haveTypeScript && notHaveJavaScript) config.technologies.push("JavaScript");

    config.technologies = Array.from(new Set(config.technologies)) as string[];

    const badges = repository.description?.match(/\[+.+\]/g);
  
    if(badges) {
      repository.badge = badges[0].replace(/\[/g, "").replace(/\]/g, "");
      repository.description = repository.description?.replace(/\[+.+\]/g, "");
    }

    const newName = config.name;

    repository.importedConfig = config;
    repository.formattedName = nameAlreadyDefined? newName:this.getFormattedRepositoryName(newName);

    repository.languages = getLanguages && !repository.fork? await this.getRepositoryLanguages(repository.languagesUrl):null;


    let readme: string = await Github.getReadme(locale ?? "pt-br", `l-marcel/${repositoryName}`);
    readme = readme.replace("<span id=\"repository-name\"/>", `<span>${repositoryName}</span>`);

    const demoVideoURL = await Github.getDemoVideoURL(`l-marcel/${repositoryName}`);

    return { repository, readme, demoVideoURL };
  }
}