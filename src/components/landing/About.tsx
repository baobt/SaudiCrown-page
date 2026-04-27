import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-fields.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" ref={ref} className="relative py-8 md:py-28 overflow-hidden">
      <div className="container grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">{t("about.eyebrow")}</span>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            {t("about.title.1")}
            <span className="italic text-gradient-gold"> {t("about.title.2")}</span>.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            {t("about.body")}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="border-l border-gold/40 pl-4">
              <div className="font-serif text-4xl text-gradient-gold">{t("about.stat1.value")}</div>
              <div className="text-sm text-muted-foreground mt-1">{t("about.stat1.label")}</div>
            </div>
            <div className="border-l border-gold/40 pl-4">
              <div className="font-serif text-4xl text-gradient-gold">{t("about.stat2.value")}</div>
              <div className="text-sm text-muted-foreground mt-1">{t("about.stat2.label")}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-elegant">
            <motion.img
              src={aboutImg}
              alt="Vietnamese terraced rice fields at sunrise"
              loading="lazy"
              width={1080}
              height={1920}
              style={{ y }}
              className="w-full h-[115%] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-8 -left-8 glass-light rounded-2xl p-6 shadow-elegant max-w-xs">
            <div className="font-serif text-2xl">{t("about.badge.title")}</div>
            <p className="text-sm text-muted-foreground mt-1">
              {t("about.badge.desc")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
