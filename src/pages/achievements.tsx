import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { IconType } from "../components/Icon";
import { Timeline } from "../components/Timeline";
import { Graphql } from "../services/classes/Graphql";
import { Translation } from "../services/translation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n, useTranslation } from "next-i18next";

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
}

function Achievements({ achievements }: AchievementsProps) {
  const { t } = useTranslation("achievements");

  return (
    <>
      <NextSeo
        title={t("seo.title") ?? "L-Marcel"}
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
  const isNotPtBr = locale === "en-US";
  const achievements = await Graphql.getInformation(isNotPtBr ? "EN" : "BR")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((res: any) => {
      return res.achievements ?? [];
    })
    .catch(() => {
      return [];
    });

  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }

  return {
    props: {
      achievements,
      ...(await serverSideTranslations(isNotPtBr ? "en-US" : "pt-BR", [
        "common",
        "achievements",
      ])),
    },
    revalidate: false,
  };
};

export default Translation.use(Achievements);
