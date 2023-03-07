import { ReactNode, useCallback, useState } from "react";
import { createContext } from "use-context-selector";

export interface MenuProviderProps {
  children: ReactNode;
}
export interface MenuContext {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const menuContext = createContext<MenuContext>({} as MenuContext);

export function MenuProvider({ children }: MenuProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = useCallback(() => {
    setIsOpen((isOpen) => {
      return !isOpen;
    });
  }, [setIsOpen]);

  return (
    <menuContext.Provider
      value={{
        isOpen,
        toggleMenu: handleToggleMenu,
      }}
    >
      {children}
    </menuContext.Provider>
  );
}
