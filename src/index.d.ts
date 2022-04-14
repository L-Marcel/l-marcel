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
  showBackground: boolean;
  setShowBackground: (show: boolean) => void;
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
};

declare type RepositoriesContext = {
  filteredRepositories: Repository[];
  filterOptions: RepositoriesFilterOptions;
  setFilterOptions: (options: RepositoriesFilterOptions, technologies: Technology[]) => void;
  repositories: Repository[];
  setRepositories: (repositories: Repository[]) => void;
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