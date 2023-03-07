import { TechnologyLevel } from ".";
import { technologies } from "../../../constants/technologies";

export function TechnologiesLevel() {
  return (
    <div className="grid gap-8 px-12 pb-2 sm:grid-cols-2 md:grid-cols-3 md:px-16 xl:grid-cols-4 2xl:grid-cols-5">
      {technologies.levels.map(({ level, name }) => {
        return (
          <TechnologyLevel
            key={`level-${name}`}
            technology={name}
            level={level}
            max={10}
          />
        );
      })}
    </div>
  );
}
