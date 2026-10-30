interface MonogramProps {
  size?: number;
  className?: string;
}

/** Inline "RK" monogram: rounded square in the accent colour with white letters. Matches public/favicon.svg. */
export function Monogram({ size = 32, className }: MonogramProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
        fontSize="14"
        fontWeight="800"
        letterSpacing="-0.5"
        className="fill-primary-foreground"
      >
        RK
      </text>
    </svg>
  );
}
