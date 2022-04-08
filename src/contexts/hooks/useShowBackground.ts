import { useContextSelector } from "use-context-selector";
import { appContext } from "../../contexts/AppProvider";

function useShowBackground() {
  const showBackground = useContextSelector(appContext, v => v.showBackground);
  const setShowBackground = useContextSelector(appContext, v => v.setShowBackground);

  return {
    showBackground,
    setShowBackground
  };
};

export default useShowBackground;