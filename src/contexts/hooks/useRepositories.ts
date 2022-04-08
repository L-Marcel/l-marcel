import { useContextSelector } from "use-context-selector";
import { appContext } from "../../contexts/AppProvider";

function useRepositories() {
  const repositories = useContextSelector(appContext, v => v.repositories);
  const setRepositories = useContextSelector(appContext, v => v.setRepositories);

  return {
    repositories,
    setRepositories
  };
};

export default useRepositories;