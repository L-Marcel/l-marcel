import tw from "tw-tailwind";
import { IconButton, IconButtonProps } from "../Button/IconButton";

export const FilterMenuContainer = tw.section`
  w-full 
  px-12
  md:px-16
  py-6
  max-w-full
  gap-6
  flex
  flex-row
  flex-wrap
  overflow-y-auto
  -mb-4
`;

export const FilterMenuGroupContainer = tw.ul`
  flex
  flex-row
  items-center
  w-full
  flex-wrap
  justify-start
  gap-2
  relative
`;

export interface ToggleFilterMenuButtonContainerProps extends IconButtonProps {
  $open: boolean;
}

export const ToggleFilterMenuButtonContainer = tw(
  IconButton
)<ToggleFilterMenuButtonContainerProps>`
  active:!text-gray-700
  rounded-full
  border-4
  border-white-600
  dark:border-gray-600
  flex
  flex-row
  justify-center
  items-center
  w-[3.5rem]
  h-[3.5rem]
  !text-gray-700
  !bg-primary-500
  dark:!bg-primary-500
  fixed
  bottom-0
  ml-[-0.6rem]
  mb-[1rem]
  z-[100]
  md:m-0
  md:border-none
  md:z-0
  md:relative
  md:w-[2.4rem]
  md:h-[2.4rem]
  md:rounded-md
  ${(props) => {
    return props.$open
      ? "md:!bg-primary-500 md:dark:!bg-primary-500 md:!text-gray-700 md:dark:!text-gray-700 md:hover:dark:!bg-primary-600 md:hover:!bg-primary-600"
      : "md:!bg-white-600 md:dark:!bg-gray-500 md:!text-gray-700 md:dark:!text-white-600 md:hover:!bg-white-700 md:hover:dark:!bg-gray-600";
  }}
`;

export const ToggleFilterMenuButtonContainerLabel = tw.label`
  -ml-1
  hidden
  text-lg
  capitalize
  italic
  text-gray-default
  dark:text-gray-default
  md:block
  cursor-pointer
`;

export interface ProgressRangeLabelProps {
  isEnabled: boolean;
}

export const ProgressRangeLabelBox = tw.div`
  align-baseline 
  mb-1 
  -top-3
  w-fit
  pb-[2px]
  px-3
  flex
  flex-row
  gap-2
  rounded-lg
  absolute
  bg-white-600
  dark:bg-gray-400
`;

export const ProgressRangeLabel = tw.label<ProgressRangeLabelProps>`
  text-gray-600
  dark:text-white-600
  text-base ${(props) => {
    return props.isEnabled ? "" : "line-through text-gray-default dark:text-gray-default";
  }}
`;

export const ProgressRangeDisabledLabel = tw.p`
  text-base
  italic
  xs:hidden
  text-gray-default
  dark:text-gray-default
`;
