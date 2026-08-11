import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "filled" | "brand" | "outlined" | "light" | "link";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  filled: "btn--filled",
  brand: "btn--brand",
  outlined: "btn--outlined",
  light: "btn--light",
  link: "btn--link",
};

const sizeClass: Record<Size, string> = {
  sm: "px-[34px] py-4",
  md: "",
  lg: "px-[67px] py-5",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function Button({
  children,
  variant = "filled",
  size = "md",
  className,
  ...rest
}: BaseProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button
      className={cn("btn", variantClass[variant], sizeClass[size], className)}
      {...rest}
    >
      <span className="btn-text">{children}</span>
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "filled",
  size = "md",
  className,
  ...rest
}: BaseProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "className" | "children" | "href"
  >) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  const content = <span className="btn-text">{children}</span>;
  const classes = cn("btn", variantClass[variant], sizeClass[size], className);

  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
