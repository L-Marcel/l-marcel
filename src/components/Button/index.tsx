import React, { ComponentProps } from "react";
import { ButtonContainer } from "./styles";

export interface ButtonProps extends ComponentProps<typeof ButtonContainer> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = "md", selected = false, ...rest }, ref) => {
    return <ButtonContainer ref={ref} selected={selected} size={size} {...rest} />;
  }
);

Button.displayName = "Button";

export { Button };
