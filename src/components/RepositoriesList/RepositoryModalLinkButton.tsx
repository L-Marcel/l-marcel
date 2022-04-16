
import { Button, ButtonProps } from "@chakra-ui/react";
import { m } from "framer-motion";
import { scaleOnInteract } from "../../theme/animations/motion";
import { NamedIcon } from "../NamedIcon";

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
  return (
    <Button
      as={m.button}
      aria-label="share"
      bgColor="buttons.200"
      _hover={{
        bgColor: "buttons.100"
      }}
      _active={{
        bgColor: "buttons.50"
      }}
      {...rest}
      onClick={() => window.open(link, "_blank", "")}
      {...scaleOnInteract}
    >
      <NamedIcon name={icon} mr={2}/>{title}
    </Button>
  );
};

export default RepositoryModalLinkButton;