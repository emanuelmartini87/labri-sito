import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

export const PrivacyPage = () => {
  const { t } = useLanguage();
  useSeo({ title: `${t("privacy.title")} | Affittacamere L'Abrì` });
  const sections = t("privacy.sections");

  return (
    <main data-testid="privacy-page" className="pt-24 sm:pt-32">
      <div className="px-5 sm:px-10 py-14 sm:py-20 max-w-3xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-primary"
        >
          <ShieldCheck className="h-4 w-4" /> {t("privacy.overline")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-serif font-light tracking-tight text-4xl sm:text-6xl leading-tight"
        >
          {t("privacy.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-[11px] uppercase tracking-[0.24em] text-muted-foreground"
        >
          {t("privacy.updated")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 border border-primary/40 bg-accent p-6 sm:p-8"
        >
          <h2 className="text-[11px] uppercase tracking-[0.26em] text-primary">{t("privacy.controller")}</h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed">{t("privacy.controllerText")}</p>
        </motion.div>

        <div className="mt-4">
          {sections.map((s, i) => (
            <motion.section
              key={s.title}
              data-testid={`privacy-section-${i + 1}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="py-8 border-b border-border"
            >
              <h2 className="font-serif font-light text-2xl sm:text-3xl tracking-tight">{s.title}</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">{s.text}</p>
            </motion.section>
          ))}
        </div>

        <div className="py-10">
          <Link
            to="/"
            data-testid="privacy-back-home"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" /> {t("privacy.back")}
          </Link>
        </div>
      </div>
    </main>
  );
};
