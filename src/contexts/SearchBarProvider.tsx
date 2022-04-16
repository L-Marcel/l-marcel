import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import useShowOverlay from "./hooks/useShowOverlay";

export const searchBarContext = createContext({} as SearchBarContext);

interface SearchBarProviderProps {
  children: ReactNode;
};

function SearchBarProvider({ children }: SearchBarProviderProps) {
  const { overlayId } = useShowOverlay(); 
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const _filterIsOpen = useCallback((filterIsOpen: boolean) => {
    setFilterIsOpen(filterIsOpen);
  }, [setFilterIsOpen]);

  useEffect(() => {
    if(overlayId !== "filter") {
      setFilterIsOpen(false);
    };
  }, [overlayId, setFilterIsOpen]);

  return (
    <searchBarContext.Provider
      value={{
        filterIsOpen,
        setFilterIsOpen: _filterIsOpen
      }}
    >
      {children}
    </searchBarContext.Provider>
  );
};

export { SearchBarProvider };