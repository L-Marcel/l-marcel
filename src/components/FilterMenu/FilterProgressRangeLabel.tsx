import { useFilter } from "../../context/hooks/useFilter";
import { useTranslation } from "next-i18next";
import {
  ProgressRangeDisabledLabel,
  ProgressRangeLabel,
  ProgressRangeLabelBox,
} from "./styles";

export function FilterProgressRangeLabel() {
  const { t } = useTranslation("projects");
  const { filter } = useFilter();

  const minProgress = filter.progress.min / 100;
  const maxProgress = filter.progress.max / 100;

  const isEnabled = !(
    minProgress === 1 ||
    maxProgress === 0 ||
    (minProgress === 0 && maxProgress === 1)
  );

  return (
    <ProgressRangeLabelBox>
      <ProgressRangeLabel isEnabled={isEnabled}>
        {t("filter.progress.label")}
      </ProgressRangeLabel>
      {!isEnabled && (
        <ProgressRangeDisabledLabel>
          {t("filter.progress.disabled")}
        </ProgressRangeDisabledLabel>
      )}
    </ProgressRangeLabelBox>
  );
}
