import { ReactNode, useMemo } from "react";
import { createContext } from "use-context-selector";
import { Repository } from "../../services/classes/Github";
import { useFilterReducer } from "../hooks/useFilterReducer";
import { usePaginationReducer } from "../hooks/usePaginationReducer";
import { FilterToggleOptionActionGroups, FilterType } from "./reducers/filter";
import { PaginationType } from "./reducers/pagination";

interface SearchContext {
  filter: FilterType;
  setNames: (names: string[]) => void;
  toggleOption: (option: string, group: FilterToggleOptionActionGroups) => void;
  changeProgressRange: (min: number, max: number) => void;

  filteredRepositories: Repository[];

  pagination: PaginationType;
  nextPage: () => void;
  previousPage: () => void;
  lastPage: () => void;
  firstPage: () => void;
  setPage: (page: number, onError?: (page: number) => void) => void;
}

export const searchContext = createContext<SearchContext>({} as SearchContext);

interface SearchProviderProps {
  children: ReactNode;
  repositories: Repository[];
  technologies: string[];
}

export function SearchProvider({
  children,
  repositories,
  technologies,
}: SearchProviderProps) {
  const { filter, setNames, toggleOption, changeProgressRange, getFilteredRepositories } =
    useFilterReducer({
      technologies,
    });

  const { pagination, firstPage, lastPage, nextPage, previousPage, setPage } =
    usePaginationReducer({
      size: repositories.length,
    });

  const filteredRepositories = useMemo(() => {
    return getFilteredRepositories(repositories);
  }, [getFilteredRepositories, repositories]);

  return (
    <searchContext.Provider
      value={{
        filter,
        setNames,
        toggleOption,
        changeProgressRange,

        filteredRepositories,

        pagination,
        nextPage,
        lastPage,
        previousPage,
        firstPage,
        setPage,
      }}
    >
      {children}
    </searchContext.Provider>
  );
}
