import { Box, Code, Heading, Text, Image, ImageProps, useColorModeValue, useBreakpointValue, List, ListItem } from "@chakra-ui/react";
import Readme from "../../../README.md";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { m } from "framer-motion";

import { fadeToTopOnScroll } from "../../theme/animations/motion";
import { Span } from "../Span";
import { getStatsImageSrc, getTopLangsImageSrc } from "../../utils/getStatsImageSrc";
import { TopLanguagesList } from "../TopLanguagesList";
import { memo } from "react";
import NamedIcon from "../NamedIcon";

import { SocialButtons } from "../SocialButtons";
import { MarkdownGrid } from "./MarkdownGrid";
import { TechnologiesList } from "./TechnologiesList";

interface MarkdownProps {
  languages?: { [key: string]: number };
  onChangeViewport?: (v: boolean) => void;
};

function _Markdown({ languages, onChangeViewport }: MarkdownProps) {
  const isDarkMode = useColorModeValue(false, true);
  const showRank = useBreakpointValue({
    base: false,
    lg: true,
    xl: true
  });

  return (
    <>
      <ReactMarkdown
        children={Readme}
        components={{
          br() {
            return null;
          },
          div({ id, ...props }: BoxProps) {
            switch(id) {
              case "remove":
                return null;
              case "grid": 
                return (
                  <MarkdownGrid
                    {...props}
                  />
                );
              case "images":
                return (
                  <Box 
                    as={m.div}
                    display="flex"
                    flexDir="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    {...props}
                    {...fadeToTopOnScroll}
                  />
                );
              default:
                return (
                  <Box 
                    as={m.div}
                    {...props} 
                    {...fadeToTopOnScroll}
                  />
                );
            };
          },
          h1({ ...props }) {
            return (
              <Heading 
                textAlign="left"
                as={m.h1}
                mb={4}
                ml={-2}
                fontSize={[20, 25, 30, 30, 40, 40]}
                {...props} 
                {...fadeToTopOnScroll}
              />
            );
          },
          h2({ id, ...props }) {
            return (
              <Heading 
                as={m.h2}
                mt={id === "sub"? 1:0}
                mb={id === "sub"? 0:4}
                fontSize={[19, 25]}
                textAlign="left"
                {...props} 
                {...fadeToTopOnScroll}
              />
            );
          },
          h3({ ...props }) {
            return (
              <Heading
                as={m.h3}
                mb={4}
                fontSize={[19, 25]}
                {...props} 
                {...fadeToTopOnScroll}
              />
            );
          },
          p({ ...props }) {
            return (
              <Text 
                as={m.p}
                mb={4}
                {...props} 
                {...fadeToTopOnScroll}
              />
            );
          },
          pre({ ...props }) {
            return (
              <Code
                as={m.pre} 
                p={3}
                mb={4}
                borderRadius={8}
                overflowX="auto"
                {...props} 
                {...fadeToTopOnScroll}
              />
            );
          },
          ul({ ...props }) {
            return (
              <List
                as={m.ul}
                mt={4} 
                {...props}
                {...fadeToTopOnScroll}
              />
            );
          },
          li({ id, children, ...props }) {
            return (
              <ListItem
                as={m.li}
                mb={4}
                ml={id === "space" && 20}
                {...props}
                {...fadeToTopOnScroll}
              >
                { id !== "space" && <NamedIcon 
                  name="check" 
                  color={isDarkMode? "primary.500":"secondary.500"}
                  mr={3}
                /> }
                {children}
              </ListItem>
            );
          },
          span({ ...props }) {
            return (
              <Span
                {...props} 
                {...fadeToTopOnScroll}
              />
            );
          },
          img({ id, src, ...props }: ImageProps) {
            const defaultAssetsPath = "https://github.com/L-Marcel/L-Marcel/blob/main/apps/main/public/assets/";
            let maxH;

            if(src.includes("banner.gif")) {
              return null;
            } else if(src.includes(defaultAssetsPath)) {
              src = src.replace(defaultAssetsPath, "/assets/");
            };

            if(id === "stats") {
              src = getStatsImageSrc({ darkMode: isDarkMode, showRank, hideTitle: true });
            } else if(id === "techs") {
              return (
                <Box mb={5}>
                  <Heading 
                    as={m.h2}
                    fontSize={[19, 25]}
                    mb={4}
                    textAlign="left"
                    {...fadeToTopOnScroll}
                  >
                    <Span>Technologies</Span> proficiency:
                  </Heading>
                  <TechnologiesList/>
              </Box>
              );
            } else if(id === "langs") {
              src = getTopLangsImageSrc({ darkMode: isDarkMode, hideTitle: true });

              if(!languages) {
                return null;
              };

              return (
                <>
                  <Heading 
                    as={m.h2}
                    mb={0}
                    fontSize={25}
                    textAlign="left"
                    {...fadeToTopOnScroll}
                  >
                    Top used <Span>languages</Span>:
                  </Heading>
                  <TopLanguagesList
                    languages={languages}
                  />
                  <SocialButtons/>
                  <Box
                    mt={-15}
                    as={m.div}
                    onViewportEnter={() => onChangeViewport && onChangeViewport(true)}
                    onViewportLeave={() => onChangeViewport && onChangeViewport(false)}
                  />
                </>
              );
            };

            return (
              <Image
                as={m.img}
                src={src}
                maxH={maxH}
                {...props}
                {...fadeToTopOnScroll}
              />
            );
          }
        }}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </>
  );
};

const Markdown = memo(_Markdown);

export { Markdown };