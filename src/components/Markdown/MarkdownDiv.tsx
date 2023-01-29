import { HTMLAttributes } from "react";
import { ReturnButton } from "../Button/ReturnButton";
import { MarkdownDivContainer } from "./styles";

export interface MarkdownDivProps extends HTMLAttributes<HTMLDivElement> {
  isHighlight?: boolean;
  showReturnButton?: boolean;
}

export function MarkdownDiv({
  isHighlight = false,
  showReturnButton = false,
  children,
  ...rest
}: MarkdownDivProps) {
  return (
    <MarkdownDivContainer $highlight={isHighlight} {...rest}>
      {showReturnButton && (
        <div id="first-div-return-button">
          <ReturnButton path="/projects" />
        </div>
      )}
      {children}
    </MarkdownDivContainer>
  );
}
