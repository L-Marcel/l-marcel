import { GetStaticProps } from "next";
import { CurrentRepositoriesView } from "../../components/CurrentRepositoriesView";
import { ToggleFilterMenuButton } from "../../components/FilterMenu/ToggleFilterMenuButton";
import { SearchRepositoryInput } from "../../components/Input/SearchRepositoryInput";
import { MenuProvider } from "../../context/providers/MenuProvider";
import { Github, Repository } from "../../services/Github";
import { NextSeo } from "next-seo";
import { SearchProvider } from "../../context/providers/SearchProvider";
interface ProjectsProps {
  repositories: Repository[];
  technologies: string[];
  locale?: string;
}

function Projects({
  repositories,
  technologies,
  locale
}: ProjectsProps) {

  return (
    <>
      <NextSeo
        title={locale === "en-us"? "Projects":"Projetos"}
        defaultTitle="L-Marcel"
        titleTemplate="L-Marcel - %s"
      />
      <SearchProvider
        repositories={repositories}
        technologies={technologies}
      >
        <MenuProvider>
          <section className="relative mx-12 mt-14 flex flex-row items-center justify-start gap-4 md:mx-16 md:mt-[5rem]">
            <SearchRepositoryInput
              repositories={repositories.map(({ name, formattedName, importedConfig })=> ({
                name,
                formattedName,
                isPinned: importedConfig?.pinned ?? false
              }))}
            />
            <ToggleFilterMenuButton/>
          </section>
          <CurrentRepositoriesView/>
        </MenuProvider>
      </SearchProvider>
    </>
  );
}

export const getStaticProps: GetStaticProps = async({ locale }) => {
  const repositories = await Github.getRepositories({
    locale: locale ?? "pt-br",
    getLanguages: true
  });
  
  const updatedAt = new Date().toString();

  const repositoriesData = repositories.reduce((prev, cur) => {
    if(!cur.importedConfig || !cur.importedConfig?.technologies) {
      return prev;
    }

    const currentTechnologies = cur.importedConfig?.technologies;

    for(const t in currentTechnologies) {
      prev.technologies.add(currentTechnologies[t].toLowerCase());
    }

    return prev;
  }, {
    technologies: new Set<string>()
  });

  const technologies = Array.from(repositoriesData.technologies);

  return {
    props: {
      repositories: repositories.sort((a, b) => a.fullname.toLowerCase().localeCompare(b.fullname.toLowerCase())),
      technologies,
      updatedAt,
      locale
    },
    revalidate: 1
  };
};

export default Projects;