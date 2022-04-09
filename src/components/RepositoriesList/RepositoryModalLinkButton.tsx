
import { Button, ButtonProps } from "@chakra-ui/react";
import NamedIcon from "../NamedIcon";

interface RepositoryModalLinkButtonProps extends ButtonProps {
  link: string;
  title: string;
  icon: string;
};

function RepositoryModalLinkButton({
  link,
  title,
  icon,
  ...rest
}: RepositoryModalLinkButtonProps) {
  console.log(link);
  return (
    <Button
      aria-label="share"
      {...rest}
      onClick={() => window.open(link, "_blank", "")}
    >
      <NamedIcon name={icon} mr={2}/>{title}
    </Button>
  );
};

export default RepositoryModalLinkButton;