import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const { t } = useLanguage();
  const stats = [
    { value: 85, suffix: "%", label: t("stats.1") },
    { value: 6, suffix: "+", label: t("stats.2") },
    { value: 100, suffix: "+", label: t("stats.3") },
    { value: 1000, suffix: "+", label: t("stats.4") },
  ];

  return (
    <section className="relative py-8 md:py-20 bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--gold)/0.18),transparent_60%)]" />
      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-gradient-gold">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 text-primary-foreground/70 text-sm md:text-base max-w-[14rem] mx-auto">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
