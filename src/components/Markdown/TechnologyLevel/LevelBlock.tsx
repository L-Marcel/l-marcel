import { motion } from "framer-motion";

export interface LevelBlockProps {
  isActived?: boolean;
  levelIsLow?: boolean;
}

export function LevelBlock({ isActived = false, levelIsLow = false }: LevelBlockProps) {
  return (
    <div className="h-7 w-3 bg-white-600 shadow-sm dark:bg-gray-500 md:h-11 md:w-4 md:shadow-lg 2xl:h-12 2xl:w-5">
      {isActived && (
        <motion.div
          className="h-full w-full"
          variants={{
            disabled: {
              backgroundColor: levelIsLow ? "#2A7B8800" : "#2093a500",
            },
            visible: {
              backgroundColor: levelIsLow ? "#2A7B88" : "#2093a5",
            },
          }}
        />
      )}
    </div>
  );
}
