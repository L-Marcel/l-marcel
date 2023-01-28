import { useFilteredRepositories } from "../../../context/hooks/useFilteredRepositories";
import { usePagination } from "../../../context/hooks/usePagination";
import { MasonryGrid } from "../../MansoryGrid";
import { RepositoriesListItem } from "./RepositoriesListItem";

export function RepositoriesList() {
  const { pagination } = usePagination();
  const { filteredRepositories } = useFilteredRepositories();
  const { page } = pagination;

  const baseIndex = page * 12;
  const repositoriesInPage = filteredRepositories.slice(baseIndex, baseIndex + 12);

  return (
    <MasonryGrid
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={repositoriesInPage.map((repository: any) => {
        return <RepositoriesListItem key={repository.id} repository={repository} />;
      })}
    />
  );
}
