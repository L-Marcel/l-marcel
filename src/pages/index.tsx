import { GetStaticProps } from "next";
import Head from "next/head";
import { NextSeo } from "next-seo";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { MarkdownCode } from "../components/Markdown/MarkdownCode";
import { MarkdownLink } from "../components/Markdown/MarkdownLink";
import { MarkdownList } from "../components/Markdown/MarkdownList";
import { MarkdownListItem } from "../components/Markdown/MarkdownListItem";
import { MarkdownSections } from "../components/Markdown/MarkdownSections";
import { MarkdownBrContainer, MarkdownH1Container, MarkdownH2Container, MarkdownNavContainer, MarkdownPContainer } from "../components/Markdown/styles";
import { Profile } from "../components/Profile";
import { Github } from "../services/Github";
import { DemoVideoContainer, FirstSection } from "../styles/document/styles";
import Image from "next/image";
import { technologies } from "../constants/technologies";

export type MarkdownComponents = Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents>;
export interface ResumeProps {
  data: string;
  updatedAt: string;
  withProfile: boolean;
  name?: string;
  technologies?: string[];
  demoVideoURL: string | null;
}

function Resume({
  data,
  technologies,
  withProfile,
  updatedAt,
  demoVideoURL = null
}: ResumeProps) {
  return (
    <>
      <NextSeo
        defaultTitle="L-Marcel"
        titleTemplate="L-Marcel"
      />
      <FirstSection $profile={withProfile}>
        { withProfile && <Profile
          updatedAt={updatedAt}
        /> }
      </FirstSection>
      <section className="flex h-full min-h-[calc(100vh_-_14rem)] flex-1 flex-col gap-8 md:min-h-[calc(100vh_-_16rem)] xs:min-h-[calc(100vh_-_9rem)]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: MarkdownH1Container,
            h2: MarkdownH2Container,
            p: MarkdownPContainer,
            a: MarkdownLink,
            pre: MarkdownCode,
            div: ({ ...rest }) => <MarkdownSections 
              showReturnButton={!withProfile}
              currentRepositoryTechnologies={technologies}
              {...rest}
            />,
            ul: MarkdownList,
            ol: MarkdownList,
            li: MarkdownListItem,
            br: MarkdownBrContainer,
            nav: MarkdownNavContainer,
          } as MarkdownComponents}
        >
          {data}
        </ReactMarkdown>
        { demoVideoURL !== null && <DemoVideoContainer>
          <div className="absolute left-[3.75rem] h-full w-1 bg-primary-500"/>
          <video className="2xç:max-h-[531px] z-10 border-r-4 border-primary-500 bg-white-500 dark:bg-gray-600 md:max-h-[354px] md:max-w-[630px] 2xl:max-w-[945px]" src={demoVideoURL} controls/>
          <Image
            src="/assets/coding.svg"
            alt="A man coding..."
            width={812}
            height={612}
            className="absolute -bottom-8 left-[45%] !h-[140%] opacity-60 md:left-[40%] lg:left-[25%] 2xl:left-[22%]"
          />
        </DemoVideoContainer> }
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async({ locale }) => {
  let data = await Github.getReadme(locale ?? "pt-br");
  const updatedAt = new Date().toString();

  data = data.replace("<div id=\"repository-buttons\"/>", `<a class="navigation-link" href="https://github.com/l-marcel/l-marcel" target="__blank__">
  ${locale !== "pt-br"? "repository":"repositório"}
</a>
<span id="only-if-not-last">•</span>`);

  const demoVideoURL = await Github.getDemoVideoURL();

  return {
    props: {
      data,
      updatedAt,
      withProfile: true,
      demoVideoURL
    },
    revalidate: false
  };
};

export default Resume;