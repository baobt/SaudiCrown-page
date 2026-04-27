import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-saudi-crown.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.products"), href: "#products" },
    { label: t("nav.markets"), href: "#markets" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-cinematic ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="container flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
           <img
    src={logo}
    alt="Saudi Crown"
    className="
      h-10 w-10 md:h-11 md:w-11 
      object-contain 
      absolute top-1/2 -translate-y-1/2
      scale-150
    "
   
  />
          {/* <span className={`font-serif text-xl md:text-2xl tracking-tight transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
            Saudi Crown
            <span className="text-gradient-gold italic"> Vietnam</span>
          </span> */}
        </a>

        <ul className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm tracking-wide font-medium relative group transition-colors ${
                  scrolled ? "text-foreground/80 hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-gold transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher scrolled={scrolled} />
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-gold text-gold-foreground text-sm font-semibold shadow-gold hover:scale-105 transition-transform duration-300 ease-cinematic"
          >
            {t("nav.cta")}
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher scrolled={scrolled} />
          <button
            onClick={() => setOpen(!open)}
            className={`p-2 ${scrolled ? "text-foreground" : "text-white"}`}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/40 overflow-hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-foreground/80 hover:text-gold py-2 text-lg font-medium"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-gold text-gold-foreground font-semibold"
              >
                {t("nav.cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
