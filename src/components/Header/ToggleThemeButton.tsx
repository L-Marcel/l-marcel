import { TFunction } from "next-i18next";
import { useTheme } from "../../context/hooks/useTheme";
import { IconButton } from "../Button/IconButton";

interface ToggleThemeButtonProps {
  t: TFunction;
}

export function ToggleThemeButton({ t }: ToggleThemeButtonProps) {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <IconButton
      className="!pl-[10px]"
      onClick={toggleTheme}
      icon={isDarkTheme ? "moon" : "sun"}
      title={
        isDarkTheme
          ? t("theme.toggle_to_light") ?? "toggle to light theme"
          : t("theme.toggle_to_dark") ?? "toggle to dark theme"
      }
    />
  );
}
