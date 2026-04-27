import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ImportServices = () => {
  const { t } = useLanguage();
  const services = [t("imp.1"), t("imp.2"), t("imp.3"), t("imp.4")];

  return (
    <section className="relative py-8 md:py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.08),transparent_60%)]" />

      <div className="container relative grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">{t("imp.eyebrow")}</span>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight">
            {t("imp.title.1")} <span className="italic text-gradient-gold">{t("imp.title.2")}</span>.
          </h2>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            {t("imp.body")}
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
          className="space-y-4"
        >
          {services.map((s, i) => (
            <motion.li
              key={s}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="group flex items-center gap-6 p-6 rounded-2xl border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-gold/40 transition-all duration-500 ease-cinematic"
            >
              <span className="font-serif text-3xl text-gradient-gold w-12 shrink-0">
                0{i + 1}
              </span>
              <span className="flex-1 text-lg font-medium">{s}</span>
              <ArrowRight
                className="text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-cinematic"
                size={20}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default ImportServices;
