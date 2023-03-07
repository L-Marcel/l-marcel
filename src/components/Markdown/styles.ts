import { tf } from "tailwind-factory";

export const MarkdownH1Container = tf(
  "h1",
  `
  px-12  
  md:px-16
`
);

export const MarkdownPContainer = tf(
  "p",
  `
  px-12  
  md:px-16
`
);

export const MarkdownNavContainer = tf(
  "nav",
  `
  flex
  flex-1
  flex-row 
  items-center 
  gap-x-2
  gap-y-2 
  text-xl
  flex-wrap
  mt-4
  text-primary-500
  markdown-navigation
`
);

export const MarkdownBrContainer = tf(
  "br",
  `
  ignore-first-break
`
);

export const MarkdownPreMainContainer = tf(
  "div",
  `
  mx-12
  md:mx-16
  rounded-[15px]
  overflow-hidden
`
);

export const MarkdownPreContainer = tf(
  "pre",
  `
  w-[calc(100%+2rem)]
  bg-white-500
  px-5
  py-[0.875rem]
  dark:bg-gray-500
  scrollbar-thin 
  scrollbar-track-white-700 
  scrollbar-thumb-primary-500 
  dark:scrollbar-track-gray-600
  hover:scrollbar-thumb-primary-600
`
);

export const MarkdownDivContainer = tf(
  "div",
  `
  py-8
`,
  {
    variants: {
      highlight: {
        true: `
        bg-primary-500 
        force-white-text 
        text-4xl
        markdown-section-container
        first-of-type:with-description
      `,
        false: `
        bg-white-500 
        dark:bg-gray-600
        markdown-section-container
        first-of-type:with-description
      `,
      },
    },
  }
);

export const MarkdownCommonListContainer = tf(
  "div",
  `
  py-8
  markdown-section-container
  flex
`,
  {
    variants: {
      highlight: {
        true: `
        flex-row
        gap-2
        list-title
        text-white-500
        bg-primary-500
        force-white-text
        text-4xl
        mb-0
      `,
        false: `
        flex-col
        gap-6
        bg-white-500
        dark:bg-gray-600
        `,
      },
    },
  }
);

export const MarkdownListContainer = tf(
  "ul",
  `
  text-left
  list-container
  gap-[3px]
  flex
  flex-col
`
);

export const MarkdownListItemContainer = tf(
  "li",
  `
  text-lg
  2xl:text-xl
  flex
  flex-col
`
);

export const MarkdownOrderedListContainer = tf(
  "ol",
  `
  text-lg
  2xl:text-xl
  gap-[3px]
`
);

export const MarkdownGridContainer = tf(
  "div",
  `
  py-8
  markdown-section-container
  first-of-type:with-description
  bg-white-500 dark:bg-gray-600
  flex
  gap-x-10
  gap-y-8
  md:gap-x-16
  md:gap-y-8
  flex-wrap
  last-of-type:-mb-8
`
);

export const MarkdownH2Container = tf(
  "h2",
  `
  px-12  
  md:px-16
`
);

export const MarkdownGridItem = tf(
  "div",
  `
  text-left
  list-container
  list-container-div
  gap-[3px]
  flex
  flex-col
`
);
