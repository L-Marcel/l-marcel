import { Badge, Box, Heading, HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fadeToTopOnScroll, weakScaleOnInteract } from "../../theme/animations/motion";
import { NamedIcon } from "../NamedIcon";

interface RepositoriesListItemProps {
  repo: Repository;
  onSelect: () => void;
};

function RepositoriesListItem({ 
  repo: r, 
  onSelect 
}: RepositoriesListItemProps) {
  return (
    <Box 
      position="relative"
      as={motion.div}
      w="100%"
      minH={100}
      minW={270}
      bgColor="card"
      p={5}
      textTransform="capitalize"
      justifyContent="space-between"
      alignSelf="flex-start"
      borderRadius={10}
      borderBottom="2px"
      borderColor="primary.700"
      layoutId={`repos-${r.id}`}
      onClick={onSelect}
      _hover={{
        cursor: "pointer"
      }}
      {...fadeToTopOnScroll}
      {...weakScaleOnInteract}
    >
      { r.badge && <Badge
        position="absolute"
        fontSize={[10, 12]} 
        lineHeight={[2, 6]}
        px={3}
        py="2px"
        mt="-33px"
        bgColor="badge"
        borderRadius={5}
        color="alt.800"
        w="min-content"
      >
        {r.badge}
      </Badge> }
      <Box>
        { r.importedConfig?.pinned && <NamedIcon
          name="flash"
          position="absolute"
          color="secondary.700"
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
        <Text
          textTransform="lowercase"
          fontWeight="light"
          fontSize={13}
          mt={-1}
        >
          {r.name}
        </Text>
        <Text 
          mt={2}
          textTransform="none"
          fontSize={14}
          maxW="100%"
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
        color="primary.700"
      >
        <NamedIcon name={r.importedConfig.technologies[0]} w={6} h={6}/>
        <Text fontSize={[12, 15]}>{'->'} {r.importedConfig.technologies[0] ?? "Desconhecido"}</Text>
      </HStack>
    </Box>
  );
};

export { RepositoriesListItem };
