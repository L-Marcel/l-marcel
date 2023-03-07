import { IconType } from "../components/Icon";

export type TechnologyLevelType = {
  isPrimary?: boolean;
  name: IconType | string;
  level: number;
};

export interface TechnologiesConstants {
  levels: TechnologyLevelType[];
  utilities: IconType[];
  libraries: IconType[];
}

export const technologies: TechnologiesConstants = {
  levels: [
    {
      isPrimary: true,
      name: "Next.js",
      level: 8,
    },
    {
      name: "React.js",
      level: 8,
    },
    {
      name: "Node.js",
      level: 6,
    },
    {
      name: "Typescript",
      level: 7,
    },
    {
      name: "Javascript",
      level: 8,
    },
    {
      name: "CSS",
      level: 7,
    },
    {
      name: "HTML",
      level: 8,
    },
    {
      name: "Git",
      level: 6,
    },
  ],
  utilities: ["vscode", "npm", "yarn", "jamstack", "figma", "docker", "gitbook"],
  libraries: [
    "prisma",
    "jest",
    "socket.io",
    "chakra-ui",
    "json-web-tokens",
    "framer-motion",
    "tailwind",
  ],
};
