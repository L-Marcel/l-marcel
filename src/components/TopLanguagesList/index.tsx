import { Box, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import { GoalsImage } from "../images/svgs/GoalsImage";
import { TopLanguageItem } from "./TopLanguageItem";

interface TopLanguagesListProps extends BoxProps {
  languages?: { [key: string]: number };
};

function TopLanguagesList({
  languages,
  ...rest
}: TopLanguagesListProps) {
  let langs = Object.entries(languages);
  const total = langs.reduce((pre, cur) => {
    const [_, value] = cur;
    pre += value;

    return pre;
  }, 0);

  langs = langs.sort((a, b) => b[1] - a[1]).reduce((pre, cur, i) => {
    if(i <= 8) {
      pre.push(cur);
    };

    return pre;
  }, []);

  return (
    <Box {...rest}>
      {langs.map(l => {
        const [key, value] = l;

        return (
          <TopLanguageItem
            key={key}
            name={key}
            value={value}
            compareWith={total}
          />
        );
      })}
    </Box>
  );
};

export { TopLanguagesList };