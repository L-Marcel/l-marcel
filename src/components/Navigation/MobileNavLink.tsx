import Link from "next/link";
import { useRouter } from "../../context/hooks/useRouter";
import { Icon, IconType } from "../Icon";
import { MobileNavLinkIconContainer, MobileNavLinkListItemContainer } from "./styles";
import { TFunction } from "next-i18next";

interface MobileNavLinkProps {
  locale?: string;
  name: string;
  path: string;
  liClassName?: string;
  dynamic?: boolean;
  t: TFunction;
}

export function MobileNavLink({
  name,
  path,
  locale,
  liClassName,
  dynamic = false,
  t,
}: MobileNavLinkProps) {
  const { asPath, ...router } = useRouter();

  const isActive =
    (locale && router.locale?.toLowerCase().includes(name)) ||
    (!locale && dynamic && asPath.replace(/\/en-us/, "/").startsWith(path)) ||
    (!locale && asPath.replace(/\/en-us/, "/") === path);

  if (locale === "pt-br") {
    path = asPath;
  } else if (locale) {
    path = asPath.replace(/\/en-us/, "/");
  }

  return (
    <MobileNavLinkListItemContainer selected={isActive} className={liClassName}>
      <Link className="no-underline" href={path} locale={locale}>
        <div className="flex flex-row gap-4">
          <MobileNavLinkIconContainer selected={isActive}>
            <Icon
              name={name as IconType}
              className="text-4xl !transition-none"
              withoutTooltip
            />
          </MobileNavLinkIconContainer>
          <div className="flex flex-col justify-center">
            <h3 className="first-letter:uppercase">{t(`navigation.${name}`)}</h3>
            <p className="text-base italic">{t(`navigation.descriptions.${name}`)}</p>
          </div>
        </div>
      </Link>
    </MobileNavLinkListItemContainer>
  );
}
