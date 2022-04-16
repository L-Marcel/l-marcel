import { Box, Text, Wrap } from "@chakra-ui/react";
import { TagFilterOption } from "./TagFilterOption";

interface TagOptions {
  locale?: string;
};

function TagOptions({
  locale
}) {
  return (
    <Box
      w="98%"
    >
      <Box 
        mt="-5px"
        display="flex"
      >
        <Text>
          {locale === "pt-BR"? "Marcação":"Tag"}:
        </Text>
      </Box>
      <Wrap
        mt={2}
        display="flex"
      >
        {["any", "stagnated", "canceled", "not deployed", "paused"].map(t => {
            return (
              <TagFilterOption
                key={`tag-${t}`}
                locale={locale}
                value={t as RepositoriesFilterOptionsTag}
              />
            );
          })
        }
      </Wrap>
    </Box>
  );
};

export { TagOptions };