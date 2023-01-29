import { HTMLAttributes } from "react";
import { MarkdownDiv } from "./MarkdownDiv";
import { MarkdownTechnologies } from "./MarkdownTechnologies";
import {
  MarkdownCommonListContainer,
  MarkdownGridContainer,
  MarkdownGridItem,
} from "./styles";

export interface MarkdownSectionsProps extends HTMLAttributes<HTMLDivElement> {
  showReturnButton?: boolean;
}

export function MarkdownSections({
  showReturnButton = false,
  id,
  ...rest
}: MarkdownSectionsProps) {
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
