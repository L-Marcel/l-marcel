import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import { colorize, colorSequenceLayout, fadeToTopOnScroll } from "../../theme/animations/motion";
import NamedIcon from "../NamedIcon";

interface TechnologyLevelProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  iconName?: string;
};

function TechnologyLevel({ level, title, iconName }: TechnologyLevelProps) {
  const color = useColorModeValue("secondary.600", "primary.600");
  const hoverColor = useColorModeValue("primary.600", "secondary.600");
  const levels = [1, 2, 3, 4, 5, 6];

  return (
    <Box
      as={m.div}
      display="grid"
      alignItems="center"
      gridTemplateColumns="3fr 5fr"
      __css={{
        "& #tech-color": {
          color
        }
      }}
      _hover={{
        color: hoverColor,
        "& #tech-color": {
          color: hoverColor
        }
      }}
      {...fadeToTopOnScroll}
    >
      <Box display="flex" alignItems="center">
        <NamedIcon
          id="tech-color"
          name={iconName ?? title} 
          mr={2}
        />
        <Text pb="2px" whiteSpace="nowrap">
          {title}
        </Text>
      </Box>
      <HStack pr={8}>
        <Text mx={4}>-{`>`}</Text>
        <HStack
          as={m.div}
          pr={8}
          {...colorSequenceLayout}
        >
          {levels.map(l => {
            return (
              <Box 
                id={l <= level && "tech-color"}
                as={m.div}
                h={5}
                w={3}
                color="alt.300"
                {...colorize}
              />
            );
          })}
        </HStack>
      </HStack>
    </Box>
  );
};

export { TechnologyLevel };