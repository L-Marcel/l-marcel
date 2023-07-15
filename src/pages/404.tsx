import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n, useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

function Error404() {
  const { t } = useTranslation("common");

  return (
    <>
      <section className="relative mx-12 mt-14 flex flex-col items-center justify-center h-[40vh] gap-4 md:mx-16 md:mt-[5rem]">
        <h1><span>404</span> - {t("error.404.title")}</h1>
        <p className="md:w-[48%] text-center">{t("error.404.message")}</p>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const isNotPtBr = locale === "en-US";

  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }

  return {
    props: {
      ...(await serverSideTranslations(isNotPtBr ? "en-US" : "pt-BR", [
        "common",
        "home",
      ])),
    },
    revalidate: false,
  };
};

export default Error404;