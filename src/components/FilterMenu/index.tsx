import { HorizontalDivider } from "../HorizontalDivider";
import { FilterMenuGroup } from "./FilterMenuGroup";
import { FilterMenuProgressGroup } from "./FilterMenuProgressGroup";
import { FilterMenuContainer } from "./styles";

export function FilterMenu() {
  return (
    <FilterMenuContainer>
      <FilterMenuGroup type="technologies" label="technologies" />
      <FilterMenuGroup type="as" label="type" />
      <FilterMenuGroup type="have" label="documents" />
      <FilterMenuGroup type="status" label="status" />
      <HorizontalDivider className="border-white-700 dark:border-gray-500" />
      <FilterMenuProgressGroup />
    </FilterMenuContainer>
  );
}
