import { HTMLAttributes } from "react";
import { MarkdownDiv } from "./MarkdownDiv";
import { MarkdownTechnologies } from "./MarkdownTechnologies";
import {
  MarkdownCommonListContainer,
  MarkdownGridContainer,
  MarkdownGridItem,
} from "./styles";
import { Icon, IconType } from "../Icon";

export interface MarkdownSectionsProps extends HTMLAttributes<HTMLDivElement> {
  showReturnButton?: boolean;
}

export function MarkdownSections({
  showReturnButton = false,
  id,
  ...rest
}: MarkdownSectionsProps) {
  if (id?.includes("icon") && id?.match(/ /g)) {
    const [, icon] = id.split(/ /g);
    return (
      <Icon
        withoutTooltip
        name={(icon || "default") as IconType}
        className="min-h-[1.4rem] min-w-[1.4rem] text-primary-500 md:min-h-[1.4125rem] md:min-w-[1.4125rem]"
      />
    );
  }

  switch (id) {
    case "technologies":
      return <MarkdownTechnologies />;
    case "statistics":
    case "images":
    case "just-github":
      return null;
    case "list":
      return <MarkdownCommonListContainer $highlight={false} {...rest} />;
    case "list-title":
      return <MarkdownCommonListContainer $highlight={true} {...rest} />;
    case "grid":
      return <MarkdownGridContainer {...rest} />;
    case "grid-item":
      return <MarkdownGridItem {...rest} />;
    default:
      return <MarkdownDiv showReturnButton={showReturnButton} {...rest} />;
  }
}
