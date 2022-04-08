import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { filterRepositories } from "../utils/filterRepositories";


export const appContext = createContext({} as AppContext);

interface AppProvider {
  children: ReactNode;
};

function AppProvider({ children }: AppProvider) {
  const [showBackground, setShowBackground] = useState(false);
  const _setShowBackground = useCallback((show: boolean) => {
    setShowBackground(show);
  }, [setShowBackground]);
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

  const _setFilterOptions = useCallback((o: RepositoriesFilterOptions, user: User) => {
    setFilterOptions({
      ...o,
      technologies: user?.technologies.map(t => t.name.toLowerCase()) ?? []
    });
  }, [setFilterOptions]);

  useEffect(() => {
    let repos = filterRepositories(repositories, filterOptions);
    setFilteredRepositories(repos);
  }, [repositories, filterOptions]);

  return (
    <appContext.Provider
      value={{
        filteredRepositories,
        repositories,
        setRepositories: _setRepositories,
        filterOptions,
        setFilterOptions: _setFilterOptions,
        showBackground,
        setShowBackground: _setShowBackground
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { AppProvider };