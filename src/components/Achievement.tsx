import { Box, Heading, HStack, IconButton, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import { VerticalTimelineElement as TimelineItem }  from "react-vertical-timeline-component";
import { scaleOnInteract } from "../theme/animations/motion";
import { getFormattedDate } from "../utils/getFormattedDate";
import NamedIcon from "./NamedIcon";

interface AchievementProps extends BoxProps {
  item: Certificate | Achievement;
};

function Achievement({ item }: AchievementProps) {
  const {
    issuedIn,
    issuingOrganization,
    name,
    code,
    expiresIn,
    description,
    icon,
    url
  } = item;
  const primary = useColorModeValue(
    "var(--chakra-colors-secondary-600)", 
    "var(--chakra-colors-primary-600)"
  );

  const primary700 = useColorModeValue(
    "secondary.700", 
    "primary.700"
  );

  const primary800 = useColorModeValue(
    "secondary.800", 
    "primary.800"
  );

  const primary900 = useColorModeValue(
    "secondary.900", 
    "primary.900"
  );

  return (
    <Box
      as={TimelineItem}
      date={getFormattedDate(issuedIn)}
      contentArrowStyle={{ 
        borderRight: `7px solid ${primary}`
      }}
      contentStyle={{ 
        background: "var(--chakra-colors-alt-50)",
        borderBottom: `4px solid ${primary}`,
        color: "#fff"
      }}
      icon={<NamedIcon name={icon}/>}
      iconStyle={{ 
        background: "var(--chakra-colors-card)",
        width: "40px",
        height: "40px",
        color: primary,
        boxShadow: `0 0 0 4px var(--chakra-colors-alt-50), inset 0 2px 0 rgb(0 0 0 / 8%), 0 3px 0 4px rgb(0 0 0 / 5%)`,
        marginTop: "12px"
      }}
    >
      <Heading
        color={`${primary}!important`}
        fontSize={[20, 24]}
      >
        {name}
      </Heading>
      <Text
        mt="2px!important"
        color="alt.600"
      >
        {issuingOrganization}{expiresIn && ` -> Expires In ${expiresIn}`}
      </Text>
      { description && <Text
        mt="2px!important"
        color="alt.800"
      >
        {description}
      </Text> }
      { url && <HStack
        display="flex"
        alignItems="center"
        mt={3}
      >
         <IconButton
          as={m.button}
          aria-label="open-button"
          icon={<NamedIcon name="download"/>}
          bgColor={primary700}
          _hover={{
            bgColor: primary800
          }}
          size="sm"
          onClick={() => window.open(url, "_blank")}
          {...scaleOnInteract}
        />
        { code? <Tag 
          bg="alt.200"
          color="alt.500"
          position="relative"
          p={2}
          pr="60px"
          userSelect="text"
          onClick={() => navigator.clipboard.writeText(code)}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          maxW="100%"
          style={{
            lineClamp: 2
          }}
          _hover={{
            cursor: "pointer"
          }}
        >{code} <IconButton 
          aria-label="copy-button"
          icon={<NamedIcon name="copy"/>}
          bgColor="buttons.50"
          position="absolute"
          _hover={{
            bgColor: "buttons.100"
          }}
          _active={{
            bgColor: "buttons.200"
          }}
          right={0}
          color={primary}
          m={0}
          p={4}
          mr={0}
          h="min-content"
          w="min-content"
          minW="min-content"
        /></Tag>:<Text
          color="alt.400"
        >
          Download
        </Text> }
      </HStack> }
    </Box>
  );
};

export { Achievement };