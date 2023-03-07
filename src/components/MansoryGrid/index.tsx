import { useMediaQuery } from "react-responsive";
import { useMasonryGridItems } from "../../context/hooks/useMasonryGridItems";
import { ColumnContainer, ExpansibleItem, ListColumnContainer } from "./styles";

interface MasonryGridProps {
  items?: JSX.Element[];
}

export function MasonryGrid({ items = [] }: MasonryGridProps) {
  const isWide = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const isSmall = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const list = useMasonryGridItems(isWide, isSmall, items);

  if (items.length === 0) {
    return <></>;
  }

  const firstColumn = list[0];
  const secondColumn = list[1];
  const lastColumn = list[2];

  return (
    <ul className="flex w-full flex-row flex-wrap gap-3">
      {firstColumn.length > 0 && (
        <ListColumnContainer className="sm:w-[calc(50%-.375rem)] md:w-[calc(33%-.5rem)]">
          <ColumnContainer>{firstColumn}</ColumnContainer>
          <ExpansibleItem />
        </ListColumnContainer>
      )}

      {(secondColumn.length > 0 || isSmall || isWide) && (
        <ListColumnContainer className="sm:w-[calc(50%-.375rem)] md:w-[calc(33%-.5rem)]">
          <ColumnContainer>{secondColumn}</ColumnContainer>
          <ExpansibleItem />
        </ListColumnContainer>
      )}
      {(lastColumn.length > 0 || isWide) && (
        <ListColumnContainer className="md:w-[calc(33%-.5rem)]">
          <ColumnContainer>{lastColumn}</ColumnContainer>
          <ExpansibleItem />
        </ListColumnContainer>
      )}
    </ul>
  );
}
