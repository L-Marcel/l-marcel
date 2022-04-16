import { CircularProgress, Progress } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import useFilteredRepositories from "../../contexts/hooks/repositories/useFilteredRepositories";
import useRepositories from "../../contexts/hooks/repositories/useRepositories";
import { RepositoriesListGrid } from "./RepositoriesListGrid";

interface RepositoriesListProps {
  repos: Repository[];
};

function RepositoriesList({ repos }: RepositoriesListProps) {
  const { setRepositories } = useRepositories();
  const { filteredRepositories } = useFilteredRepositories();

  useEffect(() => {
    setRepositories(repos);
  }, [setRepositories, repos]);

  const RepositoriesListGrid = dynamic<{ repos: Repository[] }>(
    async() => await import("./RepositoriesListGrid")
    .then(mod => mod.RepositoriesListGrid), 
    {
      loading: () => <Progress
        position="absolute"
        top="-17px"
        h={1}
        w="100%"
        isIndeterminate
        bgColor="search"
      />
    }
  );
    
  return (
    <RepositoriesListGrid
      repos={filteredRepositories}
    />
  );
};

export { RepositoriesList };