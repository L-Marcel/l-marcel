import { usePagination } from "../../context/hooks/usePagination";
import { PageInput } from "../Input/PageInput";
import { PaginationIconButtonContainer, SpecialPaginationIconButtonContainer } from "./styles";

export function PaginationButtons() {
  const { 
    nextPage, 
    previousPage, 
    firstPage, 
    lastPage,
    pagination  
  } = usePagination();

  const { page, max, min } = pagination;
  
  const isLastPage = page === max;
  const isFirstPage = page === min;

  return (
    <div className="flex flex-row gap-3">
      <SpecialPaginationIconButtonContainer
        onClick={firstPage} 
        className="rounded-md p-0 pr-[2px]" 
        iconClassName="h-[1.8rem] w-[1.8rem]" 
        icon="leftArrows"
        disabled={isFirstPage}
      />
      <div className="flex flex-row">
        <PaginationIconButtonContainer
          onClick={previousPage} 
          className="rounded-l-md p-0 pr-[1px]" 
          iconClassName="h-[1.8rem] w-[1.8rem]" 
          icon="leftArrow"
          disabled={isFirstPage}
        />
        <PageInput/>
        <PaginationIconButtonContainer
          onClick={nextPage} 
          className="rounded-r-md p-0 pl-[1px]" 
          iconClassName="h-[1.8rem] w-[1.8rem]" 
          icon="rightArrow"
          disabled={isLastPage}
        />
      </div>
      <SpecialPaginationIconButtonContainer
        onClick={lastPage} 
        className="rounded-md p-0 pl-[2px]" 
        iconClassName="h-[1.8rem] w-[1.8rem]" 
        icon="rightArrows"
        disabled={isLastPage}
      />
    </div>
  );
}