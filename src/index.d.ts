declare module "*.md";
declare type BoxProps = import("@chakra-ui/react").BoxProps;

declare type Certificate = {
  name: string;
  issuingOrganization: string;
  issuedIn: string;
  expiresIn?: string;
  code?: string;
  url?: string;
  description?: string;
  icon?: string;
};

declare type Achievement = Certificate;

declare type Repository = {
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

declare type Config = {
  name: string;
  icon: string;
  translatedDescription: string;
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

declare type RepositoriesFilterOptionsWith = {
  description: boolean;
  license: boolean;
  figmaLink: boolean;
  deploy: boolean;
  some: boolean;
};

declare type RepositoriesFilterOptionsIs = {
  fork: boolean;
  template: boolean;
  some: boolean;
  highlight: boolean;
};

type Technologies = {
  _type: "technology";
  some: boolean;
  data: { [key: string]: boolean };
};

declare type RepositoriesFilterOptionsTag = "any" | "stagnated" | "canceled" | "not deployed" | "paused";

declare type RepositoriesFilterOptions = {
  technologies: Technologies;
  query: string;
  with: RepositoriesFilterOptionsWith;
  is: RepositoriesFilterOptionsIs;
  tag: RepositoriesFilterOptionsTag;
};

declare type AppContext = {
  showBackground: boolean;
  overlayId: string;
  setShowBackground: (show: boolean) => void;
  showOverlay: boolean;
  setShowOverlay: (show: boolean, id?: string) => void;
};

declare type RepositoriesContext = {
  filteredRepositories: Repository[];
  filterOptions: RepositoriesFilterOptions;
  setFilterOptions: (options: RepositoriesFilterOptions, technologies?: string[] | Technologies) => void;
  repositories: Repository[];
  setRepositories: (repositories: Repository[]) => void;
};

declare type SearchBarContext = {
  filterIsOpen: boolean;
  setFilterIsOpen: (filterIsOpen: boolean) => void;
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

declare type StatsImageOptions = {
  color?: string;
  titleColor?: string;
  iconColor?: string;
  bgColor?: string;
  title?: string;
};