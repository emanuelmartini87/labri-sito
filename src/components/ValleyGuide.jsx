import { motion } from "framer-motion";
import { Mountain, Bike, Fish, Snowflake, Video } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ICONS = [Mountain, Bike, Fish, Snowflake];

export const ValleyGuide = () => {
  const { t } = useLanguage();
  const items = t("valley.items");

  return (
    <section id="valle" data-testid="valley-section" className="border-b border-border bg-accent">
      <div className="px-5 sm:px-10 py-16 sm:py-24 border-b border-foreground/10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary">{t("valley.overline")}</span>
          <h2 className="mt-4 font-serif font-light tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            {t("valley.title")}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("valley.intro")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={item.title}
              data-testid={`valley-item-${i + 1}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.08 * i }}
              className={`p-8 sm:p-12 border-foreground/10 ${i < items.length - 1 ? "max-lg:border-b lg:border-r" : ""}`}
            >
              <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="mt-6 font-serif font-light text-2xl sm:text-3xl tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="border-t border-foreground/10 px-5 sm:px-10 py-8 flex justify-center">
        <a
          href="https://webcam.labri.it/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="valley-webcam-link"
          className="inline-flex items-center gap-3 border border-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          <Video className="h-4 w-4" /> {t("valley.cta")}
        </a>
      </div>
    </section>
  );
};
