import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";

export const appContext = createContext({} as AppContext);

interface AppProvider {
  children: ReactNode;
};

function AppProvider({ children }: AppProvider) {
  const [showBackground, setShowBackground] = useState(false);
  const [overlayId, setOverlayId] = useState("");
  const _setShowBackground = useCallback((show: boolean) => {
    setShowBackground(show);
  }, [setShowBackground]);

  const [showOverlay, setShowOverlay] = useState(false);
  const _setShowOverlay = useCallback((show: boolean, id?: string) => {
    setShowOverlay(show);
    setOverlayId(id ?? "");
  }, [setShowOverlay, setOverlayId]);

  return (
    <appContext.Provider
      value={{
        showBackground,
        overlayId,
        setShowBackground: _setShowBackground,
        showOverlay,
        setShowOverlay: _setShowOverlay
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { AppProvider };