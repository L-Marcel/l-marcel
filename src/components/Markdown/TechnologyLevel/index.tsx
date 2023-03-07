import { motion } from "framer-motion";
import { LevelBlock } from "./LevelBlock";

export interface TechnologyLevelProps {
  technology: string;
  level: number;
  max: number;
}

export function TechnologyLevel({ technology, level, max }: TechnologyLevelProps) {
  const levels = [];

  for (let i = 0; i < max; i++) {
    levels.push(
      <LevelBlock
        key={`tech-${technology}-${i}`}
        isActived={i < level}
        levelIsLow={i < 2}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3>{technology}</h3>
      <motion.div
        className="flex flex-row gap-3"
        initial="disabled"
        whileInView="visible"
        variants={{
          disabled: {},
          visible: {
            transition: {
              delayChildren: 0.05,
              staggerChildren: 0.05,
            },
          },
        }}
      >
        {levels}
      </motion.div>
    </div>
  );
}
