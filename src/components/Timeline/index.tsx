import { compareDesc, format } from "date-fns";
import { useRouter } from "next/router";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Achievement } from "../../pages/achievements";
import { Icon, IconType } from "../Icon";

import dateLocaleEnUs from "date-fns/locale/en-US";
import dateLocalePtBr from "date-fns/locale/pt-BR";
import { TimelineElementDownloadButton, TimelineElementTimerContainer } from "./styles";

export interface TimelineProps {
  achievements: Achievement[];
  locale?: Locale;
}

export function Timeline({ achievements }: TimelineProps) {
  const route = useRouter();
  const isNotPtBr = route.locale === "en-us";

  const dateConfig = {
    locale: isNotPtBr? dateLocaleEnUs:dateLocalePtBr
  };

  return (
    <VerticalTimeline
      className="timeline"
    >
      {achievements && achievements.length > 0 && achievements?.map(({ 
        id, 
        title,
        subtitle,
        description, 
        registered_in,
        expires_in,
        icon,
        code,
        url
      }) => {
        const iconName = getAchievementIcon(icon);
        const date = format(new Date(registered_in + " 00:00:01"), "yyyy -> MMM. dd", dateConfig);

        const dateToExpire = format(expires_in? new Date(`${expires_in} 00:00:01`):new Date(), "yyyy MMM. dd", dateConfig);
        const dateTimeToExpire = format(expires_in? new Date(`${expires_in} 00:00:01`):new Date(), "yyyy-MM-dd HH:mm", dateConfig);
        const isExpired = compareDesc(expires_in? new Date(`${expires_in} 00:00:01`):new Date(), new Date());

        return (
          <VerticalTimelineElement
            key={id}
            iconClassName={`vertical-timeline-element-icon ${checkIfIconIsBig(iconName)? "small-icon":""}`}
            className="vertical-timeline-element--work"
            date={date}
            icon={<Icon withoutTooltip name={iconName}/>}
          >
            <h2>{title}</h2>
            <h3>{subtitle}</h3>
            <p>{description}</p>
            {
              expires_in && <TimelineElementTimerContainer dateTime={dateTimeToExpire}>
                {isExpired >= 1? 
                  <>{isNotPtBr? "Expired in":"Expirado em"} <span className="capitalize">{dateToExpire}</span></>:
                  <>{isNotPtBr? "Expires in":"Expira em"} <span className="capitalize">{dateToExpire}</span></>
                }
              </TimelineElementTimerContainer>
            }
            <div className="mt-4 flex flex-row items-center gap-2">
              <TimelineElementDownloadButton
                icon="download"
                iconClassName="!text-[1.3rem]"
                size="sm"
                onClick={() => window.open(url, "__blank__")}
              />
              <h4>{isNotPtBr? "Download":"Baixar"}</h4>
            </div>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
}

export function checkIfIconIsBig(icon: IconType | "default") {
  switch(icon) {
  case "clip":
  case "rocketseat":
    return true;
  default:
    return false;
  }
}

export function getAchievementIcon(icon: IconType | "default"): IconType {
  if(icon === "default") {
    return "cube";
  } else if(icon.includes("_")) {
    return icon.replace("_", ".") as IconType;
  } else {
    return icon;
  }
}