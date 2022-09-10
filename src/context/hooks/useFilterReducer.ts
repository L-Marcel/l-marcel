import { useCallback, useReducer } from "react";
import { Repository } from "../../services/Github";
import arrayToData from "../../utils/arrayToData";
import { Filter } from "../providers/reducers/filter";

export interface UseFilterReducerProps {
  technologies?: string[];
  badges?: string[];
}

export function useFilterReducer({
  technologies = [],
  badges = []
}: UseFilterReducerProps) {
  const initialTechnologies = arrayToData<boolean>(technologies, true);
  const initialBadges = arrayToData<boolean>(badges, true);

  const [filter, dispatch] = useReducer(Filter.reducer, {
    names: [],
    progress: {
      min: 0,
      max: 100
    },
    have: {
      _some: false,
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
    is: {
      _some: false,
      finished: false,
      deployed: false,
      licensed: false,
    },
    badges: {
      _some: true,
      ...initialBadges
    },
    technologies: {
      _some: true,
      ...initialTechnologies
    },
  });

  const setNames = useCallback((names: string[]) => {
    dispatch(Filter.setNames(names));
  }, [dispatch]);

  const toggleTechnology = useCallback((technology: string) => {
    dispatch(Filter.toggleTechnology(technology));
  }, [dispatch]);
  
  
  const getFilteredRepositories = useCallback((repositories: Repository[], onUpdate?: () => void) => {
    const repositoriesOrderedFilterByName = repositories
      .map(repository => {
        if(filter.names.includes(repository.name)) {
          repository._filtered = true;
        } else {
          repository._filtered = false;
        }

        return repository;
      })
      .filter(repository => {
        if(
          repository.importedConfig && 
          repository.importedConfig?.technologies
            .some(technology => filter.technologies[technology.toLowerCase()])
        ) {
          return true;
        }

        return false;
      })
      .sort((a, b) => Number(b.importedConfig?.pinned ?? false) - Number(a.importedConfig?.pinned ?? false))
      .sort((a, b) => Number(b._filtered) - Number(a._filtered));

    onUpdate && onUpdate();
    return repositoriesOrderedFilterByName;
  }, [filter]);

  return {
    filter,
    setNames,
    toggleTechnology,
    getFilteredRepositories
  };
}