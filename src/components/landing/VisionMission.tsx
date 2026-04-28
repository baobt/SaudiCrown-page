import { motion } from "framer-motion";
import { Eye, Target, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const VisionMission = () => {
  const { t } = useLanguage();
  const missionPoints = [t("vm.mission.1"), t("vm.mission.2"), t("vm.mission.3")];

  return (
    <section className="relative py-1 md:py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-4 md:mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">{t("vm.eyebrow")}</span>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            {t("vm.title.1")} <span className="italic text-gradient-gold">{t("vm.title.2")}</span>.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-5 md:p-12 rounded-2xl border border-border bg-secondary/40 hover:border-gold/40 transition-colors duration-500 ease-cinematic"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 md:mb-8">
              <Eye className="text-gold-foreground" size={26} />
            </div>
            <h3 className="font-serif text-3xl md:text-4xl mb-6">{t("vm.vision.title")}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("vm.vision.body")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-5 md:p-12 rounded-2xl border border-border bg-secondary/40 hover:border-gold/40 transition-colors duration-500 ease-cinematic"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 md:mb-8">
              <Target className="text-gold-foreground" size={26} />
            </div>
            <h3 className="font-serif text-3xl md:text-4xl mb-6">{t("vm.mission.title")}</h3>
            <ul className="space-y-4">
              {missionPoints.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 text-foreground/85"
                >
                  <span className="mt-1 w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
                    <Check size={12} className="text-gold-foreground" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
