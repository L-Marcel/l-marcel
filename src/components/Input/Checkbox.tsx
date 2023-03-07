import { motion, useMotionValue, useTransform } from "framer-motion";
import { ChangeEvent } from "react";
import { CheckboxDisabledLabel, CheckboxLabel } from "./styles";
import { useTranslation } from "next-i18next";

export interface CheckboxProps {
  label?: string;
  disabledLabel?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (isChecked: boolean) => void;
  className?: string;
}

export function Checkbox({
  label,
  disabledLabel,
  checked,
  indeterminate = false,
  onChange,
  className,
}: CheckboxProps) {
  const { t } = useTranslation("projects");

  const isChecked = checked;
  const isIndeterminate = !isChecked && indeterminate;
  const isEnabled = isChecked || isIndeterminate;

  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  function handleOnChange(ev: ChangeEvent<HTMLInputElement>) {
    onChange && onChange(ev.currentTarget.checked);
  }

  return (
    <motion.label
      className={
        "checkbox flex h-fit w-fit cursor-pointer flex-row items-center gap-2 " +
        className
      }
      initial={isChecked ? "checked" : isIndeterminate ? "indeterminate" : "unchecked"}
      animate={isChecked ? "checked" : isIndeterminate ? "indeterminate" : "unchecked"}
      whileTap="pressed"
      variants={{
        pressed: {
          transition: {
            duration: 0.3,
            delayChildren: 0,
            staggerChildren: 0,
          },
        },
        checked: {
          transition: {
            duration: 0.3,
            delayChildren: 0,
            staggerChildren: 0,
          },
        },
        unchecked: {
          transition: {
            duration: 0.3,
            delayChildren: 0,
            staggerChildren: 0,
          },
        },
        indeterminate: {
          transition: {
            duration: 0.3,
            delayChildren: 0,
            staggerChildren: 0,
          },
        },
      }}
    >
      <input
        className="hidden h-0 w-0"
        type="checkbox"
        name={label}
        id={label}
        checked={isChecked}
        onChange={handleOnChange}
      />
      <motion.span>
        <motion.div
          className={`checkbox-input w-fit rounded-xl p-2 ${
            isEnabled ? "checkbox-checked-input" : "checkbox-unchecked-input"
          }`}
        >
          <motion.svg
            initial={false}
            className={"h-[0.9rem] w-[0.9rem] rounded-xl text-gray-600"}
            strokeWidth="2px"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 12 10"
          >
            {isIndeterminate ? (
              <motion.line
                x1="10%"
                x2="90%"
                y1="5"
                y2="5"
                variants={{
                  pressed: {
                    pathLength: 0.85,
                    x: 1.5,
                    rotate: 130,
                  },
                  indeterminate: { pathLength: 1 },
                  unchecked: { pathLength: 0 },
                }}
                style={{ pathLength, opacity }}
              />
            ) : (
              <motion.polyline
                points="1.5 6 4.5 9 10.5 1"
                variants={{
                  pressed: (isChecked: boolean) => {
                    return { pathLength: isChecked ? 0.85 : 0.2 };
                  },
                  checked: { pathLength: 1 },
                  unchecked: { pathLength: 0 },
                }}
                style={{ pathLength, opacity }}
                custom={isEnabled}
              />
            )}
          </motion.svg>
        </motion.div>
      </motion.span>
      {label && (
        <CheckboxLabel isEnabled={isEnabled}>{t(`checkbox.${label}`)}</CheckboxLabel>
      )}
      {disabledLabel && !isEnabled && (
        <CheckboxDisabledLabel>{t(`checkbox.${disabledLabel}`)}</CheckboxDisabledLabel>
      )}
    </motion.label>
  );
}
