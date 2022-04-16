import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import useShowOverlay from "../contexts/hooks/useShowOverlay";
import { scaleOnInteract } from "../theme/animations/motion";
import { ToogleColorIcon } from "./ToogleColorIcon";
import { m } from "framer-motion";
import { NamedIcon } from "./NamedIcon";
interface FixedIconButtonProps extends IconButtonProps {
  icon?: ReactElement;
};

function FixedIconButton({ mt, mb, icon,  ...rest }: FixedIconButtonProps) {
  const { showOverlay } = useShowOverlay();
  const marginBottom = mb? [ ...mb as any[] ]:mb;

  if(!icon && rest["aria-label"] === "toggleColor") {
    icon = (
      <ToogleColorIcon/>
    );
  } else if(!icon) {
    icon = (
      <NamedIcon name="abc"/>
    );
  };

  if(showOverlay && mb) {
    marginBottom[0] = 6;
    marginBottom[1] = 6;
    marginBottom[2] = 6;
  };

  return (
    <IconButton
      as={m.button}
      position="fixed"
      top={[null, null, null, 0, 0, 0]}
      right={[0, 2, 0]}
      mr={showOverlay? [6, 8]:6}
      mt={mt ?? [68, 50, 6, 6, 6, 6]}
      mb={marginBottom ?? [6, 6, 6, 0, 0, 0]}
      bottom={[0, 0, 0, null, null, null]}
      bgColor="buttons.100"
      borderRadius={20}
      _hover={{
        bgColor: "buttons.200"
      }}
      _active={{
        bgColor: "buttons.100"
      }}
      borderBottom="2px"
      zIndex={10}
      borderBottomColor="primary.700"
      icon={icon}
      {...rest}
      {...scaleOnInteract}
    />
);
};

export { FixedIconButton };