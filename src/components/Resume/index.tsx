import { Box, Code, Heading, Image, ImageProps, List, ListItem, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { memo } from "react";
import { fadeToTopOnScroll } from "../../theme/animations/motion";
import { getStatsImageSrc, getTopLangsImageSrc } from "../../utils/getStatsImageSrc";
import { NamedIcon } from "../NamedIcon";
import { Span } from "../Span";
import { TopLanguagesList } from "../TopLanguagesList";

import { SocialButtons } from "../SocialButtons";

import dynamic from "next/dynamic";
import { getYearsOld } from "../../utils/getYearsOld";
import { TechnologiesList } from "./TechnologiesList";

const MarkdownGrid = dynamic<{ items: any[] }>(() => import("./MarkdownGrid").then(mod => mod.MarkdownGrid), {
  ssr: false
});

interface MarkdownProps {
  languages?: { [key: string]: number };
  onChangeViewport?: (v: boolean) => void;
  locale?: string;
  markdown: string;
};

function _Markdown({ 
  markdown, 
  languages,
  locale,
  onChangeViewport 
}: MarkdownProps) {
  const isDarkMode = useColorModeValue(false, true);
  const showRank = useBreakpointValue({
    base: false,
    lg: true,
    xl: true
  });

  return (
    <>
      <ReactMarkdown
        children={markdown}
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
              case "grid":
                let items = props.children as any[];

                try {
                  items = items.filter(p => typeof p !== "string");
                } catch (error) {
                  items = [];
                };

                if(items.length <= 2) {
                  return null;
                };

                return (
                  <MarkdownGrid
                    items={[
                      <Box mb={2}>
                        <Heading 
                          as={m.h2}
                          fontSize={[19, 25]}
                          mb={4}
                          textAlign="left"
                          {...fadeToTopOnScroll}
                        >
                          { locale === "pt-BR"? <>Proficiência com as <Span>tecnologias</Span>:</>
                          :<><Span>Technologies</Span> proficiency:</>}
                        </Heading>
                        <TechnologiesList/>
                      </Box>,
                      ...items
                    ]}
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
                _first={{
                  mt: 0
                }}
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
          ul({ id, ...props }) {
            return (
              <List
                as={m.ul}
                _notFirst={{
                  mt: "10px!important"
                }}
                {...props}
                {...fadeToTopOnScroll}
              />
            );
          },
          li({ id, children, ...props }) {
            return (
              <ListItem
                ml={id === "space" && 10}
                mt={id === "space"? 2:"6px"}
                maxW={["80%", "100%", "100%", "100%", "100%", "100%"]}
                {...props}
              >
                { id !== "space" && <NamedIcon 
                  name="check" 
                  color="primary.500"
                  mr={3}
                /> }
                {children}
              </ListItem>
            );
          },
          span({ id, ...props }) {
            if(id === "years") {
              return (
                <Span
                  id={id}
                  color="alt.600"
                  fontStyle="italic"
                  {...props} 
                  {...fadeToTopOnScroll}
                >
                  {locale === "pt-BR"? `(Eu tenho ${getYearsOld()} anos)`:`(I've ${getYearsOld()} years old)`}.
                </Span>
              );
            };

            return (
              <Span
                id={id}
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
                    fontSize={[19, 25]}
                    textAlign="left"
                    {...fadeToTopOnScroll}
                  >
                    { locale === "pt-BR"? <><Span>Linguagens</Span> mais usadas</>
                    :<>Top used <Span>languages</Span></>}
                  </Heading>
                  <TopLanguagesList
                    languages={languages}
                  />
                  <SocialButtons
                    locale={locale}
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

