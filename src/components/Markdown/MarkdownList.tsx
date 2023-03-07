import { HTMLAttributes } from "react";
import { MarkdownListContainer, MarkdownOrderedListContainer } from "./styles";

export function MarkdownList({
  children,
  ordered,
  ...rest
}: HTMLAttributes<HTMLUListElement> & { ordered: boolean }) {
  if (ordered) {
    return (
      <MarkdownOrderedListContainer {...rest}>{children}</MarkdownOrderedListContainer>
    );
  }

  return <MarkdownListContainer {...rest}>{children}</MarkdownListContainer>;
}
