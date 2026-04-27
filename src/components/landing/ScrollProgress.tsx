import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin gold progress bar at the very top of the page that fills as the user scrolls.
 * Adds a cinematic feel to navigating long landing pages.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-deep via-gold to-gold-bright z-[60] shadow-[0_0_12px_hsl(var(--gold)/0.6)]"
      aria-hidden
    />
  );
};

export default ScrollProgress;
