import { useContextSelector } from "use-context-selector";
import { searchBarContext } from "../../SearchBarProvider";

function useFilterIsOpen() {
  const filterIsOpen = useContextSelector(searchBarContext, v => v.filterIsOpen);
  const setFilterIsOpen = useContextSelector(searchBarContext, v => v.setFilterIsOpen);

  return {
    filterIsOpen,
    setFilterIsOpen
  };
};

export default useFilterIsOpen;