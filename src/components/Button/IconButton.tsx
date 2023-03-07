import { ComponentProps } from "react";
import { Icon, IconType } from "../Icon";
import { Tooltip } from "../Tooltip";
import { IconButtonContainer } from "./styles";

export interface IconButtonProps extends ComponentProps<typeof IconButtonContainer> {
  icon: IconType;
  iconClassName?: string;
  tooltipClassName?: string;
  disabled?: boolean;
}

export function IconButton({
  icon,
  title,
  iconClassName,
  tooltipClassName,
  disabled = false,
  ...rest
}: IconButtonProps) {
  if (!title) {
    return (
      <IconButtonContainer disabled={disabled} {...rest}>
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
      <IconButtonContainer {...rest}>
        <Icon className="duration-75" name={icon} withoutTooltip />
      </IconButtonContainer>
    </Tooltip>
  );
}
