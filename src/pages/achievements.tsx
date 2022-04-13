import { Box, Heading } from "@chakra-ui/react";
import { m } from "framer-motion";
import { GetStaticProps } from "next";
import { Span } from "../components/Span";
import { fadeToTop } from "../theme/animations/motion";
import { getStaticData } from "../utils/getStaticData";
import { VerticalTimeline as Timeline }  from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Achievement } from "../components/Achievement";

interface AchievementsProps {
  certificates: Certificate[];
  achievements: Achievement[];
  locale: string;
};

function Achievements({ 
  locale,
  certificates,
  achievements 
}: AchievementsProps) {
  let items = [ ...certificates, ...achievements ];
  items.sort((a, b) => 
    new Date(b.issuedIn).getTime() - 
    new Date(a.issuedIn).getTime()
  );
  
  return (
    <>
      <Heading
        as={m.h1}
        fontSize={[20, 25, 30, 30, 40, 40]}
        {...fadeToTop}
      >
        {locale === "pt-BR"? <>Minhas <Span>conquistas</Span></>:<>My <Span>achievements</Span></>}
      </Heading>
      <Box
        as={Timeline} 
        lineColor="var(--chakra-colors-alt-200)"
        dateText="11/2010 – Present"
      >
        {items.map(i => {
          return (
            <Achievement
              key={i.issuedIn}
              item={i}
            />
          );
        })}
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async({ locale }) => {
  const data = await getStaticData({
    getCertificates: true,
    getAchievements: true
  }, locale);

  return {
    props: { ...data, locale },
    revalidate: 60 * 60 * 24 * 30
  };
};

export default Achievements;