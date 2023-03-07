import { ReactNode } from "react";
import { TooltipContainer, TooltipText, TooltipTextContainer } from "./styles";

interface TooltipProps {
  label: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Tooltip({
  label,
  children,
  className,
  containerClassName,
}: TooltipProps) {
  return (
    <TooltipContainer className={containerClassName}>
      <TooltipTextContainer className={className}>
        <TooltipText>{label}</TooltipText>
      </TooltipTextContainer>
      {children}
    </TooltipContainer>
  );
}
