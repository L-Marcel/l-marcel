import { ProgressRange } from "../Input/ProgressRange";
import { FilterProgressRangeLabel } from "./FilterProgressRangeLabel";
import { FilterMenuGroupContainer } from "./styles";

export function FilterMenuProgressGroup() {
  return (
    <FilterMenuGroupContainer className="mt-2 rounded-xl bg-white-500 px-7 pt-2 pb-6 dark:bg-gray-500">
      <FilterProgressRangeLabel />
      <li className="mx-3 my-5 w-full">
        <ProgressRange />
      </li>
    </FilterMenuGroupContainer>
  );
}
