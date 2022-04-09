import { useContextSelector } from "use-context-selector";
import { repositoriesContext } from "../../RepositoriesProvider";

function useFilterOptions() {
  const filterOptions = useContextSelector(repositoriesContext, v => v.filterOptions);
  const setFilterOptions = useContextSelector(repositoriesContext, v => v.setFilterOptions);

  return {
    filterOptions,
    setFilterOptions
  };
};

export default useFilterOptions;