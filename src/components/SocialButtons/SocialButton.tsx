import { Button, ButtonProps } from "@chakra-ui/react";
import { m } from "framer-motion";
import { scaleOnInteract } from "../../theme/animations/motion";

function SocialButton({ ...props }: ButtonProps) {
  return (
    <Button 
      as={m.button}
      mt={2}
      bgColor="buttons.100"
      _hover={{
        bgColor: "butons.200"
      }}
      {...scaleOnInteract}
      {...props}
   />
  );
};

export { SocialButton };