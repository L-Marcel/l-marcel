import { useEffect } from "react";
import useFilteredRepositories from "../../contexts/hooks/repositories/useFilteredRepositories";
import useRepositories from "../../contexts/hooks/repositories/useRepositories";
import { BlankResult } from "./BlankResult";
import { RepositoriesListGrid } from "./RepositoriesListGrid";
interface RepositoriesListProps {
  repos: Repository[];
  locale?: string;
};

function RepositoriesList({ 
  repos,
  locale
}: RepositoriesListProps) {
  const { setRepositories } = useRepositories();
  const { filteredRepositories } = useFilteredRepositories();

  useEffect(() => {
    setRepositories(repos);
  }, [setRepositories, repos]);

  if(filteredRepositories.length === 0) {
    return (
      <BlankResult
        locale={locale}
      />
    );
  };

  return (
    <RepositoriesListGrid
      repos={filteredRepositories}
    />
  );
};

export { RepositoriesList };