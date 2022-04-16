import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { getFilteredRepositories } from "../utils/getFilteredRepositories";
import useShowOverlay from "./hooks/useShowOverlay";
import { getFilterConfigIsIndeterminated } from "../utils/getFIlterConfigIsIndeterminated";
import { useRouter } from "next/router";


export const repositoriesContext = createContext({} as RepositoriesContext);

interface RepositoriesProviderProps {
  children: ReactNode;
};

function RepositoriesProvider({ children }: RepositoriesProviderProps) {
  const { overlayId } = useShowOverlay();
  const { locale } = useRouter();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filterChanged, setFilterChanged] = useState(false);
  const [filterOptions, setFilterOptions] = 
  useState<RepositoriesFilterOptions>({
    tag: "any",
    with: {
      some: false,
      description: false,
      deploy: false,
      license: false,
      figmaLink: false,
    },
    is: {
      highlight: false,
      some: false,
      fork: false,
      template: false,
    },
    technologies: {
      _type: "technology",
      some: false,
      data: {}
    },
    query: ""
  });

  const _setRepositories = useCallback((repositories: Repository[]) => {
    setRepositories(repositories);
  }, [setRepositories]);

  const _setFilterOptions = useCallback((o: RepositoriesFilterOptions, technologies?: string[] | Technologies) => {
    let techs = technologies as Technologies;
    if(!techs?._type && techs) {
      const arr = technologies as string[];
      techs = arr.reduce<Technologies>((pre, t: string) => {
        const tech = t.toLowerCase();
        if(!pre.data[tech]) {
          pre.data[tech] = false;
        };

        return pre;
      }, { _type: "technology", some: false, data: {} });
      o.technologies = techs;
    } else if(techs?._type === "technology") {
      o.technologies = techs;
    };

    o.with.some = getFilterConfigIsIndeterminated(o.with);
    o.is.some = getFilterConfigIsIndeterminated(o.is);
    o.technologies.some = getFilterConfigIsIndeterminated(o.technologies.data);

    setFilterChanged(true);
    setFilterOptions(o);
  }, [setFilterOptions, setFilterChanged]);

  const [filteredRepositories, setFilteredRepositories] = useState(repositories);

  useEffect(() => {
    if(overlayId !== "filter" && overlayId !== "repo" && filterChanged) {
      const newData = getFilteredRepositories(repositories, filterOptions, locale);
      setFilteredRepositories(newData);
      setFilterChanged(false);
    };
  }, [
    setFilteredRepositories, 
    setFilterChanged, 
    filterChanged, 
    repositories, 
    filterOptions, 
    locale
  ]);

  return (
    <repositoriesContext.Provider
      value={{
        filteredRepositories,
        repositories,
        setRepositories: _setRepositories,
        filterOptions,
        setFilterOptions: _setFilterOptions
      }}
    >
      {children}
    </repositoriesContext.Provider>
  );
};

export { RepositoriesProvider };