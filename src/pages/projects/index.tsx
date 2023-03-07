import { GetStaticProps } from "next";
import { CurrentRepositoriesView } from "../../components/CurrentRepositoriesView";
import { ToggleFilterMenuButton } from "../../components/FilterMenu/ToggleFilterMenuButton";
import { SearchRepositoryInput } from "../../components/Input/SearchRepositoryInput";
import { MenuProvider } from "../../context/providers/MenuProvider";
import { Github, Repository } from "../../services/classes/Github";
import { NextSeo } from "next-seo";
import { SearchProvider } from "../../context/providers/SearchProvider";
import { Translation } from "../../services/translation";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "next-i18next";
interface ProjectsProps {
  repositories: Repository[];
  technologies: string[];
  locale?: string;
  nextPage?: number;
}

function Projects({ repositories, technologies, locale }: ProjectsProps) {
  return (
    <>
      <NextSeo
        title={locale === "en-US" ? "Projects" : "Projetos"}
        defaultTitle="L-Marcel"
        titleTemplate="L-Marcel - %s"
      />
      <SearchProvider repositories={repositories} technologies={technologies}>
        <MenuProvider>
          <section className="relative mx-12 mt-14 flex flex-row items-center justify-start gap-4 md:mx-16 md:mt-[5rem]">
            <SearchRepositoryInput
              repositories={repositories.map(
                ({ name, formattedName, importedConfig }) => {
                  return {
                    name,
                    formattedName,
                    isPinned: importedConfig?.pinned ?? false,
                  };
                }
              )}
            />
            <ToggleFilterMenuButton />
          </section>
          <CurrentRepositoriesView />
        </MenuProvider>
      </SearchProvider>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const isNotPtBr = locale === "en-US";

  const repositories = await Github.getRepositories({
    locale: locale ?? "pt-BR",
    getLanguages: true,
  });

  const updatedAt = new Date().toString();

  const repositoriesData = repositories.reduce(
    (prev, cur) => {
      if (!cur.importedConfig || !cur.importedConfig?.technologies) {
        return prev;
      }

      const currentTechnologies = cur.importedConfig?.technologies;

      for (const t in currentTechnologies) {
        prev.technologies.add(currentTechnologies[t].toLowerCase());
      }

      return prev;
    },
    {
      technologies: new Set<string>(),
    }
  );

  const technologies = Array.from(repositoriesData.technologies);

  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }

  return {
    props: {
      repositories: repositories.sort((a, b) => {
        return a.fullname.toLowerCase().localeCompare(b.fullname.toLowerCase());
      }),
      technologies,
      updatedAt,
      locale,
      ...(await serverSideTranslations(isNotPtBr ? "en-US" : "pt-BR", [
        "common",
        "projects",
      ])),
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Translation.use(Projects);
