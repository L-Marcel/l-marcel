import tw from "tw-tailwind";
import { IconButton } from "./IconButton";

export type ButtonSize = "lg" | "md" | "sm";
export interface ButtonContainerProps {
  size: ButtonSize;
  selected: boolean;
}

export const ButtonContainer = tw.button<ButtonContainerProps>`
  px-4
  md:px-6
  ${(props) => {
    return props.size === "lg"
      ? "text-[2.125rem] h-[2.8125rem]"
      : props.size === "sm"
      ? "text-xl h-8 md:text-2xl md:h-10 md:px-5"
      : "h-[2.8125rem]";
  }}
  ${(props) => {
    return props.selected
      ? "bg-primary-500 text-gray-700 dark:bg-primary-500 dark:text-gray-700"
      : "";
  }}
`;

export type IconButtonSize = "md" | "sm";
export interface IconButtonContainerProps {
  size: ButtonSize;
}

export const IconButtonContainer = tw.button<IconButtonContainerProps>`
  ${(props) => {
    return props.size === "md"
      ? "h-[2.8125rem] w-[2.8125rem] p-[0.6875rem]"
      : "h-[2.4rem] w-[2.4rem] p-[0.48rem]";
  }}
`;

export const PaginationIconButtonContainer = tw(IconButton)`
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
`;

export const SpecialPaginationIconButtonContainer = tw(PaginationIconButtonContainer)`
  bg-primary-500
  dark:bg-primary-500
  !text-gray-700 
  md:hover:!sr-onlytext-white-500
  md:hover:bg-primary-600
  md:dark:hover:!text-white-500
  md:dark:hover:bg-primary-600
  active:opacity-80
  active:dark:opacity-80
  focus-visible:ring-2
  dark:ring-offset-gray-900
  focus-visible:ring-offset-2
  focus-visible:ring-primary-600
`;

export const ReturnButtonContainer = tw.button`
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
`;
