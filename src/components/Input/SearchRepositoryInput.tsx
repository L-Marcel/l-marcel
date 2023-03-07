import { Combobox, Transition } from "@headlessui/react";
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import { useFilter } from "../../context/hooks/useFilter";
import { usePagination } from "../../context/hooks/usePagination";
import { Icon } from "../Icon";

import {
  SearchBox,
  OptionsKdb,
  SearchInputIcon,
  SearchOption,
  SearchOptions,
  comboboxInputClassName,
  KdbContainer,
} from "./styles";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useTranslation } from "next-i18next";

export type RepositoryBasicData = {
  name: string;
  formattedName?: string;
  isPinned: boolean;
};

export interface SearchRepositoryInputProps {
  repositories?: RepositoryBasicData[];
}

interface ZustandQuery {
  query: string;
  setQuery: (query: string) => void;
}

const useZustandQuery = create(
  persist<ZustandQuery>(
    (set) => {
      return {
        query: "",
        setQuery: (query: string) => {
          return set(() => {
            return {
              query,
            };
          });
        },
      };
    },
    {
      name: "l-marcel-search",
      storage: createJSONStorage(() => {
        return sessionStorage;
      }),
      version: 1,
    }
  )
);

export function SearchRepositoryInput({ repositories = [] }: SearchRepositoryInputProps) {
  const { setNames } = useFilter();
  const { t } = useTranslation("projects");
  const { firstPage } = usePagination();

  const [userWantsToSeeMainList, setUserWantsToSeeMainList] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { query, setQuery } = useZustandQuery();

  const filteredRepositories = useMemo(() => {
    return query === ""
      ? repositories
      : repositories
      ? repositories.filter((repository) => {
          const includesTheName = repository.name
            .toLowerCase()
            .includes(query.toLowerCase());
          const includesTheFormattedName = repository.formattedName
            ?.toLowerCase()
            .includes(query.toLowerCase());

          return includesTheName || includesTheFormattedName;
        })
      : [];
  }, [query, repositories]);

  useEffect(() => {
    setNames(
      filteredRepositories.map((repository) => {
        return repository.name;
      })
    );
  }, [filteredRepositories, setNames]);

  function handleOnFocus() {
    setIsFocused(true);
    setUserWantsToSeeMainList(false);
  }

  function handleOnBlur() {
    setIsFocused(false);
    setUserWantsToSeeMainList(false);
  }

  function handleOnKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
  }

  function handleOnPressEnter(
    event: KeyboardEvent<HTMLInputElement>,
    activeIndex: number | null
  ) {
    if (event.key === "Enter") {
      handleOnBlur();
      setUserWantsToSeeMainList(true);

      const needComplete = activeIndex && activeIndex > 0;
      if (!needComplete) {
        event.preventDefault();
      }
    } else {
      setUserWantsToSeeMainList(false);
    }
  }

  function handleOnChangeQuery(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setUserWantsToSeeMainList(false);
    firstPage();
  }

  function handleOnSelect(newQuery: string) {
    setQuery(newQuery);
    handleOnBlur();
    setUserWantsToSeeMainList(true);
  }

  return (
    <Combobox as={SearchBox} value={query} onChange={setQuery}>
      {({ open, activeIndex }) => {
        const show = (open || isFocused) && !userWantsToSeeMainList;

        return (
          <>
            <Transition
              show={show}
              enter="duration-[350ms] transition-all ease-in-out"
              enterFrom="opacity-0 pointer-events-none"
              enterTo="opacity-100 pointer-events-all"
              leave="duration-[350ms] transition-all ease-in-out"
              leaveFrom="opacity-100 pointer-events-all"
              leaveTo="opacity-0 pointer-events-none"
              className="custom-backdrop-blur fixed bottom-0 right-0 z-0 h-screen w-screen bg-[rgba(255,255,255,.3)] dark:bg-[rgba(0,0,0,.3)]"
            />
            <Combobox.Button onFocus={handleOnFocus} className="relative w-full">
              <SearchInputIcon name="search" isFocused={show} withoutTooltip />
              <Combobox.Input
                as="input"
                className={comboboxInputClassName}
                autoComplete="off"
                placeholder={t("input.search") ?? "Search by name"}
                onKeyUp={handleOnKeyUp}
                onFocusCapture={handleOnFocus}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                  return handleOnPressEnter(event, activeIndex);
                }}
                onChange={handleOnChangeQuery}
              />
            </Combobox.Button>
            {show && filteredRepositories.length >= 1 && (
              <SearchOptions as="ul" static>
                {filteredRepositories &&
                  filteredRepositories
                    .sort((a, b) => {
                      return Number(b.isPinned) - Number(a.isPinned);
                    })
                    .map(({ name, formattedName, isPinned }, index) => {
                      return (
                        <SearchOption
                          onClick={() => {
                            handleOnSelect(name);
                          }}
                          as="li"
                          key={name}
                          value={name}
                        >
                          {isPinned && (
                            <Icon
                              name="flash"
                              className="mt-[.2rem] ml-[-3px] text-primary-500"
                              withoutTooltip
                            />
                          )}
                          {formattedName ?? name}
                          <KdbContainer>
                            <OptionsKdb>tab</OptionsKdb>
                            {index > 0 && (
                              <>
                                {"/"}
                                <OptionsKdb>enter</OptionsKdb>
                              </>
                            )}
                          </KdbContainer>
                        </SearchOption>
                      );
                    })}
              </SearchOptions>
            )}
          </>
        );
      }}
    </Combobox>
  );
}
