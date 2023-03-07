import { HTMLAttributes } from "react";
import { MarkdownPreMainContainer, MarkdownPreContainer } from "./styles";

export function MarkdownCode(props: HTMLAttributes<HTMLPreElement>) {
  return (
    <MarkdownPreMainContainer>
      <MarkdownPreContainer {...props} />
    </MarkdownPreMainContainer>
  );
}
