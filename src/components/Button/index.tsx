import React, { HTMLAttributes } from "react";
import { ButtonContainer, ButtonSize } from "./styles";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  selected?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = "md", selected = false, ...rest }, ref) => {
    return <ButtonContainer ref={ref} selected={selected} size={size} {...rest} />;
  }
);

Button.displayName = "Button";

export { Button };
