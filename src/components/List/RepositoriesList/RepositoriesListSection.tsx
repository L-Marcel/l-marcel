import { RepositoriesList } from ".";
import { PaginationButtons } from "../../Button/PaginationButtons";
import { RepositoriesListSectionContainer } from "./styles";

export function RepositoriesListSection() {
  return (
    <RepositoriesListSectionContainer>
      <RepositoriesList />
      <PaginationButtons />
    </RepositoriesListSectionContainer>
  );
}
