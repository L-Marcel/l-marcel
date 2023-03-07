import { technologies } from "../../../constants/technologies";
import { Icon } from "../../Icon";

export function LibrariesIcons() {
  return (
    <div className="flex flex-row gap-2 text-white-400">
      {technologies.libraries.map((library) => {
        return <Icon key={library} size="md" name={library} />;
      })}
    </div>
  );
}
