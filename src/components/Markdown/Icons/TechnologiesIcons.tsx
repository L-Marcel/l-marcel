import { technologies } from "../../../constants/technologies";
import { Icon, IconType } from "../../Icon";

export function TechnologiesIcons() {
  return (
    <div className="flex flex-row gap-2 text-gray-600 dark:text-white-500">
      {technologies.levels.map(({ isPrimary, name }) => {
        return (
          <Icon
            className={isPrimary ? "text-primary-500" : ""}
            key={name.toLocaleLowerCase()}
            size="md"
            name={name.toLocaleLowerCase() as IconType}
          />
        );
      })}
    </div>
  );
}
