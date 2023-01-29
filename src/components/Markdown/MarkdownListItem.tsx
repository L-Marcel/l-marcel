import { HTMLAttributes } from "react";
import { Icon, IconType } from "../Icon";
import { MarkdownListItemContainer } from "./styles";

export function MarkdownListItem({
  children,
  id,
  ...rest
}: HTMLAttributes<HTMLLIElement> & { ordered: boolean | undefined }) {
  rest.ordered = undefined;

  if (id && id.length > 0) {
    return (
      <MarkdownListItemContainer {...rest} className="flex flex-row items-start">
        <Icon
          withoutTooltip
          name={id as IconType}
          className="mt-[2px] mr-2 min-h-[1.4rem] min-w-[1.4rem] text-primary-500 md:min-h-[1.4125rem] md:min-w-[1.4125rem]"
        />
        {children}
      </MarkdownListItemContainer>
    );
  }

  return <MarkdownListItemContainer {...rest}>{children}</MarkdownListItemContainer>;
}
