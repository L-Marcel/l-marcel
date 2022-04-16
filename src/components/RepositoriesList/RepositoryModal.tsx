import { Badge, Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { ModalContentProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import RepositoryModalButtonsGroup from "./RepositoryModalButtonsGroup";
import RepositoryModalLinkButton from "./RepositoryModalLinkButton";
import { NamedIcon } from "../NamedIcon";
import useShowOverlay from "../../contexts/hooks/useShowOverlay";
import { fadeLayout } from "../../theme/animations/motion";

interface RepositoryModalProps extends ModalContentProps {
  children?: ReactNode,
  repo: Repository;
};

function RepositoryModal({ repo: r, children, ...rest }: RepositoryModalProps) {
  const { overlayId } = useShowOverlay();
  const isWideOrNormalVersion = useBreakpointValue({
    lg: true,
    base: false
  });

  if(overlayId !== "repo") {
    return null;
  };

  return (
    <Box
      as={motion.div}
      {...rest} 
      borderRadius={10}
      borderBottom="2px"
      position="fixed"
      borderColor="primary.700"
      bgColor="modalCard"
      bottom={[0, 0, 0, "auto", "auto" , "auto"]}
      borderBottomRadius={[0, 0, 0, 10, 10, 10]}
      right={[0, 0, 0, "auto", "auto", "auto", "auto"]}
      minW={["100%", "100%", "100%", 200, 200, 200, 200]}
      maxW={600}
      layoutId={`repos-${r.id}`}
      zIndex={992}
      {...fadeLayout}
    >
      { r.badge && <Badge
        position="absolute"
        fontSize={[12]} 
        lineHeight={[6]}
        px={3}
        py="2px"
        mt="-14px"
        bgColor="badge"
        borderRadius={5}
        color="alt.800"
        w="min-content"
        ml={8}
      >
        {r.badge}
      </Badge> }
      <Box
        p={8} 
        my="auto" 
        as={motion.div}
        position="relative"
      >
        <Box>
          <Heading
            as={motion.h1}
            maxWidth="100%"
            fontSize={[18, 25]}
            color="primary.700"
            textTransform="capitalize"
            layoutId={`repos-title-${r.id}`}
          >
            {r.formattedName}
          </Heading>
          { r.importedConfig?.technologies && <Box
            as={motion.div}
            flexWrap="wrap"
            display="flex"
            maxW="100%"
          >
            {
              r.importedConfig?.technologies?.map(technology => {
                return (
                  <NamedIcon key={technology} color="primary.700" mr={2} mt={2} name={technology} w={6} h={6}/>
                );
              })
            }
          </Box> }
          { r.description && <Text
            mt={4}
            as={motion.p}
            layoutId={`repos-description-${r.id}`}
          >
            {r.description}
          </Text> }
          <RepositoryModalButtonsGroup isWideOrNormalVersion={isWideOrNormalVersion}>
            { r.github && <RepositoryModalLinkButton
              link={r.github} 
              title="Repositório" icon="github"
            /> }
            { r.importedConfig.links?.figma && <RepositoryModalLinkButton
              link={r.importedConfig.links?.figma} 
              title="Figma" icon="figma"
            /> }
            { r.importedConfig.links?.self && <RepositoryModalLinkButton
              link={r.importedConfig.links?.self} 
              title="Visitar" icon="self"
            /> }
            { r.importedConfig.links?.documentation && <RepositoryModalLinkButton
              link={r.importedConfig.links?.documentation} 
              title="Documentação" 
              icon="documentation"
            /> }
          </RepositoryModalButtonsGroup>
          { r.license && <Text
            as={motion.p}
            mt={5}
            display="flex"
            alignItems="center"
            color="primary.700"
          >
            <NamedIcon name="license" mr={2} fontSize={22}/>
            {r.license}
          </Text> }
        </Box>
      </Box>
    </Box>
  );
};

export default RepositoryModal;

