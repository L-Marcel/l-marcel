import { compareDesc, format } from "date-fns";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { Achievement } from "../../pages/achievements";
import { Icon, IconType } from "../Icon";

import dateLocaleEnUs from "date-fns/locale/en-US";
import dateLocalePtBr from "date-fns/locale/pt-BR";
import { useRouter } from "../../context/hooks/useRouter";
import { Tooltip } from "../Tooltip";
import { TimelineElementDownloadButton, TimelineElementTimerContainer } from "./styles";
import { TimelineElementCode } from "./TimelineElementCode";

export interface TimelineProps {
  achievements: Achievement[];
  locale?: Locale;
}

export function Timeline({ achievements }: TimelineProps) {
  const { isNotPtBr } = useRouter();

  const dateConfig = {
    locale: isNotPtBr ? dateLocaleEnUs : dateLocalePtBr,
  };

  return (
    <VerticalTimeline className="timeline">
      {achievements &&
        achievements.length > 0 &&
        achievements?.map(
          ({
            id,
            title,
            subtitle,
            description,
            registered_in,
            expires_in,
            icon,
            code,
            url,
            button_icon,
            button_text,
          }) => {
            const iconName = getAchievementIcon(icon);
            const date = format(
              new Date(registered_in + " 00:00:01"),
              "yyyy -> MMM. dd",
              dateConfig
            );

            const dateToExpire = format(
              expires_in ? new Date(`${expires_in} 00:00:01`) : new Date(),
              "yyyy MMM. dd",
              dateConfig
            );
            const dateTimeToExpire = format(
              expires_in ? new Date(`${expires_in} 00:00:01`) : new Date(),
              "yyyy-MM-dd HH:mm",
              dateConfig
            );
            const isExpired = compareDesc(
              expires_in ? new Date(`${expires_in} 00:00:01`) : new Date(),
              new Date()
            );

            return (
              <VerticalTimelineElement
                key={id}
                iconClassName={`vertical-timeline-element-icon ${
                  checkIfIconIsBig(iconName) ? "small-icon" : ""
                }`}
                date={date}
                icon={<Icon withoutTooltip name={iconName} />}
              >
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
                <p>{description}</p>
                {expires_in && (
                  <TimelineElementTimerContainer dateTime={dateTimeToExpire}>
                    {isExpired >= 1 ? (
                      <>
                        {isNotPtBr ? "Expired in" : "Expirado em"}{" "}
                        <span className="capitalize">{dateToExpire}</span>
                      </>
                    ) : (
                      <>
                        {isNotPtBr ? "Expires in" : "Expira em"}{" "}
                        <span className="capitalize">{dateToExpire}</span>
                      </>
                    )}
                  </TimelineElementTimerContainer>
                )}
                {(url || code) && (
                  <div className="mt-4 flex flex-row items-center gap-3">
                    {url && (
                      <Tooltip
                        className="!top-[calc(100%+.5rem)]"
                        label={url.slice(0, 24) + "..."}
                      >
                        <div className="flex flex-row items-center gap-3">
                          <TimelineElementDownloadButton
                            icon={getAchievementIcon(button_icon ?? "download")}
                            id={`${id}-donwload-button`}
                            size="sm"
                            onClick={() => {
                              return window.open(url, "_blank");
                            }}
                          />
                          {!code && (
                            <label
                              className="download-button-label"
                              htmlFor={`${id}-donwload-button`}
                            >
                              {button_text ?? (isNotPtBr ? "Download" : "Baixar")}
                            </label>
                          )}
                        </div>
                      </Tooltip>
                    )}

                    {code && <TimelineElementCode code={code} />}
                  </div>
                )}
              </VerticalTimelineElement>
            );
          }
        )}
    </VerticalTimeline>
  );
}

export function checkIfIconIsBig(icon: IconType | "default") {
  switch (icon) {
    case "clip":
    case "rocketseat":
      return true;
    default:
      return false;
  }
}

export function getAchievementIcon(
  icon: IconType | "default",
  isButton = false
): IconType {
  if (icon === "default") {
    return isButton ? "download" : "cube";
  } else if (icon.includes("_")) {
    return icon.replace("_", ".") as IconType;
  } else {
    return icon;
  }
}
