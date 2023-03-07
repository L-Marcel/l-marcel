import { Combobox } from "@headlessui/react";
import { Icon } from "../Icon";
import { tf, removeWhiteSpaceInClasses } from "tailwind-factory";

export const SearchBox = tf(
  "div",
  `
  relative
  flex
  w-full 
  flex-col 
  justify-start
  max-w-xl
  z-40
`
);

export const SearchInputIcon = tf(
  Icon,
  `
  absolute
  h-full
  w-11
  rounded-md
  p-[8.2px]
  pl-[6.2px]
  border-l-2
  border-l-primary-500
`,
  {
    variants: {
      isFocused: {
        true: `
        bg-primary-500
        dark:bg-primary-500
        !text-white-500
        dark:!text-gray-700
      `,
        false: `
        bg-white-700
        dark:bg-gray-400
        !text-gray-700
        dark:!text-white-500
      `,
      },
    },
  }
);

export const comboboxInputClassName = removeWhiteSpaceInClasses(`
  rounded-md
  pl-14
  pr-2
  py-2
  text-gray-700
  dark:text-white-500
  bg-white-500
  dark:bg-gray-500
  ring-offset-[3px]
  dark:ring-offset-gray-700
  ring-offset-white-default
  focus:ring-2
  focus:ring-primary-500
  focus-visible:ring-2
  focus-visible:!text-gray-700
  focus-visible:dark:!text-white-500
  focus-visible:ring-primary-500
  focus-visible:!bg-white-500
  focus-visible:dark:!bg-gray-500
  placeholder:text-white-800
  placeholder:dark:text-white-800
  border-r-2
  border-r-white-700
  dark:border-r-gray-400
  focus-visible:border-r-primary-500
  focus-visible:dark:border-r-primary-500
  w-full
`);

export const SearchOptions = tf(
  Combobox.Options,
  `
  absolute
  top-12
  z-40
  flx
  flex-col
  border-t-2
  border-t-primary-500
  rounded-l-md
  my-4
  py-1
  gap-1
  bg-white-500
  dark:bg-gray-600
  w-full
  max-h-[50vh]
  h-max
  overflow-y-auto
  overflow-x-hidden
  border-b-2
  border-b-white-700
  dark:border-b-gray-400
  scrollbar-thin 
  scrollbar-track-white-700 
  scrollbar-thumb-primary-500 
  dark:scrollbar-track-gray-500
  hover:scrollbar-thumb-primary-600
`
);

export const SearchOption = tf(
  Combobox.Option,
  `
  flex
  flex-row
  items-start
  gap-1
  px-4
  py-[5px]
  cursor-pointer
  hover:bg-white-600
  hover:dark:bg-gray-400
  capitalize
  border-b-2
  border-b-white-700
  dark:border-b-gray-500
  last-of-type:border-none
  actived-search-option
`
);

export const PaginationInputContainer = tf(
  "input",
  `
  w-12
  px-1
  text-center
  appearance-[textfield]
  dark:opacity-80
  text-gray-600
  dark:text-white-500
  bg-white-700
  dark:bg-gray-400
  focus:!bg-primary-500
  focus:dark:!bg-primary-500
  focus-visible:!bg-primary-500
  focus-visible:dark:!bg-primary-500
`
);

export const CheckboxLabel = tf(
  "p",
  `
  text-base
`,
  {
    variants: {
      isEnabled: {
        true: "",
        false: `
      line-through
      text-gray-default
      dark:text-gray-default
      `,
      },
    },
  }
);

export const CheckboxDisabledLabel = tf(
  "p",
  `
  text-base
  italic
  xs:hidden
  text-gray-default
  dark:text-gray-default
`
);

export const KdbContainer = tf(
  "div",
  `
  ml-auto 
  pl-5
  hidden
  md:inline
`
);

export const OptionsKdb = tf(
  "kbd",
  `
  mx-1
  lowercase
  bg-gray-700
  rounded-lg
  px-[5px]
  py-[1.2px]
`
);
