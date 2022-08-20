import tw from "tw-tailwind";

export const MarkdownH1Container = tw.h1`
  px-12  
  md:px-16
`;

export const MarkdownPContainer = tw.p`
  px-12  
  md:px-16
`;

export const MarkdownAContainer = tw.a``;

export const MarkdownNavContainer = tw.nav`
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
`;

export const MarkdownBrContainer = tw.br`
  ignore-first-break
`;

export const MarkwodnPreContainer = tw.pre`
  mx-12
  md:mx-16
  rounded-[15px]
  overflow-hidden
`;

export const MarkdownCodeContainer = tw.code`
  w-[calc(100%+2rem)]
  bg-white-500
  px-5
  flex
  py-[0.875rem]
  dark:bg-gray-500
  scrollbar-thin 
  scrollbar-track-white-700 
  scrollbar-thumb-primary-500 
  dark:scrollbar-track-gray-600
  hover:scrollbar-thumb-primary-600
`;

export interface MarkdownDivContainerProps {
  $highlight: boolean;
}

export const MarkdownDivContainer = tw.div<MarkdownDivContainerProps>`
  py-8
  ${props => props.$highlight? 
    "bg-primary-500 force-white-text text-4xl":
    "bg-white-500 dark:bg-gray-600"}
  markdown-section-container
  first-of-type:with-description
`;

export const MarkdownListContainer = tw.ul`
  text-left
  list-container
  gap-[3px]
  flex
  flex-col
`;

export const MarkdownListItemContainer = tw.li`
  text-lg
  2xl:text-xl
  flex
  flex-col
`;

export const MarkdownOrderedListContainer = tw.ol`
  text-lg
  2xl:text-xl
  gap-[3px]
`;

export const MarkdownGridContainer = tw.div`
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
`;

export const MarkdownH2Container = tw.h2`
  px-12  
  md:px-16
`;