import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "dark",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn("eyebrow", align === "center" && "eyebrow--center")}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={90}>
        <Tag
          className={cn(
            "mt-5 font-heading",
            tone === "light" ? "text-white" : "text-ink"
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {text && (
        <Reveal delay={180}>
          <div
            className={cn(
              "mt-6 text-[17px] leading-relaxed",
              tone === "light" ? "text-white/70" : "text-ink-mute"
            )}
          >
            {text}
          </div>
        </Reveal>
      )}
    </div>
  );
}
