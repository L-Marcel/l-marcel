import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { getFilteredRepositories } from "../utils/getFilteredRepositories";


export const repositoriesContext = createContext({} as RepositoriesContext);

interface RepositoriesProviderProps {
  children: ReactNode;
};

function RepositoriesProvider({ children }: RepositoriesProviderProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
  const [filterOptions, setFilterOptions] = useState<RepositoriesFilterOptions>({
    with: {
      some: false,
      description: false,
      license: false,
      figmaLink: false,
    },
    is: {
      some: false,
      fork: false,
      template: false,
    },
    minLevelOfExperienceWithTechnology: 0,
    technologies: [],
    query: "",
    pinnedsFirst: true
  });

  const _setRepositories = useCallback((repositories: Repository[]) => {
    setRepositories(repositories);
  }, [setRepositories]);

  const _setFilterOptions = useCallback((o: RepositoriesFilterOptions, technologies: string[]) => {
    setFilterOptions({
      ...o,
      technologies: technologies.map(t => t.toLowerCase()) ?? []
    });
  }, [setFilterOptions]);

  useEffect(() => {
    console.log(repositories);
    let repos = getFilteredRepositories(repositories, filterOptions);
    console.log(repos);
    setFilteredRepositories(repos);
  }, [repositories, filterOptions]);

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