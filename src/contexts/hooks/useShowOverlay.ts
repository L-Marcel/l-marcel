import { useContextSelector } from "use-context-selector";
import { appContext } from "../../contexts/AppProvider";

function useShowOverlay() {
  const showOverlay = useContextSelector(appContext, v => v.showOverlay);
  const setShowOverlay = useContextSelector(appContext, v => v.setShowOverlay);

  return {
    showOverlay,
    setShowOverlay
  };
};

export default useShowOverlay;