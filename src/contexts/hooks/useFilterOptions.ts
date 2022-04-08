import { useContextSelector } from "use-context-selector";
import { appContext } from "../../contexts/AppProvider";

function useFilterOptions() {
  const filterOptions = useContextSelector(appContext, v => v.filterOptions);
  const setFilterOptions = useContextSelector(appContext, v => v.setFilterOptions);

  return {
    filterOptions,
    setFilterOptions
  };
};

export default useFilterOptions;