import { useContextSelector } from "use-context-selector";
import { appContext } from "../../contexts/AppProvider";

function useFilteredRepositories() {
  const filteredRepositories = useContextSelector(appContext, v => v.filteredRepositories);
  return {
    filteredRepositories
  };
};

export default useFilteredRepositories;