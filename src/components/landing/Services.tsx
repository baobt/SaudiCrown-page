import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Handshake, BadgeCheck, Ship, Store, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const Services = () => {
  const { t } = useLanguage();
  const steps = [
    { n: "01", title: t("svc.1.title"), desc: t("svc.1.desc"), icon: Search, meta: t("svc.1.meta") },
    { n: "02", title: t("svc.2.title"), desc: t("svc.2.desc"), icon: Handshake, meta: t("svc.2.meta") },
    { n: "03", title: t("svc.3.title"), desc: t("svc.3.desc"), icon: BadgeCheck, meta: t("svc.3.meta") },
    { n: "04", title: t("svc.4.title"), desc: t("svc.4.desc"), icon: Ship, meta: t("svc.4.meta") },
    { n: "05", title: t("svc.5.title"), desc: t("svc.5.desc"), icon: Store, meta: t("svc.5.meta") },
  ];
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="services" className="relative py-10 md:py-28 overflow-hidden">
      {/* top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      {/* ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.06),transparent_60%)] pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">{t("svc.eyebrow")}</span>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
            {t("svc.title.1")} <span className="italic text-gradient-gold">{t("svc.title.2")}</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t("svc.subtitle")}
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div ref={trackRef} className="relative">
          {/* Vertical animated rail (mobile) */}
          <div className="lg:hidden absolute left-[27px] top-2 bottom-2 w-px bg-border overflow-hidden">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="absolute inset-0 bg-gradient-to-b from-gold via-gold/70 to-transparent"
            />
          </div>

          {/* Horizontal animated rail (desktop) */}
          <div className="hidden lg:block absolute left-0 right-0 top-[88px] h-px bg-border overflow-hidden">
            <motion.div
              style={{ scaleX: lineScale, transformOrigin: "left" }}
              className="absolute inset-0 bg-gradient-to-r from-gold via-gold-bright to-gold/40"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 items-stretch">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                  className="group relative pl-20 lg:pl-0 flex flex-col h-full"
                >
                  {/* Node dot */}
                  <div className="absolute lg:relative left-0 lg:left-auto top-0 lg:mb-8 flex items-center lg:justify-start">
                    <div className="relative">
                      {/* pulse ring */}
                      <span className="absolute inset-0 rounded-full bg-gold/20 animate-ping" style={{ animationDuration: "3s" }} />
                      <div className="relative w-14 h-14 rounded-full bg-background border border-gold/40 flex items-center justify-center shadow-gold group-hover:border-gold transition-colors duration-500">
                        <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ease-cinematic">
                          <Icon size={18} strokeWidth={1.75} className="text-gold-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card content */}
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="relative p-6 rounded-2xl border border-border bg-secondary/20 backdrop-blur-sm hover:border-gold/40 hover:bg-secondary/40 hover:shadow-elegant transition-all duration-500 ease-cinematic overflow-hidden flex flex-col flex-1 h-full"
                  >
                    {/* gold corner accent on hover */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[radial-gradient(circle_at_top_right,hsl(var(--gold)/0.18),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* meta + arrow */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/80">
                        {s.meta}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-gold opacity-0 -translate-x-1 -translate-y-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:-translate-y-0.5 transition-all duration-500 ease-cinematic"
                      />
                    </div>

                    {/* big numeral */}
                    <div className="font-serif text-6xl leading-none text-gradient-gold mb-3 group-hover:tracking-tight transition-all duration-500">
                      {s.n}
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl leading-snug mb-3">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {s.desc}
                    </p>

                    {/* bottom progress underline */}
                    <div className="mt-5 h-px w-full bg-border overflow-hidden">
                      <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-gold to-transparent transition-all duration-700 ease-cinematic" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
