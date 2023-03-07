import Link from "next/link";
import { useRouter } from "../../context/hooks/useRouter";
import { Button } from "../Button";
import { TFunction } from "next-i18next";

interface NavLinkProps {
  locale?: string;
  name: string;
  path: string;
  liClassName?: string;
  dynamic?: boolean;
  t: TFunction;
}

export function NavLink({
  name,
  path,
  locale,
  liClassName,
  dynamic = false,
  t,
}: NavLinkProps) {
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
    <li className={liClassName}>
      <Link className="full-link" href={path} locale={locale}>
        <Button selected={isActive} tabIndex={-1}>
          {t(`navigation.${name}`)}
        </Button>
      </Link>
    </li>
  );
}
