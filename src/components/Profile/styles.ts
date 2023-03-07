import tw from "tw-tailwind";

export const ProfileArticleContainer = tw.article`
  flex 
  flex-row 
  items-center 
  px-4 
  pb-3 
  pt-[2.15rem] 
  md:px-16 
  md:pb-8 
  md:pt-[4.43rem]
  bg-developer 
`;

export const ProfileAvatarContainer = tw.div`
  mr-4 
  h-[40px] 
  w-[40px] 
  rounded-full 
  md:mr-8 
  md:flex 
  md:h-[190px] 
  md:w-[190px] 
  2xl:h-[250px] 
  2xl:w-[250px]
`;

export const ProfileTimerContainer = tw.div`
  mt-[0.1rem] 
  flex 
  flex-row 
  items-start 
  gap-2 
  text-gray-500 
  dark:text-white-600 
  md:mt-4
`;
