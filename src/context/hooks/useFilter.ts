
import { useContextSelector } from "use-context-selector";
import { searchContext } from "../providers/SearchProvider";

export function useFilter() {
  return useContextSelector(searchContext, search => {
    return {
      setNames: search.setNames
    };
  });
}