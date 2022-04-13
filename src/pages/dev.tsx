import { Box } from "@chakra-ui/react";
import { m } from "framer-motion";
import { GetStaticProps } from "next";

import { fadeLayout } from "../theme/animations/motion";
import { getStaticData } from "../utils/getStaticData";

import { Markdown } from "../components/Resume";
import { GoalsImage } from "../components/images/svgs/GoalsImage";
import { Background } from "../components/Background";
import useShowBackground from "../contexts/hooks/useShowBackground";
import ReadmeENUS from "../../README.md";
import ReadmePTBR from "../../README_ptbr.md";
import { LayoutHead } from "../components/LayoutHead";

interface DevProps {
  locale: string;
  markdown: string;
  languages: { [key: string]: number };
};

function Dev({ 
  markdown, 
  languages,
  locale
}: DevProps) {
  const { setShowBackground } = useShowBackground();
  
  return (
    <>
      <LayoutHead
        locale={locale}
        title="Resume"
        ptBRTitle="Resumo"
      />
      <Box
        as={m.div}
        position="relative"
        maxW="95%"
        maxH="100%"
        display="flex"
        flexDir="column"
        pb={10}
        {...fadeLayout}
      >
        <Markdown
          locale={locale}
          markdown={markdown}
          languages={languages}
          onChangeViewport={setShowBackground}
        />
      </Box>
      <Background
        w={[400, 600, 600, 800, 800, 800]}
        h={[400, 400, 500, 800, 900, 1000]}
        bottom={[-120, -120, -160, -260, -300, -350]}
        right={[-100, -220, -140, -200, -140, -75]}
        filter={["opacity(50%)", "opacity(70%)", "opacity(80%)", "opacity(90%)", "opacity(100%)"]}
        zIndex={-1}
      >
        <GoalsImage/>
      </Background>
    </>
  );
};

export const getStaticProps: GetStaticProps = async({ locale }) => {
  const data = await getStaticData({
    getRepos: true,
    getLanguages: true
  });

  const markdown = locale === "pt-BR"? ReadmePTBR:ReadmeENUS;

  return {
    props: {
      ...data, 
      markdown, 
      locale 
    },
    revalidate: 60 * 60 * 24 * 7
  };
};


export default Dev;