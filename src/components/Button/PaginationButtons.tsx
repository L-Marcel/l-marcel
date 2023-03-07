import { useMediaQuery } from "react-responsive";
import { usePagination } from "../../context/hooks/usePagination";
import { PageInput } from "../Input/PageInput";
import {
  PaginationIconButtonContainer,
  SpecialPaginationIconButtonContainer,
} from "./styles";

export function PaginationButtons() {
  const isVeryTiny = useMediaQuery({
    query: "(max-width: 300px)",
  });

  const { nextPage, previousPage, firstPage, lastPage, pagination } = usePagination();

  const { page, max, min } = pagination;

  const isLastPage = page === max;
  const isFirstPage = page === min;

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {!isVeryTiny && (
        <SpecialPaginationIconButtonContainer
          onClick={firstPage}
          className="rounded-md !pr-[2px]"
          iconClassName="h-[1.8rem] w-[1.8rem]"
          icon="leftArrows"
          disabled={isFirstPage}
        />
      )}
      <div className="flex flex-row">
        <PaginationIconButtonContainer
          onClick={previousPage}
          className="rounded-l-md !pr-[1px]"
          iconClassName="h-[1.8rem] w-[1.8rem]"
          icon="leftArrow"
          disabled={isFirstPage}
        />
        <PageInput />
        <PaginationIconButtonContainer
          onClick={nextPage}
          className="rounded-r-md !pl-[1px]"
          iconClassName="h-[1.8rem] w-[1.8rem]"
          icon="rightArrow"
          disabled={isLastPage}
        />
      </div>
      {!isVeryTiny && (
        <SpecialPaginationIconButtonContainer
          onClick={lastPage}
          className="rounded-md !pl-[2px]"
          iconClassName="h-[1.8rem] w-[1.8rem]"
          icon="rightArrows"
          disabled={isLastPage}
        />
      )}
    </div>
  );
}
