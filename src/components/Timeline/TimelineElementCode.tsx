import { useState } from "react";
import { useRouter } from "../../context/hooks/useRouter";
import { Icon } from "../Icon";
import { TimelineElementCodeContainer, TimelineElementCodeCopyButton } from "./styles";
import { useTranslation } from "next-i18next";

export interface TimelineElementCodeProps {
  code: string;
}

export function TimelineElementCode({ code }: TimelineElementCodeProps) {
  const { t } = useTranslation("achievements");
  const { isNotPtBr } = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  function handleOnCopyCode(code: string) {
    let interval: NodeJS.Timer;

    window.navigator.clipboard
      .writeText(code)
      .then(() => {
        setIsCopied(true);
        if (!interval) {
          setTimeout(() => {
            setIsCopied(false);
          }, 1000 * 2);
        }
      })
      .catch(() => {
        setIsCopied(false);
      });
  }

  return (
    <TimelineElementCodeContainer>
      {code}
      <TimelineElementCodeCopyButton
        isNotPtBr={isNotPtBr}
        onClick={() => {
          return handleOnCopyCode(code);
        }}
      >
        <Icon name="copy" withoutTooltip />
        <p className="flex !w-[6.6rem]">
          {isCopied
            ? t("timeline.copy_button.copied")
            : t("timeline.copy_button.click_to_copy")}
        </p>
      </TimelineElementCodeCopyButton>
    </TimelineElementCodeContainer>
  );
}
