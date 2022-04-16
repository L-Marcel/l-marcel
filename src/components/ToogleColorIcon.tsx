import { useColorModeValue } from "@chakra-ui/react";
import { NamedIcon } from "./NamedIcon";

function ToogleColorIcon() {
  const icon = useColorModeValue("moon", "sun");

  return (
    <NamedIcon name={icon}/>
  );
};

export { ToogleColorIcon };