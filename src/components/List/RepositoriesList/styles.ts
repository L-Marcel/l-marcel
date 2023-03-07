import { Icon } from "../../Icon";
import { tf } from "tailwind-factory";

export const RepositoriesListItemContainer = tf(
  "article",
  `
  relative
  w-full
  text-gray-600
  dark:text-white-600
  p-4
  bg-white-500
  dark:bg-gray-500
  gap-1
  rounded-md
  flex
  flex-col
  repository-list-item
  cursor-pointer
  ring-primary-500
  ring-offset-white-500
  dark:ring-offset-gray-500
  ring-offset-2
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:!bg-white-500
  focus-visible:dark:!bg-gray-500
`,
  {
    variants: {
      filtered: {
        true: "opacity-100",
        false: "opacity-20",
      },
    },
  }
);

export const RepositoriesListItemBackgroundIcon = tf(
  Icon,
  `
  absolute
  right-[-12px]
  bottom-[-12px]
  !text-[5rem]
  text-white-700
  dark:text-gray-400
  !drop-shadow-none
  z-0
  repository-list-item-tech
`
);

export const RepositoriesListItemHeaderContainer = tf(
  "header",
  `
  repository-list-item-title 
  flex 
  w-full 
  flex-row 
  justify-between 
  gap-4 
  pr-8
`
);

export const RepositoriesListItemHeaderIconContainer = tf(
  "div",
  `
  absolute 
  top-2 
  right-2 
  z-30
  mt-[-0.25rem] 
  mr-[-0.25rem] 
  flex 
  rounded-full 
  bg-white-500 
  p-2 
  dark:bg-gray-500
`
);

export const RepositoriesListItemHeaderTitle = tf(
  "h3",
  `
  text-break-word
  relative 
  z-10 
  mt-[-4px] 
  whitespace-pre-wrap 
  capitalize 
  leading-6
  md:leading-7
`
);

export const RepositoriesListItemDescription = tf(
  "p",
  `
  relative 
  z-10 
  text-[1.1rem] 
  font-light 
  leading-5
  mb-1
`
);

export const RepositoriesListItemProgressContainer = tf(
  "div",
  `
  mt-4
  flex
  h-2
  w-full
  flex-row
  gap-[3px]
  overflow-hidden
  rounded-md
  bg-white-600
  shadow-inner
  dark:bg-gray-700
`
);

export const RepositoriesListItemProgressItem = tf(
  "div",
  `
  h-full
  w-[5%]
`,
  {
    variants: {
      actived: {
        true: `
        bg-gray-600
        dark:bg-white-600
        repository-list-item-group
        `,
        false: `
        bg-transparent
      `,
      },
    },
  }
);

export const RepositoriesListSectionContainer = tf(
  "section",
  `
  relative
  mx-12
  my-5
  flex
  flex-1
  flex-col
  items-start
  gap-4
  justify-self-start
  md:mx-16
  -mb-4
`
);
