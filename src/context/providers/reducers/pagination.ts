export type PaginationType = {
  page: number;
  max: number;
  min: number;
};

export enum PaginationAction {
  SET_PAGE = "SET_PAGE",
  UPDATE_LIMIT = "UPDATE_LIMIT",
  NEXT_PAGE = "NEXT_PAGE",
  PREVIOUS_PAGE = "PREVIOUS_PAGE",
  LAST_PAGE = "LAST_PAGE",
  FIRST_PAGE = "FIRST_PAGE",
}

export type PaginationUpdateLimitActionPayload = {
  max: number;
  min: number;
};

export type PaginationSetPageActionPayload = {
  page: number;
  onError?: (page: number) => void;
};

export interface PaginationReducerAction {
  type: PaginationAction;
  payload?: PaginationUpdateLimitActionPayload | PaginationSetPageActionPayload;
}

export class Pagination {
  static reducer(pagination: PaginationType, action: PaginationReducerAction) {
    const { min, max, page } = pagination;

    switch (action.type) {
      case PaginationAction.SET_PAGE: {
        if (!action.payload) {
          return pagination;
        }

        const { page: newPage, onError } =
          action.payload as PaginationSetPageActionPayload;

        if (isNaN(newPage)) {
          onError && onError(page);
          return pagination;
        }

        const _page = newPage > max ? max : newPage < min ? min : newPage;

        onError && _page !== newPage && onError(_page);

        return {
          min,
          max,
          page: _page,
        };
      }
      case PaginationAction.UPDATE_LIMIT: {
        if (!action.payload) {
          return pagination;
        }

        const { min: newMin, max: newMax } =
          action.payload as PaginationUpdateLimitActionPayload;
        return {
          min: newMin,
          max: newMax,
          page: page > newMax ? newMax : page < newMin ? newMin : page,
        };
      }
      case PaginationAction.NEXT_PAGE: {
        const nextPage = page + 1;

        return {
          min,
          max,
          page: page >= max ? max : nextPage,
        };
      }
      case PaginationAction.LAST_PAGE: {
        return {
          min,
          max,
          page: max,
        };
      }
      case PaginationAction.PREVIOUS_PAGE: {
        const previousPage = page - 1;

        return {
          min,
          max,
          page: page <= min ? min : previousPage,
        };
      }
      case PaginationAction.FIRST_PAGE: {
        return {
          min,
          max,
          page: min,
        };
      }
      default:
        return pagination;
    }
  }

  static setPage(page: number, onError?: (page: number) => void) {
    return {
      type: PaginationAction.SET_PAGE,
      payload: {
        page,
        onError,
      },
    };
  }

  static updateLimit(min: number, max: number) {
    return {
      type: PaginationAction.UPDATE_LIMIT,
      payload: {
        max,
        min,
      },
    };
  }

  static nextPage() {
    return {
      type: PaginationAction.NEXT_PAGE,
    };
  }

  static lastPage() {
    return {
      type: PaginationAction.LAST_PAGE,
    };
  }

  static previousPage() {
    return {
      type: PaginationAction.PREVIOUS_PAGE,
    };
  }

  static firstPage() {
    return {
      type: PaginationAction.FIRST_PAGE,
    };
  }
}
