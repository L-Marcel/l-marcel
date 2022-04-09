import { useContextSelector } from "use-context-selector";
import { repositoriesContext } from "../../RepositoriesProvider";

function useRepositories() {
  const repositories = useContextSelector(repositoriesContext, v => v.repositories);
  const setRepositories = useContextSelector(repositoriesContext, v => v.setRepositories);

  return {
    repositories,
    setRepositories
  };
};

export default useRepositories;