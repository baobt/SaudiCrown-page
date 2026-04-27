import { useLanguage } from "@/i18n/LanguageContext";

const LanguageSwitcher = ({ scrolled = false }: { scrolled?: boolean }) => {
  const { lang, setLang } = useLanguage();
  const baseText = scrolled ? "text-foreground/70" : "text-white/70";
  const activeText = scrolled ? "text-foreground" : "text-white";

  return (
    <div
      className={`inline-flex items-center rounded-full border ${
        scrolled ? "border-border" : "border-white/20"
      } overflow-hidden text-xs font-semibold tracking-wider`}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-label="English"
        className={`px-3 py-1.5 transition-colors ${
          lang === "en"
            ? "bg-gradient-gold text-gold-foreground"
            : `${baseText} hover:${activeText}`
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("vi")}
        aria-label="Tiếng Việt"
        className={`px-3 py-1.5 transition-colors ${
          lang === "vi"
            ? "bg-gradient-gold text-gold-foreground"
            : `${baseText} hover:${activeText}`
        }`}
      >
        VI
      </button>
    </div>
  );
};

export default LanguageSwitcher;
