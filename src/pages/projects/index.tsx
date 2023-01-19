import { GetStaticProps } from "next";
import { CurrentRepositoriesView } from "../../components/CurrentRepositoriesView";
import { ToggleFilterMenuButton } from "../../components/FilterMenu/ToggleFilterMenuButton";
import { SearchRepositoryInput } from "../../components/Input/SearchRepositoryInput";
import { MenuProvider } from "../../context/providers/MenuProvider";
import { Github, Repository } from "../../services/classes/Github";
import { NextSeo } from "next-seo";
import { SearchProvider } from "../../context/providers/SearchProvider";
import { useInfiniteQuery } from "react-query";
import { technologies } from "../../constants/technologies";
interface ProjectsProps {
  repositories: Repository[];
  technologies: string[];
  locale?: string;
  nextPage?: number;
}

function Projects({ repositories, technologies, locale }: ProjectsProps) {
  const { data } = useInfiniteQuery<ProjectsProps>(
    [locale],
    async ({ pageParam = 3 }) => {
      return {
        repositories: [],
        technologies: [],
      };
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.nextPage;
      },
      initialData: {
        pages: [],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pageParams: 3 as any,
      },
    }
  );

  const { repositories: _repositories, technologies: _technologies } =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    data!.pages!.reduce(
      (prev, cur) => {
        prev.repositories = [...prev.repositories, ...cur.repositories];
        prev.technologies = [...prev.technologies, ...cur.technologies];
        return prev;
      },
      {
        repositories,
        technologies,
      }
    );

  return (
    <>
      <NextSeo
        title={locale === "en-us" ? "Projects" : "Projetos"}
        defaultTitle="L-Marcel"
        titleTemplate="L-Marcel - %s"
      />
      <SearchProvider repositories={_repositories} technologies={_technologies}>
        <MenuProvider>
          <section className="relative mx-12 mt-14 flex flex-row items-center justify-start gap-4 md:mx-16 md:mt-[5rem]">
            <SearchRepositoryInput
              repositories={_repositories.map(
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
  const repositories = await Github.getRepositories({
    locale: locale ?? "pt-br",
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

  return {
    props: {
      repositories: repositories.sort((a, b) => {
        return a.fullname.toLowerCase().localeCompare(b.fullname.toLowerCase());
      }),
      technologies,
      updatedAt,
      locale,
    },
    revalidate: 1,
  };
};

export default Projects;
