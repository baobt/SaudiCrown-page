import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealKind = "up" | "down" | "left" | "right" | "scale" | "blur" | "mask";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: ReactNode;
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  /** stagger child <Reveal.Item> elements */
  stagger?: number;
  once?: boolean;
}

const buildVariants = (kind: RevealKind, duration: number): Variants => {
  switch (kind) {
    case "down":
      return {
        hidden: { opacity: 0, y: -50 },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      };
    case "left":
      return {
        hidden: { opacity: 0, x: -60 },
        show: { opacity: 1, x: 0, transition: { duration, ease: EASE } },
      };
    case "right":
      return {
        hidden: { opacity: 0, x: 60 },
        show: { opacity: 1, x: 0, transition: { duration, ease: EASE } },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration, ease: EASE } },
      };
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(20px)", y: 30 },
        show: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          transition: { duration, ease: EASE },
        },
      };
    case "mask":
      return {
        hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        show: {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          transition: { duration, ease: EASE },
        },
      };
    case "up":
    default:
      return {
        hidden: { opacity: 0, y: 60 },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      };
  }
};

const Reveal = ({
  children,
  kind = "up",
  delay = 0,
  duration = 0.9,
  stagger,
  once = true,
  ...rest
}: RevealProps) => {
  const variants = buildVariants(kind, duration);

  if (typeof stagger === "number") {
    const containerVariants: Variants = {
      hidden: {},
      show: {
        transition: { staggerChildren: stagger, delayChildren: delay },
      },
    };
    return (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "-80px" }}
        variants={containerVariants}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/** Use as a child of <Reveal stagger={0.12}> to inherit the stagger sequence */
const RevealItem = ({
  children,
  kind = "up",
  duration = 0.8,
  ...rest
}: {
  children: ReactNode;
  kind?: RevealKind;
  duration?: number;
} & Omit<HTMLMotionProps<"div">, "variants">) => {
  const variants = buildVariants(kind, duration);
  return (
    <motion.div variants={variants} {...rest}>
      {children}
    </motion.div>
  );
};

Reveal.Item = RevealItem;
export { RevealItem };
export default Reveal;
