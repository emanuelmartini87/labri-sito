import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wifi, ArrowUpRight, ArrowLeft, KeyRound } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

export const DomoticaPage = () => {
  const { t } = useLanguage();
  useSeo({ title: `${t("domotica.title")} | Affittacamere L'Abrì`, noindex: true });

  return (
    <main data-testid="domotica-page" className="min-h-[85vh] flex items-center">
      <div className="px-5 sm:px-10 py-28 sm:py-36 w-full max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-primary"
        >
          <KeyRound className="h-4 w-4" /> {t("domotica.overline")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-serif font-light tracking-tight text-4xl sm:text-6xl leading-tight"
        >
          {t("domotica.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl"
        >
          {t("domotica.intro")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 border border-primary/40 bg-accent p-6 sm:p-8 flex gap-4"
        >
          <Wifi className="h-6 w-6 shrink-0 text-primary mt-0.5" />
          <p className="text-sm sm:text-base leading-relaxed">
            {t("domotica.warning1")} <strong>{t("domotica.warning2")}</strong>{t("domotica.warning3")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <a
            href="http://domotica.labri.lan/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="domotica-open-button"
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[11px] uppercase tracking-[0.24em] hover:bg-primary transition-colors duration-300"
          >
            {t("domotica.open")} <ArrowUpRight className="h-4 w-4" />
          </a>
          <Link
            to="/"
            data-testid="domotica-back-home"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" /> {t("domotica.back")}
          </Link>
        </motion.div>
      </div>
    </main>
  );
};
