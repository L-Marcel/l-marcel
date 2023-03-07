import { HTMLAttributes } from "react";
import { MarkdowmPreMainContainer, MarkwodnPreContainer } from "./styles";

export function MarkdownCode(props: HTMLAttributes<HTMLPreElement>) {
  return (
    <MarkdowmPreMainContainer>
      <MarkwodnPreContainer {...props} />
    </MarkdowmPreMainContainer>
  );
}
