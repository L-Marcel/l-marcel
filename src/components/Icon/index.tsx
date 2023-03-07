import { IconBaseProps } from "react-icons";
import { BiCubeAlt, BiGitRepoForked, BiSearchAlt } from "react-icons/bi";
import {
  BsCheck2Circle,
  BsClockHistory,
  BsDownload,
  BsFillPatchQuestionFill,
  BsXLg,
} from "react-icons/bs";
import {
  FaAlignRight,
  FaBalanceScale,
  FaGitAlt,
  FaGoogleDrive,
  FaMoon,
  FaSun,
  FaJava,
} from "react-icons/fa";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiCopy,
  FiPaperclip,
} from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";
import { HiArrowSmLeft, HiOutlineAdjustments, HiTemplate } from "react-icons/hi";
import { IoIosSchool, IoMdOpen } from "react-icons/io";
import {
  SiAngular,
  SiChakraui,
  SiCplusplus,
  SiCsharp,
  SiCss3,
  SiDiscord,
  SiDocker,
  SiFigma,
  SiFramer,
  SiGitbook,
  SiGithub,
  SiHtml5,
  SiInstagram,
  SiJamstack,
  SiJavascript,
  SiJest,
  SiJsonwebtokens,
  SiLinkedin,
  SiMaildotru,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPrisma,
  SiPython,
  SiReact,
  SiRust,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVisualstudiocode,
  SiWhatsapp,
  SiYarn,
} from "react-icons/si";
import { TiFlash } from "react-icons/ti";
import { VscSymbolKeyword, VscSymbolMethod } from "react-icons/vsc";
import { Tooltip } from "../Tooltip";
import { AsRocketseat } from "./assets/AsRocketseat";
import { DiAndroid, DiApple } from "react-icons/di";
import { AiTwotoneExperiment } from "react-icons/ai";

const languagesAndFrameworks = {
  "next.js": SiNextdotjs,
  "react.js": SiReact,
  "react native": SiReact,
  "node.js": SiNodedotjs,
  "nest.js": SiNestjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  css: SiCss3,
  html: SiHtml5,
  git: FaGitAlt,
  angular: SiAngular,
  rust: SiRust,
  java: FaJava,
  "c++": SiCplusplus,
  "c#": SiCsharp,
  python: SiPython,
};

const arrows = {
  returnLeftArrow: HiArrowSmLeft,
  leftArrow: FiChevronLeft,
  leftArrows: FiChevronsLeft,
  rightArrow: FiChevronRight,
  rightArrows: FiChevronsRight,
};

const icons = {
  download: BsDownload,
  sun: FaSun,
  moon: FaMoon,
  clock: BsClockHistory,
  vscode: SiVisualstudiocode,
  npm: SiNpm,
  yarn: SiYarn,
  jamstack: SiJamstack,
  figma: SiFigma,
  android: DiAndroid,
  ios: DiApple,
  docker: SiDocker,
  gitbook: SiGitbook,
  "json-web-tokens": SiJsonwebtokens,
  prisma: SiPrisma,
  "framer-motion": SiFramer,
  jest: SiJest,
  "socket.io": SiSocketdotio,
  "chakra-ui": SiChakraui,
  tailwind: SiTailwindcss,
  checked: BsCheck2Circle,
  menu: FaAlignRight,
  whatsapp: SiWhatsapp,
  linkedin: SiLinkedin,
  github: SiGithub,
  discord: SiDiscord,
  instagram: SiInstagram,
  rocketseat: AsRocketseat,
  mail: SiMaildotru,
  x: BsXLg,
  resume: VscSymbolKeyword,
  projects: VscSymbolMethod,
  achievements: GiSpellBook,
  school: IoIosSchool,
  cube: BiCubeAlt,
  clip: FiPaperclip,
  copy: FiCopy,
  drive: FaGoogleDrive,
  open: IoMdOpen,
  search: BiSearchAlt,
  filter: HiOutlineAdjustments,
  experience: AiTwotoneExperiment,

  ...languagesAndFrameworks,

  default: BsFillPatchQuestionFill,

  ...arrows,

  self: IoMdOpen,
  documentation: FiPaperclip,
  license: FaBalanceScale,
  flash: TiFlash,
  fork: BiGitRepoForked,
  template: HiTemplate,
};

export type IconType = keyof typeof icons;
export type IconSize = "sm" | "md";
export interface IconProps extends IconBaseProps {
  name?: IconType;
  size?: IconSize;
  label?: string;
  tooltip?: string;
  withoutTooltip?: boolean;
  tooltipClassName?: string;
  tooltipContainerClassName?: string;
  isFocused?: boolean;
}

export function Icon({
  name = "download",
  size = "sm",
  withoutTooltip = false,
  tooltipClassName,
  label,
  tooltipContainerClassName,
  isFocused = false,
  className,
  ...rest
}: IconProps) {
  if (!icons[name]) {
    name = "default";
  }

  const icon = icons[name]({
    className:
      "drop-shadow-sm md:drop-shadow-lg " +
      (size === "sm"
        ? "text-[1.4rem] md:text-[1.4125rem] "
        : "text-[1.6rem] md:text-4xl ") +
      (isFocused ? "text-primary-700 " : "") +
      className,
    ...rest,
  });

  if (withoutTooltip) {
    return icon;
  }

  return (
    <Tooltip
      label={label ?? name}
      className={tooltipClassName}
      containerClassName={tooltipContainerClassName}
    >
      {icon}
    </Tooltip>
  );
}
