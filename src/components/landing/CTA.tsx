import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const CTA = () => {
  const { t } = useLanguage();
  return (
    <section className="relative py-8 md:py-28 overflow-hidden bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-12 md:p-20 lg:p-28 text-center shadow-elegant"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gold)/0.25),transparent_60%)]" />
          <div className="noise absolute inset-0" />

          <div className="relative">
            <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">{t("cta.eyebrow")}</span>
            <h2 className="mt-6 font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.02]">
              {t("cta.title.1")}
              <br />
              {t("cta.title.2")} <span className="italic text-gradient-gold">{t("cta.title.3")}</span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-primary-foreground/70 text-lg">
              {t("cta.body")}
            </p>
            <div className="mt-12">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-gold text-gold-foreground font-semibold text-lg shadow-gold pulse-gold hover:scale-[1.04] transition-transform duration-500 ease-cinematic"
              >
                {t("cta.button")}
                <ArrowRight size={20} className="transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
