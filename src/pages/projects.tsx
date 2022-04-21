import { GetStaticProps } from "next";

import { getStaticData } from "../utils/getStaticData";
import { GoalsImage } from "../components/images/svgs/GoalsImage";
import { Background } from "../components/Background";
import { RepositoriesProvider } from "../contexts/RepositoriesProvider";
import { SearchBar } from "../components/SearchBar";
import { LayoutHead } from "../components/LayoutHead";
import { SearchBarProvider } from "../contexts/SearchBarProvider";
import { RepositoriesList } from "../components/RepositoriesList";

interface ProjectsProps {
  repos: Repository[];
  technologies: string[];
  locale: string;
};

function Projects({ locale, repos, technologies }: ProjectsProps) {
  return (
    <>
      <LayoutHead
        locale={locale}
        title="Projects"
        ptBRTitle="Projetos"
      />
      <RepositoriesProvider>
        <SearchBarProvider>
          <SearchBar
            locale={locale}
            technologies={technologies}
          />
        </SearchBarProvider>
        <RepositoriesList
          repos={repos}
          locale={locale}
        />
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
      </RepositoriesProvider>
    </>
  );
};

export const getStaticProps: GetStaticProps = async({ locale }) => {
  const data = await getStaticData({
    getRepos: true,
    getTechnologies: true
  }, locale);

  return {
    props: { ...data, locale },
    revalidate: 60 * 60 * 24 * 7
  };
};

export default Projects;