import Link from "next/link";
import { HTMLAttributes } from "react";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";

export interface MarkdownLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  target: string;
}

export function MarkdownLink({ className, href, target, ...rest }: MarkdownLinkProps) {
  if (!className?.includes("navigation-link")) {
    target = "_blank";
    return <Link className={className} target={target} href={href} {...rest} />;
  }

  return (
    <Tooltip label={href} containerClassName={className}>
      <Button
        size="sm"
        onClick={() => {
          return window.open(href, "_blank");
        }}
        className={(className ?? "") + " shadow-sm md:shadow-lg"}
      >
        {rest?.children}
      </Button>
    </Tooltip>
  );
}
