import tw from "tw-tailwind";

export const MobileMenuNavigationContainer = tw.div`
  fixed
  flex
  w-full
  md:hidden
  bg-primary-600 
  bottom-0 
  pb-[3rem]
  z-[90]
  border-t-4
  border-t-white-600
  dark:border-t-gray-600
`;

export const MobileMenuSideBar = tw.aside`
  absolute
  right-0
  w-1/2
  border-t-[3rem]
  border-t-primary-500
  border-l-[110px]
  border-l-transparent
`;

export const MobileMenuContainer = tw.div`
  absolute
  top-[-3rem]
  right-[calc(120px-2rem)]
`;

export const MobileToggleThemeIconButton = tw.button`
  absolute
  top-[-1.4rem]
  left-[-1.9rem]
  z-40
  rounded-full
  bg-primary-500
  dark:bg-primary-500
  !text-gray-700
  border-4
  border-white-600
  dark:border-gray-600
  w-[3rem]
  h-[3rem]
  flex
  flex-row
  justify-center
  items-center
`;

export const MobileMenuMainButton = tw.button`
  absolute
  top-[-2.8rem]
  flex
  flex-row
  justify-center
  items-center
  rotate-180
  -scale-x-100
  w-[4.8rem]
  h-[4.8rem]
  rounded-full
  bg-primary-500
  dark:bg-primary-500
  !text-gray-700
  border-8
  border-white-600
  dark:border-gray-600
  text-xl
  pb-[1px]
`;

export const MobileMenuContentContainer = tw.div`
  h-full
  w-full 
  bg-white-500
  dark:bg-gray-700
  dark:border-b-gray-600
  border-b-4
  mb-24
  rounded-t-2xl
  overflow-hidden
`;