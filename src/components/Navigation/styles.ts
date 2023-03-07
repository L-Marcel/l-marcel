import { tf } from "tailwind-factory";

export const MobileNavLinkListItemContainer = tf(
  "li",
  `
  p-3
  rounded-2xl
`,
  {
    variants: {
      selected: {
        true: "bg-primary-500/30",
        false: "",
      },
    },
    defaultVariants: {},
  }
);

export const MobileNavLinkIconContainer = tf(
  "div",
  `
  rounded-xl
  p-3
`,
  {
    variants: {
      selected: {
        true: `
        dark:!bg-primary-600 
        !bg-primary-500 
        text-gray-600
      `,
        false: `
        bg-white-600 
        dark:bg-gray-600 
      `,
      },
    },
  }
);
