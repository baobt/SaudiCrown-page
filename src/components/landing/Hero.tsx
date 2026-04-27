import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Ship, ShieldCheck, Globe2, Truck } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/hero-port.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 1, ease: EASE } },
};

const Word = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
    <motion.span variants={wordReveal} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  </span>
);

const Hero = () => {
  const { t } = useLanguage();
  const features = [
    { icon: Ship, title: t("hero.feature.freight.title"), desc: t("hero.feature.freight.desc") },
    { icon: ShieldCheck, title: t("hero.feature.halal.title"), desc: t("hero.feature.halal.desc") },
    { icon: Globe2, title: t("hero.feature.network.title"), desc: t("hero.feature.network.desc") },
    { icon: Truck, title: t("hero.feature.logistics.title"), desc: t("hero.feature.logistics.desc") },
  ];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen w-full overflow-hidden bg-black isolate flex flex-col">
      {/* Base hero image with parallax + slow Ken-Burns loop */}
      <motion.div
        style={{ y: bgY }}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: [1.08, 1.15, 1.08], opacity: 1 }}
        transition={{
          opacity: { duration: 2.4, ease: EASE },
          scale: { duration: 30, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute inset-0 -top-10 -bottom-10"
      >
        <img
          src={heroImage}
          alt="Aerial top-down view of a container ship at sea carrying cargo across global trade routes"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </motion.div>

      {/* Subtle dark vignette for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/40 pointer-events-none" />

      {/* Edge frame line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Main Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 container flex-1 flex flex-col justify-center pt-32 pb-12"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          {/* Eyebrow badge */}
          <motion.div variants={item} className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-8 border border-gold/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span className="text-xs tracking-[0.3em] uppercase text-white/90 font-medium">{t("hero.eyebrow")}</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-xs tracking-[0.2em] uppercase text-gold/90">{t("hero.est")}</span>
          </motion.div>

          {/* Headline with masked word reveal */}
          <h1 className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <motion.span variants={container} initial="hidden" animate="show" className="block">
              <Word>{t("hero.title.1")}</Word> <Word>{t("hero.title.2")}</Word>
            </motion.span>
            <motion.span variants={container} initial="hidden" animate="show" className="block mt-1">
              <Word className="italic text-gradient-gold">{t("hero.title.3")}</Word>{" "}
              <Word>{t("hero.title.4")}</Word>
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-base md:text-lg text-white/80 leading-relaxed font-light"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-[1.03] transition-transform duration-500 ease-cinematic overflow-hidden"
            >
              <span className="relative z-10">{t("hero.cta.primary")}</span>
              <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors border border-white/15 hover:border-gold/40"
            >
              {t("hero.cta.secondary")}
              <span className="w-2 h-2 rounded-full bg-gold/70 group-hover:bg-gold transition-colors" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom feature row — like reference image */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1, ease: EASE }}
        className="relative z-10 border-t border-white/10 backdrop-blur-md bg-black/30"
      >
        <div className="container py-6 md:py-7">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={item}
                className="group flex items-start gap-4"
              >
                <div className="shrink-0 w-12 h-12 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center group-hover:bg-gold/15 group-hover:border-gold/60 transition-all duration-500">
                  <f.icon size={20} className="text-gold" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm md:text-base font-semibold text-white leading-tight">
                    {f.title}
                  </div>
                  <div className="text-xs text-white/55 mt-1 leading-snug hidden sm:block">
                    {f.desc}
                  </div>
                </div>
                {i < features.length - 1 && (
                  <span className="hidden lg:block ml-auto h-10 w-px bg-white/10 self-center" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom edge fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
};

export default Hero;
