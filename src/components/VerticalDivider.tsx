export interface VerticalDividerProps {
  className?: string;
}

export function VerticalDivider({ className }: VerticalDividerProps) {
  return (
    <hr
      className={`h-full border-l-[2px] border-gray-600 dark:border-white-600 ${className}`}
    />
  );
}
