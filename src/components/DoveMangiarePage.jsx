import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

export const DoveMangiarePage = () => {
  const { t } = useLanguage();
  useSeo({ title: `${t("eat.title")} | Affittacamere L'Abrì` });
  const places = t("eat.places");

  return (
    <main data-testid="dove-mangiare-page" className="pt-24 sm:pt-32">
      <div className="px-5 sm:px-10 py-14 sm:py-20 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-primary"
        >
          <UtensilsCrossed className="h-4 w-4" /> {t("eat.overline")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-serif font-light tracking-tight text-4xl sm:text-6xl leading-tight"
        >
          {t("eat.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl"
        >
          {t("eat.intro")}
        </motion.p>
      </div>

      <div className="border-t border-border grid grid-cols-1 md:grid-cols-2">
        {places.map((p, i) => (
          <motion.article
            key={p.name}
            data-testid={`eat-place-${i + 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.05 * (i % 2) }}
            className={`p-8 sm:p-12 border-border ${i % 2 === 0 ? "md:border-r" : ""} border-b flex flex-col`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif font-light text-2xl sm:text-3xl tracking-tight">{p.name}</h2>
              <span className="shrink-0 text-[10px] uppercase tracking-[0.22em] text-primary">{p.distance} {t("eat.fromUs")}</span>
            </div>
            <span className="mt-2 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{p.place}</span>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground flex-1">{p.desc}</p>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`eat-maps-${i + 1}`}
              className="group mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary hover:text-foreground transition-colors duration-300"
            >
              {t("eat.maps")} <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </motion.article>
        ))}
      </div>

      <div className="px-5 sm:px-10 py-12 flex flex-wrap items-center justify-center gap-5">
        <a
          href="/#prenota"
          data-testid="eat-book-cta"
          className="bg-foreground text-background px-8 py-4 text-[11px] uppercase tracking-[0.24em] hover:bg-primary transition-colors duration-300"
        >
          {t("eat.book")}
        </a>
        <Link
          to="/"
          data-testid="eat-back-home"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" /> {t("eat.back")}
        </Link>
      </div>
    </main>
  );
};
