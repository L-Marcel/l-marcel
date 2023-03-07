import { IconButton } from "../Button/IconButton";
import { tf } from "tailwind-factory";

export const TimelineElementTimerContainer = tf(
  "time",
  `
  absolute 
  right-5 
  bottom-[-12px] 
  whitespace-nowrap 
  rounded-md 
  border-x-2 
  border-x-primary-500 
  bg-white-500 
  px-2 
  text-base 
  text-gray-700 
  shadow-sm 
  dark:bg-gray-600 
  dark:text-white-700 
  md:shadow-lg
`
);

export const TimelineElementDownloadButton = tf(
  IconButton,
  `
  flex 
  flex-row 
  items-center 
  justify-center 
  rounded-md
  text-white-500
  dark:text-gray-700
  bg-primary-500
  dark:bg-primary-500
  hover:bg-primary-600
  hover:text-white-500
  hover:dark:text-gray-700
  hover:dark:bg-primary-600
  active:text-white-500
  active:dark:text-gray-700
`
);

export const TimelineElementCodeContainer = tf(
  "code",
  `
  relative
  whitespace-nowrap
  px-2
  py-1
  rounded-md
  overflow-hidden
  bg-white-600
  dark:bg-gray-600
  flex
  pr-14
`
);

export const TimelineElementCodeCopyButton = tf(
  "button",
  `
  absolute
  top-0
  bottom-0
  right-0
  h-full
  w-min
  rounded-none
  flex-1
  py-0
  gap-3
  px-3
  bg-white-700
  dark:bg-gray-400
  flex
  flex-row
  items-center
`,
  {
    variants: {
      isNotPtBr: {
        true: `
        timeline-code-en-us
      `,
        false: `
        timeline-code-pt-br
      `,
      },
    },
  }
);
