import { useFilter } from "../../context/hooks/useFilter";
import { usePagination } from "../../context/hooks/usePagination";
import {
  Filter,
  FilterToggleOptionActionGroups,
} from "../../context/providers/reducers/filter";
import { Checkbox } from "../Input/Checkbox";
import { FilterMenuOptionButton } from "./FilterMenuOptionButton";
import { FilterMenuGroupContainer } from "./styles";

export interface FilterMenuGroupProps {
  label: string;
  type: FilterToggleOptionActionGroups;
}

export function FilterMenuGroup({ type, label }: FilterMenuGroupProps) {
  const { filter, toggleOption } = useFilter();
  const { firstPage } = usePagination();

  const group = filter[type];
  const allIsSelected = Filter.allFiltersIsSelected(group);

  function handleToggleOption(option: string) {
    toggleOption(option, type);
    firstPage();
  }

  function handleToggleAllOptions() {
    toggleOption("_some", type);
    firstPage();
  }

  return (
    <FilterMenuGroupContainer>
      <Checkbox
        className="mb-1 !w-[inherit]"
        label={label}
        disabledLabel="/ disabled filter"
        checked={allIsSelected}
        indeterminate={!allIsSelected && group._some}
        onChange={handleToggleAllOptions}
      />
      {Object.entries(group).map(([option, isSelected]) => {
        if (option === "_some") {
          return null;
        }

        return (
          <li key={`${group}-${option}-filter-option`}>
            <FilterMenuOptionButton
              onClick={handleToggleOption}
              isSelected={isSelected}
              item={option}
            />
          </li>
        );
      })}
    </FilterMenuGroupContainer>
  );
}
