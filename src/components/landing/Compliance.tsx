import { motion } from "framer-motion";
import { Award, FileCheck, ShieldCheck, ClipboardCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Compliance = () => {
  const { t, lang } = useLanguage();

const highlights = [
  { icon: ShieldCheck, key: "comp.1" },
  { icon: Award, key: "comp.2" },
  { icon: FileCheck, key: "comp.3" },
  { icon: ClipboardCheck, key: "comp.4" },
] as const;

  return (
    <section className="relative py-8 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--gold)/0.06),transparent_70%)]" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-gold font-medium">
            {t("comp.eyebrow")}
          </span>

          <h2 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight">
            {t("comp.title.1")}{" "}
            <span className="italic text-gradient-gold">
              {t("comp.title.2")}
            </span>
            .
          </h2>

          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            {t("comp.body")}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          key={lang} // 🔥 quan trọng: force re-render khi đổi ngôn ngữ
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
        >
          {highlights.map((h) => (
            <motion.div
              key={`${h.key}-${lang}`} // 🔥 fix dứt điểm bug
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{ y: -4 }}
              className="relative group flex flex-col items-center text-center p-8 rounded-2xl border border-gold/20 bg-secondary/40 backdrop-blur-sm hover:border-gold/60 hover:shadow-gold transition-all duration-500 ease-cinematic"
            >
              {/* top line */}
              <div className="absolute -top-px left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

              {/* icon */}
              <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 ease-cinematic">
                <h.icon className="text-gold" size={28} strokeWidth={1.5} />
              </div>

              {/* text */}
              <p className="font-medium text-sm leading-snug">
                {t(h.key)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Compliance;