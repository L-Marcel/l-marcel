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

  return (
    <RepositoriesListGrid
      repos={filteredRepositories}
    />
  );
};

export { RepositoriesList };