export type ProgressFilterType = {
  min: number;
  max: number;
};

export type HaveFilterType = {
  _some: boolean;
  description: boolean;
  documentation: boolean;
  figma: boolean;
  none: boolean;
};

export type AsFilterType = {
  _some: boolean;
  common: boolean;
  highlight: boolean;
  fork: boolean;
  template: boolean;
};

export type StatusFilterType = {
  _some: boolean;
  finished: boolean;
  deployed: boolean;
  licensed: boolean;
  progress: boolean;
  canceled: boolean;
};

export type TechnologiesFilterType = {
  _some: boolean;
  [key: string]: boolean;
};

export type FilterType = {
  names: string[];
  progress: ProgressFilterType;
  have: HaveFilterType;
  as: AsFilterType;
  status: StatusFilterType;
  technologies: TechnologiesFilterType;
};

export enum FilterAction {
  SET_NAMES = "SET_NAMES",
  SET_TECHNOLOGIES = "SET_TECHNOLOGIES",
  TOGGLE_OPTION = "TOGGLE_OPTION",
  CHANGE_PROGRESS_RANGE = "CHANGE_PROGRESS_RANGE",
}

export type FilterSetNamesActionPayload = string[];

export type FilterToggleOptionActionGroups = "technologies" | "status" | "have" | "as";
export type FilterToggleTechnologyActionPayload = {
  group: FilterToggleOptionActionGroups;
  item: string;
};

export type FilterChangeProgressRangeActionPayload = {
  min: number;
  max: number;
};

export type FilterSetTechnologiesActionPayload = {
  newTechnologies: {
    [key: string]: boolean;
  };
};

export interface FilterReducerAction {
  type: FilterAction;
  payload?:
    | FilterSetNamesActionPayload
    | FilterToggleTechnologyActionPayload
    | FilterChangeProgressRangeActionPayload
    | FilterSetTechnologiesActionPayload;
}

export class Filter {
  static reducer(filter: FilterType, action: FilterReducerAction) {
    switch (action.type) {
      case FilterAction.SET_NAMES: {
        if (!action.payload) {
          return filter;
        }

        const newNames = action.payload as FilterSetNamesActionPayload;

        return {
          ...filter,
          names: newNames,
        };
      }
      case FilterAction.TOGGLE_OPTION: {
        if (!action.payload) {
          return filter;
        }

        const { group, item } = action.payload as FilterToggleTechnologyActionPayload;

        if (!group || !item) {
          return filter;
        }

        const groupData: { [key: string]: boolean } = filter[group];

        if (item === "_some") {
          const allIsSelected = Filter.allFiltersIsSelected(groupData);
          const newGroup = Filter.updateAllFilters(
            groupData,
            allIsSelected ? false : true
          );

          return {
            ...filter,
            [group]: newGroup,
          };
        }

        const newOption = !groupData[item];
        const newGroup = {
          ...groupData,
          [item]: newOption,
        };

        return {
          ...filter,
          [group]: {
            ...newGroup,
            _some: Filter.someFiltersIsSelected(newGroup),
          },
        };
      }
      case FilterAction.CHANGE_PROGRESS_RANGE: {
        if (!action.payload) {
          return filter;
        }

        let { min, max } = action.payload as FilterChangeProgressRangeActionPayload;

        if (min > max) {
          [min, max] = [max, min];
        }

        return {
          ...filter,
          progress: {
            min,
            max,
          },
        };
      }

      case FilterAction.SET_TECHNOLOGIES: {
        if (!action.payload) {
          return filter;
        }

        const { newTechnologies } = action.payload as FilterSetTechnologiesActionPayload;

        return {
          ...filter,
          technologies: {
            ...newTechnologies,
            ...filter.technologies,
          },
        };
      }
      default:
        return filter;
    }
  }

  static setNames(names: string[]) {
    return {
      type: FilterAction.SET_NAMES,
      payload: names,
    };
  }

  static toggleOption(option: string, group: FilterToggleOptionActionGroups) {
    return {
      type: FilterAction.TOGGLE_OPTION,
      payload: {
        item: option,
        group,
      },
    };
  }

  static changeProgressRange(min: number, max: number) {
    return {
      type: FilterAction.CHANGE_PROGRESS_RANGE,
      payload: {
        min,
        max,
      },
    };
  }

  static setTechnologies(newTechnologies: { [key: string]: boolean }) {
    return {
      type: FilterAction.SET_TECHNOLOGIES,
      payload: {
        newTechnologies,
      },
    };
  }

  static allFiltersIsSelected(obj: { [key: string]: boolean }) {
    return Object.entries(obj)
      .map(([key, isSelected]) => {
        return isSelected || key === "_some";
      })
      .every((isSelected) => {
        return isSelected;
      });
  }

  static someFiltersIsSelected(obj: { [key: string]: boolean }) {
    return Object.entries(obj)
      .map(([key, isSelected]) => {
        return isSelected && key !== "_some";
      })
      .some((isSelected) => {
        return isSelected;
      });
  }

  static updateAllFilters(obj: { [key: string]: boolean }, isSelected: boolean) {
    return Object.entries(obj).reduce((prev, [key]) => {
      prev[key] = isSelected;
      return prev;
    }, {} as { [key: string]: boolean });
  }
}
