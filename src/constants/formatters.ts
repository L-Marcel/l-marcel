import { Formatter } from "../services/classes/Github";

export const formatters: Formatter[] = [
  {
    regex: "exe-classwork",
    replace: "Exe: Classwork",
  },
  {
    regex: "-",
    replace: " ",
  },
  {
    regex: "_",
    replace: " ",
  },
  {
    regex: "ignite",
    replace: "ignite ->",
  },
  {
    regex: "reactjs",
    replace: "/",
  },
  {
    regex: "nodejs",
    replace: "/",
  },
  {
    regex: "react native",
    replace: "/ native /",
  },
  {
    regex: "/ 2022",
    replace: "/ 2022 /",
  },
  {
    regex: "/ 2023",
    replace: "/ 2023 /",
  },
  {
    regex: "/ 2024",
    replace: "/ 2024 /",
  },
];
