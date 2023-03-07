import { TFunction } from "next-i18next";
import { useTheme } from "../../../context/hooks/useTheme";
import { Icon } from "../../Icon";
import { MobileToggleThemeIconButton } from "./styles";

interface MobileToggleThemeButtonProps {
  t: TFunction;
}

export function MobileToggleThemeButton({ t }: MobileToggleThemeButtonProps) {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <MobileToggleThemeIconButton onClick={toggleTheme}>
      <Icon
        className="!text-[1.5rem] duration-100"
        name={isDarkTheme ? "moon" : "sun"}
        title={
          isDarkTheme
            ? t("theme.toggle_to_light") ?? "toggle to light theme"
            : t("theme.toggle_to_dark") ?? "toggle to dark theme"
        }
        withoutTooltip
      />
    </MobileToggleThemeIconButton>
  );
}
