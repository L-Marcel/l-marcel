export interface HorizontalDividerProps {
  className?: string;
}

export function HorizontalDivider({ className }: HorizontalDividerProps) {
  return (
    <hr
      className={`w-full border-t-[2px] border-gray-600 dark:border-white-600 ${className}`}
    />
  );
}
