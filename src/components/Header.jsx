import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, KeyRound } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/i18n/LanguageContext";

const LANG_LABELS = { it: "IT", en: "EN", fr: "FR", de: "DE" };

export const Header = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t, LANGS } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled || open || pathname !== "/";

  const LINKS = [
    { href: pathname === "/" ? "#dimora" : "/#dimora", label: t("nav.casa") },
    { href: pathname === "/" ? "#camere" : "/#camere", label: t("nav.camere") },
    { href: pathname === "/" ? "#valle" : "/#valle", label: t("nav.valle") },
    { href: pathname === "/" ? "#recensioni" : "/#recensioni", label: t("nav.recensioni") },
    { href: pathname === "/" ? "#dove-siamo" : "/#dove-siamo", label: t("nav.dove") },
    { href: pathname === "/" ? "#contatti" : "/#contatti", label: t("nav.contatti") },
  ];

  const LangSwitch = ({ className = "", testidPrefix }) => (
    <div className={`flex items-center gap-1.5 ${className}`} role="group" aria-label="Lingua / Language">
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          <button
            type="button"
            data-testid={`${testidPrefix}-lang-${l}`}
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`text-[10px] tracking-[0.18em] uppercase transition-colors duration-300 ${
              lang === l ? "text-primary font-semibold" : "opacity-60 hover:opacity-100"
            }`}
          >
            {LANG_LABELS[l]}
          </button>
          {i < LANGS.length - 1 && <span className="opacity-30 text-[10px]">/</span>}
        </span>
      ))}
    </div>
  );

  return (
    <>
      <header
        data-testid="site-header"
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          dark ? "bg-background/95 backdrop-blur-md border-b border-border text-foreground" : "text-white"
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-10 h-16 sm:h-20">
          <Link to="/" data-testid="header-logo-link" aria-label="L'Abrì — home">
            <Logo />
          </Link>
          <nav className="hidden xl:flex items-center gap-6" aria-label="Navigazione principale">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.href.replace(/^\/?#/, "")}`}
                className="text-[11px] uppercase tracking-[0.22em] opacity-80 hover:opacity-100 hover:text-primary transition-opacity duration-300"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/domotica"
              data-testid="nav-link-domotica"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] opacity-80 hover:opacity-100 hover:text-primary transition-opacity duration-300"
            >
              <KeyRound className="h-3.5 w-3.5" /> {t("nav.domotica")}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LangSwitch testidPrefix="header" className="hidden sm:flex" />
            <a
              href={pathname === "/" ? "#prenota" : "/#prenota"}
              data-testid="header-booking-cta"
              className={`hidden sm:inline-block border px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                dark
                  ? "border-foreground hover:bg-foreground hover:text-background"
                  : "border-white hover:bg-white hover:text-foreground"
              }`}
            >
              {t("nav.prenota")}
            </a>
            <button
              type="button"
              data-testid="mobile-menu-toggle"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              onClick={() => setOpen(!open)}
              className="xl:hidden p-2"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background text-foreground flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-2" aria-label="Menu mobile">
              {[...LINKS, { href: pathname === "/" ? "#prenota" : "/#prenota", label: t("nav.prenota") }].map((l, i) => (
                <span key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    data-testid={`mobile-nav-link-${l.href.replace(/^\/?#/, "")}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.6, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="block font-serif text-4xl sm:text-6xl font-light tracking-tight py-1 hover:text-primary transition-colors duration-300"
                  >
                    {l.label}
                  </motion.a>
                </span>
              ))}
              <span className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.6, delay: 0.07 * (LINKS.length + 1), ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to="/domotica"
                    data-testid="mobile-nav-link-domotica"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 font-serif text-4xl sm:text-6xl font-light tracking-tight py-1 text-primary hover:text-foreground transition-colors duration-300"
                  >
                    <KeyRound className="h-7 w-7" /> {t("nav.domotica")}
                  </Link>
                </motion.div>
              </span>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <LangSwitch testidPrefix="mobile" className="text-lg gap-3" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
