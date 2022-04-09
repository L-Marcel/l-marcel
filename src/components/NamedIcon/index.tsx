import { Icon as ChakraIcon, IconProps as ChakraIconProps } from "@chakra-ui/react";
import { 
  FaReact, FaDocker, FaGitAlt, 
  FaJava, FaPython, FaBalanceScale
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiGnubash, SiDart } from "react-icons/si";
import { DiCss3, DiSass } from "react-icons/di";
import { AiFillHtml5 } from "react-icons/ai";
import { RiFlutterFill, RiFilePaper2Line } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";
import { 
  AiOutlineCalendar, AiOutlineCheck
} from "react-icons/ai";
import { IoLogoJavascript } from "react-icons/io";
import { FiFigma, FiPaperclip} from "react-icons/fi";
import { GrNode } from "react-icons/gr";
interface IconProps extends ChakraIconProps {
  name?: string;
};

export const icons = {
  "react.js": FaReact,
  "node.js": GrNode,
  "typescript": SiTypescript,
  "next.js": SiNextdotjs,
  "react native": FaReact,
  "html": AiFillHtml5,
  "css": DiCss3,
  "sass": DiSass,
  "javascript": IoLogoJavascript,
  "docker": FaDocker,
  "flutter": RiFlutterFill,
  "java": FaJava,
  "git": FaGitAlt,
  "python": FaPython,
  "bash": SiGnubash,
  "default": BsQuestionCircle,
  "calendar": AiOutlineCalendar,
  "check": AiOutlineCheck,
  "figma": FiFigma,
  "self": FiPaperclip,
  "documentation": RiFilePaper2Line,
  "license": FaBalanceScale,
  "dart": SiDart
};

function NamedIcon({ name = "default", ...rest }: IconProps) {
  const _name = name.toLowerCase();
  const icon = icons[_name] ?? icons["default"];
  return (
    <ChakraIcon
      as={icon}
      {...rest}
    />
  );
};

export default NamedIcon;