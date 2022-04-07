declare type BoxProps = import("@chakra-ui/react").BoxProps;

declare interface PageProps extends BoxProps {
  user: User;
  repos: Repository[];
};

declare type SocialLink = {
  name: string;
  link: string;
  type: "link" | "copy"
};

declare type Technology = {
  name: string;
  isStudying: boolean;
  haveExperience: boolean;
  haveProjects: boolean;
  haveInterest: boolean;
  ableToLead: boolean;
  useWithFrequency: boolean;
  time: string;
  points: number;
};

declare type Certificate = {
  name: string;
  issuingOrganization: string;
  issuedIn: string;
  expiresIn?: string;
  code?: string;
  url?: string;
};

declare type Personality = {
  type: "quality" | "defect";
  description: string;
};

declare type User = {
  username: string;
  fullname: string;
  name: string;
  avatar: string;
  reposUrl: string;
  qtdRepos: number;
  technologies: Technology[];
  certificates: Ceriticate[];
  personality: Personality[];
  links: SocialLink[];
  cv: string;
  about: string;
};

declare type Repository = {
  id: number;
  name: string;
  fullname: string;
  formattedName?: string;
  description?: string;
  fork?: boolean;
  url: string;
  github: string;
  language: string;
  branch: string;
  importedConfig?: Config;
  badge?: string;
  license?: string;
  template?: boolean;
};

declare type Config = {
  name: string;
  icon: string;
  technologies: string[];
  pinned: boolean;
  links: { 
    [key: string]: string 
  };
};

type FilterOptionData = {
  text: string;
  title: string;
  value: boolean;
};

declare type RepositoryBadge = {
  text: string;
  color: string;
};

declare type RepositoriesFilterOptions = {
  minLevelOfExperienceWithTechnology: number;
  technologies: string[];
  query: string;
  pinnedsFirst: boolean;
  with: {
    description: boolean;
    license: boolean;
    figmaLink: boolean;
    some: boolean;
  };
  is: {
    fork: boolean;
    some: boolean;
    template: boolean;
  };
};

declare type AppContext = {
  filteredRepositories: Repository[];
  filterOptions: RepositoriesFilterOptions;
  setFilterOptions: (options: RepositoriesFilterOptions) => void;
  repositories: Repository[];
  setRepositories: (repositories: Repository[]) => void;
  user: User;
  setUser: (user: User) => void;
};

declare type Formatter = {
  regex: string;
  replace: string;
};

declare type RepositoryLink = {
  type: RepositoryLinkType;
  value: string;
};

declare type RepositoryLinkType = "self" | "figma" | "repo";