import { technologies } from "../../../constants/technologies";
import { Icon } from "../../Icon";

export function UtilitiesIcons() {
  return (
    <div className="flex flex-row gap-2 text-white-500">
      {technologies.utilities.map((utility) => {
        return <Icon key={utility} size="md" name={utility} />;
      })}
    </div>
  );
}
