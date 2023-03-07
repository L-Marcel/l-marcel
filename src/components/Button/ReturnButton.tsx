import { useTranslation } from "next-i18next";
import { useRouter } from "../../context/hooks/useRouter";
import { ReturnButtonContainer } from "./styles";

export interface ReturnButtonProps {
  path: string;
}

export function ReturnButton({ path }: ReturnButtonProps) {
  const { push } = useRouter();
  const { t } = useTranslation();

  function handleNavigateBack() {
    push(path);
  }

  return (
    <ReturnButtonContainer onClick={handleNavigateBack}>
      {t("return_button")}
    </ReturnButtonContainer>
  );
}
