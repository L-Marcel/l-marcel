import { HTMLAttributes } from "react";
import { Icon, IconType } from "../Icon";
import { Tooltip } from "../Tooltip";
import { IconButtonContainer, IconButtonSize } from "./styles";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  size?: IconButtonSize;
  iconClassName?: string;
  tooltipClassName?: string;
  disabled?: boolean;
}

export function IconButton({
  icon,
  title,
  size = "md",
  iconClassName,
  tooltipClassName,
  disabled = false,
  ...rest
}: IconButtonProps) {
  if (!title) {
    return (
      <IconButtonContainer size={size} disabled={disabled} {...rest}>
        <Icon
          className={(iconClassName ?? "") + " duration-75"}
          name={icon}
          title={title}
          withoutTooltip
        />
      </IconButtonContainer>
    );
  }

  return (
    <Tooltip label={title} className={"mt-2 " + tooltipClassName}>
      <IconButtonContainer size={size} {...rest}>
        <Icon className="duration-75" name={icon} withoutTooltip />
      </IconButtonContainer>
    </Tooltip>
  );
}
