import tw from "tw-tailwind";

export interface MobileNavLinkListItemContainerProps {
  selected: boolean;
}

export interface MobileNavLinkIconContainerProps {
  selected: boolean;
}

export const MobileNavLinkListItemContainer = tw.li<MobileNavLinkListItemContainerProps>`
  p-3
  rounded-2xl
  ${(props) => {
    return props.selected ? "bg-primary-500/30" : "";
  }}
`;

export const MobileNavLinkIconContainer = tw.div<MobileNavLinkIconContainerProps>`
  rounded-xl
  p-3
  ${(props) => {
    return props.selected
      ? "dark:!bg-primary-600 !bg-primary-500 text-gray-600"
      : "bg-white-600 dark:bg-gray-600 ";
  }}
`;
