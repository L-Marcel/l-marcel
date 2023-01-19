import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { IconType } from "../components/Icon";
import { Timeline } from "../components/Timeline";
import { Graphql } from "../services/classes/Graphql";

export type Achievement = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  registered_in: Date | string;
  expires_in?: Date | string;
  url?: string;
  code?: string;
  icon: IconType;
  button_icon?: IconType;
  button_text?: string;
};

export interface AchievementsProps {
  achievements: Achievement[];
  locale?: string;
}

function Achivements({ achievements, locale }: AchievementsProps) {
  return (
    <>
      <NextSeo
        title={locale === "en-us" ? "Achivements" : "Conquistas"}
        defaultTitle="L-Marcel"
        titleTemplate="L-Marcel - %s"
      />
      <section className="-mb-8 max-w-[100vw] overflow-x-hidden">
        <Timeline achievements={achievements} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const isNotPtBr = locale === "en-us";
  const achievements = await Graphql.getInformation(isNotPtBr ? "EN" : "BR")
    .then((res) => {
      return res.achievements ?? [];
    })
    .catch(() => {
      return [];
    });

  return {
    props: {
      achievements,
      locale,
    },
    revalidate: false,
  };
};

export default Achivements;
