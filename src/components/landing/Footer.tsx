import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-primary text-primary-foreground py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-serif text-3xl">
              Saudi Crown<span className="text-gradient-gold italic"> Vietnam</span>
            </div>
            <p className="mt-4 text-primary-foreground/60 max-w-sm text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">{t("footer.navigate")}</div>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#about" className="hover:text-gold transition-colors">{t("nav.about")}</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">{t("nav.services")}</a></li>
              <li><a href="#products" className="hover:text-gold transition-colors">{t("nav.products")}</a></li>
              <li><a href="#markets" className="hover:text-gold transition-colors">{t("nav.markets")}</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold mb-4">{t("footer.contact")}</div>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>{t("footer.address")}</li>
              <li>info@saudicrowns.com</li>
              <li>{t("footer.phone")}</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-primary-foreground/50">
          <span>© {new Date().getFullYear()} Saudi Crown Vietnam. {t("footer.copyright")}</span>
          <span>{t("footer.bottom")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
