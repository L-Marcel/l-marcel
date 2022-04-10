import { Badge, Box, Heading, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeToTopOnScroll } from "../../theme/animations/motion";
import NamedIcon from "../NamedIcon";

interface RepositoriesListItemProps {
  repo: Repository;
  onSelect: () => void;
};

function RepositoriesListItem({ 
  repo: r, 
  onSelect 
}: RepositoriesListItemProps) {
  const primary = useColorModeValue("secondary.700", "primary.700");
  const secondary = useColorModeValue("primary.700", "secondary.700");

  return (
    <Box 
      position="relative"
      as={motion.div}
      w="100%"
      minH={100}
      bgColor="card"
      p={5}
      textTransform="capitalize"
      justifyContent="space-between"
      alignSelf="flex-start"
      borderRadius={10}
      borderBottom="2px"
      borderColor={primary}
      layoutId={`repos-${r.id}`}
      onClick={onSelect}
      {...fadeToTopOnScroll}
    >
      <Box>
        { r.importedConfig?.pinned && <NamedIcon
          name="flash"
          position="absolute"
          color={secondary}
          w={5}
          h={5}
          top={5}
          right={5}
        />}
        <Heading
          as={motion.h1}
          fontSize={[14, 16]}
          lineHeight={[5, 6]}
          layoutId={`repos-title-${r.id}`}
        >
          {r.formattedName}
        </Heading>
        { r.badge && <Badge
          as={motion.div}
          fontSize={10}
          lineHeight={2}
          bgColor="pri.400"
          color="pri.900"
          layoutId={`repos-badge-${r.id}`}
          w="min-content"
          my={2}
        >
          {r.badge}
        </Badge> }
        <Text 
          textTransform="none"
          fontSize={14}
          maxW="90%"
          as={motion.p}
          layoutId={`repos-description-${r.id}`}
        >
          {r.description?.slice(0, 156)}{r.description?.length > 156 && "..."}
        </Text>
      </Box>
      <HStack
        alignSelf="flex-end"
        justifySelf="flex-end"
        mt={2} 
        color={primary}
      >
        <NamedIcon name={r.importedConfig.technologies[0]} w={6} h={6}/>
        <Text fontSize={[12, 15]}>{'->'} {r.importedConfig.technologies[0] ?? "Desconhecido"}</Text>
      </HStack>
    </Box>
  );
};

export { RepositoriesListItem };