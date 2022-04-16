import { Progress } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import useFilteredRepositories from "../../contexts/hooks/repositories/useFilteredRepositories";
import useRepositories from "../../contexts/hooks/repositories/useRepositories";
import { BlankResult } from "./BlankResult";
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