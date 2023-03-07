import { IconButton } from "./IconButton";
import { tf } from "tailwind-factory";

export const ButtonContainer = tf(
  "button",
  `
  px-4
  md:px-6
`,
  {
    variants: {
      size: {
        lg: `
        text-[2.125rem] 
        h-[2.8125rem]
      `,
        md: `
        h-[2.8125rem]
      `,
        sm: `
        text-xl
        h-8
        md:text-2xl
        md:h-10
        md:px-5
      `,
      },
      selected: {
        true: `
        bg-primary-500
        text-gray-700
        dark:bg-primary-500
        dark:text-gray-700
      `,
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
    },
  }
);

export const IconButtonContainer = tf("button", "", {
  variants: {
    size: {
      md: `
        h-[2.8125rem]
        w-[2.8125rem]
        p-[0.6875rem]
      `,
      sm: `
        h-[2.4rem] 
        w-[2.4rem] 
        p-[0.48rem]
      `,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const PaginationIconButtonContainer = tf(
  IconButton,
  `
  !p-0
  flex 
  h-9 
  flex-row 
  items-center 
  justify-center 
  rounded-none
  disabled:opacity-50
  disabled:dark:opacity-50
  disabled:pointer-events-none
  disabled:dark:pointer-events-none
`
);

export const SpecialPaginationIconButtonContainer = tf(
  IconButton,
  `
  !p-0
  flex
  h-9 
  flex-row 
  items-center 
  justify-center
  disabled:opacity-50
  disabled:dark:opacity-50
  disabled:pointer-events-none
  disabled:dark:pointer-events-none
  bg-primary-500
  dark:bg-primary-500
  !text-gray-700 
  dark:!text-white-500
  md:hover:bg-primary-600
  md:dark:hover:!text-white-500
  md:dark:hover:bg-primary-600
  active:opacity-80
  active:dark:opacity-80
  focus-visible:ring-2
  dark:ring-offset-gray-900
  focus-visible:ring-offset-2
  focus-visible:ring-primary-600
`
);

export const ReturnButtonContainer = tf(
  "button",
  `
  mb-3
  !bg-transparent
  text-gray-500
  hover:text-gray-700
  dark:text-white-500
  dark:hover:text-white-700
  italic
  underline-offset-3
  hover:underline
  focus-visible:dark:text-white-700
  focus-visible:text-gray-700
  focus-defined
`
);
