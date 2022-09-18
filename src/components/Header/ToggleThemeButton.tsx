

import { useRouter } from "../../context/hooks/useRouter";
import { useTheme } from "../../context/hooks/useTheme";
import { IconButton } from "../Button/IconButton";

export function ToggleThemeButton() {
  const { isNotPtBr } = useRouter();
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <IconButton
      className="!pl-[10px]"
      onClick={toggleTheme} 
      icon={isDarkTheme? "moon":"sun"}
      title={isDarkTheme? 
        isNotPtBr? "toggle to light theme":"trocar para tema claro":
        isNotPtBr? "toggle to dark theme":"trocar para tema escuro"}
    />
  );
}