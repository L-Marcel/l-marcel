import { useCallback, useEffect } from "react";
import { Pagination } from "../providers/reducers/pagination";
import { create } from "zustand";
import { createJSONStorage, persist, redux } from "zustand/middleware";

const useZustandPaginationReducer = create(
  persist(
    redux(Pagination.reducer, {
      max: 0,
      min: 0,
      page: 0,
    }),
    {
      name: "l-marcel-pagination",
      storage: createJSONStorage(() => {
        return sessionStorage;
      }),
      version: 1,
    }
  )
);

interface UsePaginationReducerProps {
  size: number;
}

export function usePaginationReducer({ size }: UsePaginationReducerProps) {
  const pagination = useZustandPaginationReducer((state) => {
    return state;
  });
  const dispatch = useZustandPaginationReducer((state) => {
    return state.dispatch;
  });

  const updatePageLimit = useCallback(
    (min: number, max: number) => {
      dispatch(Pagination.updateLimit(min, max));
    },
    [dispatch]
  );

  useEffect(() => {
    const min = 0;
    const max = Math.ceil(size / 12) - 1;

    updatePageLimit(min, max);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPage = useCallback(
    (page: number, onError?: (page: number) => void) => {
      dispatch(Pagination.setPage(page, onError));
    },
    [dispatch]
  );

  const nextPage = useCallback(() => {
    dispatch(Pagination.nextPage());
  }, [dispatch]);

  const lastPage = useCallback(() => {
    dispatch(Pagination.lastPage());
  }, [dispatch]);

  const previousPage = useCallback(() => {
    dispatch(Pagination.previousPage());
  }, [dispatch]);

  const firstPage = useCallback(() => {
    dispatch(Pagination.firstPage());
  }, [dispatch]);

  return {
    pagination,
    dispatch,
    setPage,
    updatePageLimit,
    nextPage,
    lastPage,
    previousPage,
    firstPage,
  };
}
