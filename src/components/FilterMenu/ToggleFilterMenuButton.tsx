import { HTMLAttributes } from "react";
import { useMenuIsOpen } from "../../context/hooks/useMenuIsOpen";
import { useTranslation } from "next-i18next";
import {
  ToggleFilterMenuButtonContainer,
  ToggleFilterMenuButtonContainerLabel,
} from "./styles";

export function ToggleFilterMenuButton({ ...rest }: HTMLAttributes<HTMLButtonElement>) {
  const { t } = useTranslation("projects");
  const { toggleMenu, isOpen } = useMenuIsOpen();

  return (
    <>
      <ToggleFilterMenuButtonContainer
        id="toggle-filter-menu-button-container"
        $open={isOpen}
        onClick={toggleMenu}
        icon={isOpen ? "returnLeftArrow" : "filter"}
        iconClassName="!text-[2.1rem] md:!text-[1.4125rem]"
        size="sm"
        {...rest}
      />
      <ToggleFilterMenuButtonContainerLabel htmlFor="toggle-filter-menu-button-container">
        {isOpen ? t("filter.button.projects") : t("filter.button.filters")}
      </ToggleFilterMenuButtonContainerLabel>
    </>
  );
}
