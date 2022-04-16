import { useContextSelector } from "use-context-selector";
import { appContext } from "../../contexts/AppProvider";

function useShowOverlay() {
  const showOverlay = useContextSelector(appContext, v => v.showOverlay);
  const setShowOverlay = useContextSelector(appContext, v => v.setShowOverlay);
  const overlayId = useContextSelector(appContext, v => v.overlayId);

  return {
    showOverlay,
    overlayId,
    setShowOverlay
  };
};

export default useShowOverlay;