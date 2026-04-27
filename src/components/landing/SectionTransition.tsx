import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Visual variant of the cinematic transition between sections */
  variant?: "veil" | "sweep" | "tear" | "zoom";
  /** If true, renders an extra dark divider above the section */
  dark?: boolean;
}

/**
 * SectionTransition wraps a section with cinematic scroll-driven
 * transitions: a top reveal mask, a gold sweeping line, parallax content,
 * and a smooth fade-out as the user scrolls past.
 */
const SectionTransition = ({
  children,
  id,
  className = "",
  variant = "veil",
  dark = false,
}: SectionTransitionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax & opacity for the inner content
  const contentY = useTransform(scrollYProgress, [0, 0.5, 1], ["8%", "0%", "-6%"]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0.4]
  );
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.99]);

  // Top curtain that lifts as section enters
  const curtainY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-100%"]);
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Bottom curtain that drops as section exits
  const exitVeil = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  // Gold sweep line
  const sweepX = useTransform(scrollYProgress, [0.05, 0.45], ["-20%", "120%"]);
  const sweepOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.45], [0, 1, 0]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden isolate ${className}`}
    >
      {/* Top reveal curtain */}
      <CurtainTop
        variant={variant}
        y={curtainY}
        opacity={curtainOpacity}
        dark={dark}
      />

      {/* Edge glow line at top */}
      <motion.div
        style={{ opacity: sweepOpacity }}
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent z-20 pointer-events-none"
      />

      {/* Sweeping gold beam */}
      <motion.div
        style={{ x: sweepX, opacity: sweepOpacity }}
        className="absolute top-0 h-full w-[20%] -skew-x-12 z-10 pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-gold/15 to-transparent blur-2xl" />
      </motion.div>

      {/* Parallax content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-0"
      >
        {children}
      </motion.div>

      {/* Bottom exit veil */}
      <motion.div
        style={{ opacity: exitVeil }}
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-20"
      />
    </section>
  );
};

/* ---------- Curtain variants ---------- */

const CurtainTop = ({
  variant,
  y,
  opacity,
  dark,
}: {
  variant: SectionTransitionProps["variant"];
  y: MotionValue<string>;
  opacity: MotionValue<number>;
  dark: boolean;
}) => {
  const baseColor = dark ? "hsl(0 0% 4%)" : "hsl(var(--background))";

  if (variant === "sweep") {
    return (
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-x-0 top-0 h-[60vh] z-30 pointer-events-none"
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(180deg, ${baseColor} 0%, ${baseColor} 60%, transparent 100%)`,
          }}
        />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </motion.div>
    );
  }

  if (variant === "tear") {
    return (
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-x-0 top-0 h-[55vh] z-30 pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="tearGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={baseColor} stopOpacity="1" />
              <stop offset="80%" stopColor={baseColor} stopOpacity="1" />
              <stop offset="100%" stopColor={baseColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 L1440,0 L1440,320 C1200,360 960,300 720,340 C480,380 240,310 0,350 Z"
            fill="url(#tearGrad)"
          />
          <path
            d="M0,350 C240,310 480,380 720,340 C960,300 1200,360 1440,320"
            fill="none"
            stroke="hsl(var(--gold) / 0.6)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    );
  }

  if (variant === "zoom") {
    return (
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-30 pointer-events-none"
      >
        <motion.div
          style={{ y }}
          className="w-full h-[60vh]"
        >
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(ellipse 100% 70% at 50% 0%, ${baseColor} 0%, ${baseColor} 50%, transparent 100%)`,
            }}
          />
        </motion.div>
      </motion.div>
    );
  }

  // veil (default)
  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute inset-x-0 top-0 h-[50vh] z-30 pointer-events-none"
      aria-hidden
    >
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(180deg, ${baseColor} 0%, ${baseColor} 50%, transparent 100%)`,
        }}
      />
    </motion.div>
  );
};

export default SectionTransition;
