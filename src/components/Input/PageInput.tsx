import { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePagination } from "../../context/hooks/usePagination";
import { PaginationInputContainer } from "./styles";

export function PageInput() {
  const ref = useRef<HTMLInputElement>(null);

  const { setPage, pagination } = usePagination();

  const { page } = pagination;

  const [paginationInputValue, setPaginationInputValue] = useState<string | number>(page);

  useEffect(() => {
    setPaginationInputValue(page + 1);

    if (ref.current !== null && window.scrollY !== 0) {
      ref.current.scrollIntoView({ behavior: "auto" });
    }
  }, [page, ref, setPaginationInputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newPage = Number(paginationInputValue) - 1;
      setPage(newPage, (page) => {
        setPaginationInputValue(page + 1);
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [setPage, paginationInputValue]);

  function handleOnChangePaginationInputValue(e: ChangeEvent<HTMLInputElement>) {
    setPaginationInputValue(e.target.value);
  }

  return (
    <PaginationInputContainer
      ref={ref}
      value={paginationInputValue}
      inputMode="numeric"
      onChange={handleOnChangePaginationInputValue}
    />
  );
}
