import { MouseEvent } from "react";
import { useRouter } from "../../../context/hooks/useRouter";
import { Repository } from "../../../services/classes/Github";
import { IconButton } from "../../Button/IconButton";
import { Icon, IconType } from "../../Icon";
import {
  RepositoriesListItemBackgroundIcon,
  RepositoriesListItemContainer,
  RepositoriesListItemDescription,
  RepositoriesListItemHeaderContainer,
  RepositoriesListItemHeaderIconContainer,
  RepositoriesListItemHeaderTitle,
  RepositoriesListItemProgressContainer,
  RepositoriesListItemProgressItem,
} from "./styles";

interface RepositoriesListItemProps {
  repository: Repository;
  loading?: string;
}

export function RepositoriesListItem({ repository }: RepositoriesListItemProps) {
  const { isNotPtBr } = useRouter();

  const {
    fullname,
    formattedName,
    description,
    github,
    name,
    fork: isFork,
    license: haveLicense,
    template: isTemplate,
    importedConfig,
    _filtered: isFiltered,
  } = repository;

  function getTranslatedText(text: string, isNotPtBr: boolean) {
    if (isNotPtBr) {
      switch (text) {
        case "self":
          return "visit";
        case "flash":
          return "highlighted";
        default:
          return text;
      }
    }

    switch (text) {
      case "licensed":
        return "licenciado";
      case "documentation":
        return "documentação";
      case "fork":
        return "bifurcação";
      case "template":
        return "modelo";
      case "flash":
        return "destaque";
      case "Repository":
        return "Repositório";
      case "self":
        return "visitar";
      default:
        return text;
    }
  }

  const links = importedConfig?.links;
  const linksInList = links ? Object.entries(links) : [];
  const isPinned = importedConfig ? importedConfig.pinned ?? false : false;
  const progress = importedConfig ? importedConfig.progress ?? 0 : 0;
  const isCompleted = progress >= 1;
  const progressBars = new Array(20).fill(false).map((barIsActived, i) => {
    const number = (i + 1) / 2;

    if (number <= progress * 10) {
      return true;
    }

    return barIsActived;
  });

  const iconName = isPinned
    ? "flash"
    : isFork
    ? "fork"
    : isTemplate
    ? "template"
    : "license";

  function handleOpenLink(e: MouseEvent<HTMLButtonElement>, link: string) {
    e.stopPropagation();
    window.open(link, "_blank");
  }

  function handleNavigateToProject(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const _name = name.toLowerCase();
    window.open(`https://github.com/l-marcel/${_name}`, "_blank");
  }

  return (
    <RepositoriesListItemContainer
      onClick={handleNavigateToProject}
      tabIndex={0}
      $filtered={isFiltered}
    >
      <span className="absolute top-0 left-0 h-full w-full overflow-hidden rounded-md">
        <RepositoriesListItemBackgroundIcon
          name={importedConfig?.icon.toLowerCase() as IconType}
          withoutTooltip
        />
      </span>

      <RepositoriesListItemHeaderContainer>
        <RepositoriesListItemHeaderTitle>
          {formattedName ?? fullname}
        </RepositoriesListItemHeaderTitle>
        <RepositoriesListItemHeaderIconContainer>
          {(isPinned || isFork || isTemplate || haveLicense) && (
            <Icon
              name={iconName}
              label={getTranslatedText(iconName, isNotPtBr)}
              tooltipClassName="z-20 mt-[-10px]"
              tooltipContainerClassName="h-fit"
            />
          )}
        </RepositoriesListItemHeaderIconContainer>
      </RepositoriesListItemHeaderContainer>
      {description && (
        <RepositoriesListItemDescription>{description}</RepositoriesListItemDescription>
      )}

      <footer className="z-20 mt-1 flex flex-col">
        <div className="z-10 flex flex-row flex-wrap items-center gap-2">
          {linksInList.length > 0 &&
            linksInList.map(([key, value]) => {
              return (
                <IconButton
                  key={`${name}-${key}`}
                  size="sm"
                  className="rounded-lg"
                  tooltipClassName="z-10 mt-[-10px]"
                  icon={key as IconType}
                  title={getTranslatedText(key, isNotPtBr)}
                  onClick={(e) => {
                    return handleOpenLink(e, value);
                  }}
                />
              );
            })}
          <IconButton
            size="sm"
            className="rounded-lg"
            tooltipClassName="z-10 mt-[-10px]"
            icon="github"
            onClick={(e) => {
              return handleOpenLink(e, github);
            }}
          />
          {linksInList.length <= 0 ? (
            <h4 className="z-10">{getTranslatedText("Repository", isNotPtBr)}</h4>
          ) : (
            <h4 className="z-10 sm:hidden md:block">
              {getTranslatedText("Repository", isNotPtBr)}
            </h4>
          )}
        </div>
        {progress !== 0 && !isCompleted && (
          <RepositoriesListItemProgressContainer>
            {progressBars.map((barIsActived, i) => {
              return (
                <RepositoriesListItemProgressItem
                  key={`${name}-progress-${i + 1}`}
                  $actived={barIsActived}
                />
              );
            })}
          </RepositoriesListItemProgressContainer>
        )}
      </footer>
    </RepositoriesListItemContainer>
  );
}
