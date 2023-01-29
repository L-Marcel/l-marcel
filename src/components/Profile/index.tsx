import { format, formatDistance } from "date-fns";
import dateLocaleEnUs from "date-fns/locale/en-US";
import dateLocalePtBr from "date-fns/locale/pt-BR";
import Image from "next/image";
import { useRouter } from "../../context/hooks/useRouter";
import { Icon } from "../Icon";
import { Tooltip } from "../Tooltip";
import {
  ProfileArticleContainer,
  ProfileAvatarContainer,
  ProfileTimerContainer,
} from "./styles";

export interface ProfileProps {
  updatedAt: string;
}

export function Profile({ updatedAt }: ProfileProps) {
  const { isNotPtBr } = useRouter();
  const updatedAtDate = new Date(updatedAt);
  const currentDate = new Date();

  const dateConfig = {
    locale: isNotPtBr ? dateLocaleEnUs : dateLocalePtBr,
  };

  return (
    <ProfileArticleContainer>
      <ProfileAvatarContainer>
        <Image
          width={250}
          height={250}
          alt=""
          className="rounded-full"
          quality={80}
          src="https://avatars.githubusercontent.com/u/62476762?v=4"
        />
      </ProfileAvatarContainer>
      <div className="flex flex-col py-4 md:py-8 md:pr-8">
        <h1>
          l<span>-</span>marcel
        </h1>
        <p className="hidden text-base md:block md:text-[1.5rem]">
          <span className="text-lg md:text-[1.5rem]">L</span>ucas{" "}
          <span className="text-lg md:text-[1.5rem]">Marcel</span> Silva de Brito
        </p>
        <Tooltip label={format(updatedAtDate, "yyyy LLL'.' dd -> HH:mm:ss", dateConfig)}>
          <ProfileTimerContainer>
            <Icon
              withoutTooltip
              name="clock"
              className="hidden h-5 w-5 md:block md:h-[1.7rem] md:w-[1.7rem]"
            />
            <time
              className="mb-[2px] max-w-[80vw] md:max-w-[33vw]"
              dateTime={format(updatedAtDate, "yyyy-MM-dd HH:mm", dateConfig)}
            >
              {isNotPtBr ? "last update" : "última atualização"}:{" "}
              {formatDistance(updatedAtDate, currentDate, {
                ...dateConfig,
                addSuffix: true,
              })}
            </time>
          </ProfileTimerContainer>
        </Tooltip>
      </div>
    </ProfileArticleContainer>
  );
}
