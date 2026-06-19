import { cn } from "@saas-boilerplate/ui/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: "lg" | "sm" | "xl";
};

const sizeClasses = {
  sm: "size-6",
  lg: "size-9",
  xl: "size-12",
};

export function BrandLogo({ className, size = "lg" }: BrandLogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground",
        sizeClasses[size],
        className,
      )}
    >
      <span className="font-semibold text-[0.6em] tracking-normal">SB</span>
    </span>
  );
}
