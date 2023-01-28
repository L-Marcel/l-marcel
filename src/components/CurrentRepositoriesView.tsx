import dynamic from "next/dynamic";
import { useMenuIsOpen } from "../context/hooks/useMenuIsOpen";
import { FilterMenu } from "./FilterMenu";

const RepositoriesListSection = dynamic<unknown>(
  () => {
    return import("./List/RepositoriesList/RepositoriesListSection").then((mod) => {
      return mod.RepositoriesListSection;
    });
  },
  {
    ssr: false,
  }
);

export function CurrentRepositoriesView() {
  const { isOpen } = useMenuIsOpen();

  return isOpen ? <FilterMenu /> : <RepositoriesListSection />;
}
