import { motion, useMotionValue } from "framer-motion";
import { ShieldCheck, Handshake, Workflow, Gauge, Trophy } from "lucide-react";
import { MouseEvent, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

type Reason = { icon: any; title: string; desc: string };

const ReasonCard = ({ r, i }: { r: Reason; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: EASE } },
      }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="group relative p-8 rounded-2xl glass overflow-hidden border border-white/10 hover:border-gold/50 transition-colors duration-500 ease-cinematic"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Cursor-follow radial spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(500px circle at var(--mx) var(--my), hsl(var(--gold) / 0.22), transparent 45%)`,
          ["--mx" as any]: useMotionValue(`50%`),
          ["--my" as any]: useMotionValue(`50%`),
        }}
        // Live update via inline style
        ref={(el) => {
          if (!el) return;
          x.on("change", (v) => el.style.setProperty("--mx", `${v}%`));
          y.on("change", (v) => el.style.setProperty("--my", `${v}%`));
        }}
      />

      {/* Animated corner accents */}
      <span className="pointer-events-none absolute top-3 left-3 w-6 h-6 border-l border-t border-gold/0 group-hover:border-gold/70 transition-all duration-500 group-hover:w-10 group-hover:h-10" />
      <span className="pointer-events-none absolute bottom-3 right-3 w-6 h-6 border-r border-b border-gold/0 group-hover:border-gold/70 transition-all duration-500 group-hover:w-10 group-hover:h-10" />

      {/* Number badge */}
      <span className="absolute top-6 right-6 font-serif text-sm text-gold/40 group-hover:text-gold transition-colors">
        0{i + 1}
      </span>

      <div className="relative">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative w-14 h-14 rounded-xl border border-gold/40 flex items-center justify-center mb-6 group-hover:border-gold group-hover:bg-gold/5 transition-colors"
        >
          <r.icon className="text-gold relative z-10" size={24} strokeWidth={1.5} />
          <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle,hsl(var(--gold)/0.3),transparent_70%)]" />
        </motion.div>

        <h3 className="font-serif text-2xl mb-3 group-hover:text-gradient-gold transition-all">
          {r.title}
        </h3>
        <p className="text-primary-foreground/70 leading-relaxed text-sm">{r.desc}</p>

        {/* Bottom shimmer line */}
        <div className="mt-6 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold via-gold-bright to-transparent transition-all duration-700 ease-cinematic" />
      </div>
    </motion.div>
  );
};

const WhyChoose = () => {
  const { t } = useLanguage();
  const reasons: Reason[] = [
    { icon: ShieldCheck, title: t("why.1.title"), desc: t("why.1.desc") },
    { icon: Handshake, title: t("why.2.title"), desc: t("why.2.desc") },
    { icon: Workflow, title: t("why.3.title"), desc: t("why.3.desc") },
    { icon: Gauge, title: t("why.4.title"), desc: t("why.4.desc") },
    { icon: Trophy, title: t("why.5.title"), desc: t("why.5.desc") },
  ];
  return (
    <section className="relative py-4 md:py-12 bg-[#070608] text-primary-foreground overflow-hidden isolate">
      {/* Multi-layer radial base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,hsl(var(--gold)/0.18),transparent_55%),radial-gradient(ellipse_at_80%_80%,hsl(40_80%_45%/0.15),transparent_55%),radial-gradient(ellipse_at_50%_50%,hsl(0_0%_8%),hsl(0_0%_3%))]" />

      {/* Animated conic aurora */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[140vw] h-[140vw] opacity-25"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, hsl(var(--gold)/0.5) 60deg, transparent 120deg, hsl(40 70% 40%/0.4) 200deg, transparent 260deg, hsl(var(--gold)/0.4) 320deg, transparent 360deg)",
          filter: "blur(80px)",
        }}
      />

      {/* Hex / dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--gold)/0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* Diagonal animated streaks */}
      <div className="absolute inset-0 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: i * 2 }}
            className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            style={{ top: `${15 + i * 22}%`, transform: `rotate(-8deg)` }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          className="absolute w-1 h-1 rounded-full bg-gold shadow-[0_0_12px_hsl(var(--gold))]"
          style={{ top: `${20 + (i * 11) % 60}%`, left: `${10 + (i * 17) % 80}%` }}
        />
      ))}

      {/* Top + bottom edge glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="noise absolute inset-0" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-3xl mb-6 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-gold font-medium"
          >
            <span className="h-px w-10 bg-gold/60" />
            {t("why.eyebrow")}
          </motion.span>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            {t("why.title.1")}{" "}
            <span className="relative inline-block italic text-gradient-gold">
              {t("why.title.2")}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
                className="absolute -bottom-2 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-gold via-gold-bright to-transparent"
              />
            </span>
            .
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
         {reasons.map((r, i) => (
  <ReasonCard key={i} r={r} i={i} />
))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
