import { Progress, Stack, StackProps, Text, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import { fadeToTopOnScroll } from "../../theme/animations/motion";

interface TopLanguageItemProps extends StackProps {
  name: string;
  value: number;
  compareWith: number;
};

function TopLanguageItem({ 
  name, 
  value, 
  compareWith,
  ...rest 
}: TopLanguageItemProps) {
  const progress = (value/compareWith) * 100;
  const color = useColorModeValue("secondary", "primary");

  return (
    <Stack
      as={m.div}
      w={300}
      alignItems="flex-start"
      ml={6}
      mb={3}
      _first={{
        mt: 5
      }}
      {...rest}
      {...fadeToTopOnScroll}
    >
      <Text>{name}: {progress.toFixed(2)}%</Text>
      <Progress 
        display="flex" 
        w={300}
        colorScheme={color}
        value={progress}
        borderRadius={8}
      />
    </Stack>
  );
};

export { TopLanguageItem };