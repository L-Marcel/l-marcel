import { GetStaticProps } from "next";

import { getStaticData } from "../utils/getStaticData";
import { GoalsImage } from "../components/images/svgs/GoalsImage";
import { Background } from "../components/Background";
import { RepositoriesProvider } from "../contexts/RepositoriesProvider";
import { SearchBar } from "../components/SearchBar";
import { RepositoriesList } from "../components/RepositoriesList";

interface ProjectsProps {
  repos: Repository[];
  technologies: string[];
};

function Projects({ repos, technologies }: ProjectsProps) {
  return (
    <RepositoriesProvider>
      <SearchBar
        technologies={technologies}
      />
      <RepositoriesList
        repos={repos}
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
  );
};

export const getStaticProps: GetStaticProps = async() => {
  const data = await getStaticData({
    getRepos: true,
    getTechnologies: true
  });

  return {
    props: data,
    revalidate: 60 * 60 * 24
  };
};


export default Projects;