import { Box, Code, Heading, Text, Image, ImageProps, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import Readme from "../../README.md";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { m } from "framer-motion";

import { fadeToTopOnScroll } from "../theme/animations/motion";
import { Span } from "./Span";
import { getStatsImageSrc, getTopLangsImageSrc } from "../utils/getStatsImageSrc";
import { TopLanguagesList } from "./TopLanguagesList";
import { memo } from "react";

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
              case "buttons":
                return (<></>);
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
                textAlign="center" 
                as={m.h1}
                mb={4}
                {...props} 
                {...fadeToTopOnScroll}
              />
            );
          },
          h2({ id, ...props }) {
            return (
              <Heading 
                as={m.h2}
                mb={id === "sub"? 0:4}
                fontSize={20}
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
                fontSize={25}
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
                {...props} 
                {...fadeToTopOnScroll}
              />
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
              //maxH = 200;
            } else if(id === "langs") {
              src = getTopLangsImageSrc({ darkMode: isDarkMode, hideTitle: true });
              //maxH = 160;

              if(!languages) {
                return null;
              };

              return (
                <>
                  <Heading 
                    as={m.h2}
                    mb={0}
                    fontSize={20}
                    textAlign="left"
                    {...fadeToTopOnScroll}
                  >
                    Top used <Span
                      {...fadeToTopOnScroll}
                    >languages</Span>:
                  </Heading>
                  <TopLanguagesList
                    languages={languages}
                  />
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