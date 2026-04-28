import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Globe, Leaf, BadgeCheck, Network, Snowflake } from "lucide-react";
import { useRef, MouseEvent } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

type StrengthItem = { icon: any; title: string; desc: string };

const StrengthCard = ({ s, i }: { s: StrengthItem; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-100, 100], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-100, 100], [-8, 8]), { stiffness: 150, damping: 15 });
  const glowX = useTransform(mx, (v) => `${v + 100}%`);
  const glowY = useTransform(my, (v) => `${v + 100}%`);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 200);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 200);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative p-8 rounded-2xl glass border border-white/10 hover:border-gold/40 transition-colors duration-500 ease-cinematic"
    >
      {/* Spotlight follow cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY] as never,
            ([x, y]: any) => `radial-gradient(400px circle at ${x} ${y}, hsl(var(--gold) / 0.18), transparent 50%)`
          ),
        }}
      />
      {/* Animated gradient border on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,transparent_0deg,hsl(var(--gold)/0.6)_60deg,transparent_120deg)] animate-[spin_4s_linear_infinite]" style={{ mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px" }} />
      </div>

      <div className="relative" style={{ transform: "translateZ(40px)" }}>
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-500 ease-cinematic"
        >
          <s.icon className="text-gold-foreground" size={26} />
        </motion.div>
        <h3 className="font-serif text-2xl mb-3">{s.title}</h3>
        <p className="text-primary-foreground/70 leading-relaxed">{s.desc}</p>
      </div>
    </motion.div>
  );
};

const Strengths = () => {
  const { t } = useLanguage();
  const strengths: StrengthItem[] = [
    { icon: Globe, title: t("str.1.title"), desc: t("str.1.desc") },
    { icon: Leaf, title: t("str.2.title"), desc: t("str.2.desc") },
    { icon: BadgeCheck, title: t("str.3.title"), desc: t("str.3.desc") },
    { icon: Network, title: t("str.4.title"), desc: t("str.4.desc") },
    { icon: Snowflake, title: t("str.5.title"), desc: t("str.5.desc") },
  ];
  return (
    <section className="relative py-0 md:py-12 bg-[#08070a] text-primary-foreground overflow-hidden isolate">
      {/* Deep base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--gold)/0.18),transparent_55%),radial-gradient(ellipse_at_80%_100%,hsl(280_60%_20%/0.35),transparent_60%),radial-gradient(ellipse_at_10%_90%,hsl(220_60%_18%/0.4),transparent_60%)]" />

      {/* Aurora mesh gradient — slow drift */}
      <motion.div
        aria-hidden
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            "linear-gradient(120deg, hsl(var(--gold)/0.35), transparent 35%, hsl(220 80% 30%/0.35) 60%, transparent 80%, hsl(var(--gold)/0.3))",
          backgroundSize: "300% 300%",
          filter: "blur(60px)",
        }}
      />

      {/* Perspective grid floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55%] opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--gold)/0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold)/0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(700px) rotateX(60deg)",
          transformOrigin: "center bottom",
          maskImage: "linear-gradient(to top, black 10%, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to top, black 10%, transparent 90%)",
        }}
      />

      {/* Drifting gold orbs */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--gold)/0.28),transparent_60%)] blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -100, 60, 0], y: [0, 80, -50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(260_70%_50%/0.25),transparent_65%)] blur-3xl"
      />

      {/* Light beams sweeping */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          initial={{ x: "-30%", opacity: 0 }}
          animate={{ x: "130%", opacity: [0, 0.6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: i * 4.5 }}
          className="absolute top-0 h-full w-[18%] -skew-x-12"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--gold)/0.18), transparent)",
            filter: "blur(20px)",
          }}
        />
      ))}

      {/* Top + bottom edge glow lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="noise absolute inset-0" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-gold font-medium"
          >
            <span className="h-px w-10 bg-gold/60" />
            {t("str.eyebrow")}
          </motion.span>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            {t("str.title.1")}{" "}
            <span className="relative inline-block italic text-gradient-gold">
              {t("str.title.2")}
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

        <div className="mt-1 md:mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {strengths.map((s, i) => (
            <StrengthCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strengths;
