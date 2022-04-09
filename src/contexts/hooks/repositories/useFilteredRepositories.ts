import { useContextSelector } from "use-context-selector";
import { repositoriesContext } from "../../RepositoriesProvider";

function useFilteredRepositories() {
  const filteredRepositories = useContextSelector(repositoriesContext, v => v.filteredRepositories);
  return {
    filteredRepositories
  };
};

export default useFilteredRepositories;