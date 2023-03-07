import { ThemeProvider } from "../../context/providers/ThemeProvider";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { NavLink } from "../Navigation/NavLink";
import { VerticalDivider } from "../VerticalDivider";
import { MobileMenu } from "./Mobile/MobileMenu";
import { TFunction, withTranslation } from "next-i18next";

interface HeaderProps {
  t: TFunction;
}

function _Header({ t }: HeaderProps) {
  return (
    <>
      <header className="fixed top-[-2.78rem] z-50 w-full md:drop-shadow-lg">
        <nav className="absolute bottom-0 top-[2.78rem] z-40 hidden w-full flex-row justify-between px-16 md:flex">
          <ul className="nav-links flex flex-row">
            <NavLink t={t} path="/" name="resume" />
            <NavLink t={t} path="/projects" name="projects" dynamic />
            <NavLink t={t} path="/achievements" name="achievements" />
          </ul>
          <ul className="nav-links flex flex-row">
            <li>
              <ThemeProvider>
                <ToggleThemeButton t={t} />
              </ThemeProvider>
            </li>
            <li className="h-[2.8125rem]">
              <VerticalDivider />
            </li>
            <NavLink t={t} path="" name="pt-br" locale="pt-br" />
            <NavLink t={t} path="" name="en-us" locale="en-us" />
          </ul>
        </nav>
        <span className="fixed top-0 z-[-5] w-full border-t-[1.3125rem] border-primary-600 drop-shadow-sm md:top-[2.78rem]"></span>
      </header>
      <MobileMenu t={t} />
    </>
  );
}

export const Header = withTranslation(["common"])(_Header);
