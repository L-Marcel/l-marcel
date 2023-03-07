import { tf } from "tailwind-factory";

export const ColumnContainer = tf(
  "div",
  `
  flex 
  h-fit 
  w-full 
  flex-row 
  flex-wrap 
  content-start 
  gap-3
`
);

export const ExpansibleItem = tf(
  "div",
  `
  flex 
  h-full 
  min-h-[6px]
  w-full 
  rounded-md 
  bg-white-400 
  dark:bg-gray-600 
  dark:opacity-50
`
);

export const ListColumnContainer = tf(
  "li",
  `
  flex 
  h-[initial] 
  w-full 
  flex-col 
  gap-3
`
);
