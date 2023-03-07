import { MenuProvider } from "../../../context/providers/MenuProvider";
import { ThemeProvider } from "../../../context/providers/ThemeProvider";
import { MobileMenuContent } from "./MobileMenuContent";
import { MobileToggleMenuButton } from "./MobileToggleMenuButton";
import { MobileToggleThemeButton } from "./MobileToggleThemeButton";
import {
  MobileMenuContainer,
  MobileMenuNavigationContainer,
  MobileMenuSideBar,
} from "./styles";
import { TFunction } from "next-i18next";

interface MobileMenuProps {
  t: TFunction;
}

export function MobileMenu({ t }: MobileMenuProps) {
  return (
    <MobileMenuNavigationContainer>
      <div className="absolute left-0 h-full w-full bg-primary-600" />
      <MobileMenuSideBar>
        <MobileMenuContainer>
          <ThemeProvider>
            <MobileToggleThemeButton t={t} />
          </ThemeProvider>
          <MenuProvider>
            <MobileMenuContent t={t} />
            <MobileToggleMenuButton />
          </MenuProvider>
        </MobileMenuContainer>
      </MobileMenuSideBar>
    </MobileMenuNavigationContainer>
  );
}
