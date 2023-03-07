import { useCallback, useEffect } from "react";
import { Repository } from "../../services/classes/Github";
import arrayToData from "../../utils/arrayToData";
import { create } from "zustand";
import { createJSONStorage, persist, redux } from "zustand/middleware";
import { Filter, FilterToggleOptionActionGroups } from "../providers/reducers/filter";

export interface UseFilterReducerProps {
  technologies?: string[];
}

const useZustandFilterReducer = create(
  persist(
    redux(Filter.reducer, {
      names: [],
      progress: {
        min: 0,
        max: 100,
      },
      have: {
        _some: false,
        none: false,
        description: false,
        documentation: false,
        figma: false,
      },
      as: {
        _some: false,
        common: false,
        highlight: false,
        fork: false,
        template: false,
      },
      status: {
        _some: false,
        finished: false,
        deployed: false,
        licensed: false,
        progress: false,
        canceled: false,
      },
      technologies: {
        _some: false,
      },
    }),
    {
      name: "l-marcel-filter",
      storage: createJSONStorage(() => {
        return sessionStorage;
      }),
      version: 1,
    }
  )
);

export function useFilterReducer({ technologies = [] }: UseFilterReducerProps) {
  const initialTechnologies = arrayToData<boolean>(technologies, false);

  const filter = useZustandFilterReducer((state) => {
    return state;
  });

  const dispatch = useZustandFilterReducer((state) => {
    return state.dispatch;
  });

  const setTechnologies = useCallback(
    (newTechnologies: { [key: string]: boolean }) => {
      dispatch(Filter.setTechnologies(newTechnologies));
    },
    [dispatch]
  );

  useEffect(() => {
    setTechnologies(initialTechnologies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setNames = useCallback(
    (names: string[]) => {
      dispatch(Filter.setNames(names));
    },
    [dispatch]
  );

  const toggleOption = useCallback(
    (option: string, group: FilterToggleOptionActionGroups) => {
      dispatch(Filter.toggleOption(option, group));
    },
    [dispatch]
  );

  const changeProgressRange = useCallback(
    (min: number, max: number) => {
      dispatch(Filter.changeProgressRange(min, max));
    },
    [dispatch]
  );

  /* eslint-disable prettier/prettier */
  const getFilteredRepositories = useCallback((repositories: Repository[]) => {
    const repositoriesOrderedFilterByName = repositories
      .map((repository) => {

        const importedConfig = repository.importedConfig;
        const progress = importedConfig? importedConfig.progress ?? 0:0;
        const badge = repository.badge?.toLowerCase();

        const haveFigmaProject = importedConfig? importedConfig?.links?.figma? true:false:false;
        const haveDocumentation = importedConfig? importedConfig?.links?.documentation? true:false:false;
        const haveDescription = repository.description;
        const haveSelfLink = importedConfig? importedConfig?.links?.self? true:false:false;

        const isFork = repository.fork;
        const isTemplate = repository.template;
        const isHighlight = importedConfig && importedConfig?.pinned;
        const isLicensed = repository.license? true:false;
        const isCanceled = badge === "canceled" || badge === "cancelado";
        const isCompleted = progress >= 1 || progress === 0;

        const minProgress = filter.progress.min/100;
        const maxProgress = filter.progress.max/100;
        
        if(
          !(filter.names.includes(repository.name)) ||

          !((importedConfig && importedConfig.technologies
            .some((technology) => { return filter.technologies[technology.toLowerCase()]; })) ||
            !filter.technologies._some) ||

          (!(filter.status.finished && isCompleted && !isCanceled) &&
          !(filter.status.canceled && isCanceled) &&
          !(filter.status.deployed && haveSelfLink) &&
          !(filter.status.licensed && isLicensed) &&
          !(filter.status.progress && !isCompleted && !isCanceled) &&
          filter.status._some) ||

          (!(filter.as.fork && isFork) &&
          !(filter.as.template && isTemplate) &&
          !(filter.as.highlight && isHighlight) &&
          !(filter.as.common && !isFork && !isTemplate && !isHighlight) &&
          filter.as._some) ||

          (!(filter.have.description && haveDescription) && 
          !(filter.have.documentation && haveDocumentation) &&
          !(filter.have.figma && haveFigmaProject) &&
          !(filter.have.none && !haveDescription && !haveDocumentation && !haveFigmaProject) &&
          filter.have._some) ||

          (!((minProgress <= progress && maxProgress >= progress && progress !== 0) || 
          (isCompleted && minProgress === 1) || 
          (isCompleted && maxProgress === 0) ||
          (minProgress === 0 && maxProgress === 1)))
        ) {
          repository._filtered = false;
        } else {
          repository._filtered = true;
        }

        return repository;
      })
      .sort((a, b) => { return Number(b.importedConfig?.pinned ?? false) - Number(a.importedConfig?.pinned ?? false); })
      .sort((a, b) => { return Number(b._filtered) - Number(a._filtered); });

    return repositoriesOrderedFilterByName;
  }, [filter]);
  /* eslint-enable prettier/prettier */

  return {
    filter,
    setNames,
    toggleOption,
    changeProgressRange,
    getFilteredRepositories,
  };
}
