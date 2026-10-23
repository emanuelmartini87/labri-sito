import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const BASE = "/immagini/Home";

const ITEMS = [
  { url: `${BASE}/Colazione1.jpg`, alt: "Colazione — Affittacamere L'Abrì", cls: "col-span-2 row-span-2" },
  { url: `${BASE}/Ingresso1.jpg`, alt: "Ingresso — Affittacamere L'Abrì", cls: "" },
  { url: `${BASE}/Giardino2.jpg`, alt: "Giardino — Affittacamere L'Abrì", cls: "" },
  { url: `${BASE}/Giardino4.jpg`, alt: "Giardino al tramonto — Affittacamere L'Abrì", cls: "" },
  { url: `${BASE}/GarageMoto.jpg`, alt: "Garage moto e bici — Affittacamere L'Abrì", cls: "" },
  { url: `${BASE}/Colazione2.jpg`, alt: "Locale colazioni — Affittacamere L'Abrì", cls: "col-span-2" },
];

export const Gallery = () => {
  const { t } = useLanguage();

  return (
    <section id="galleria" data-testid="gallery-section" className="border-b border-border">
      <div className="px-5 sm:px-10 py-16 sm:py-24 border-b border-border">
        <span className="text-[11px] uppercase tracking-[0.3em] text-primary">{t("gallery.overline")}</span>
        <h2 className="mt-4 font-serif font-light tracking-tight text-4xl sm:text-5xl lg:text-6xl">
          {t("gallery.title")}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[170px] sm:auto-rows-[220px] gap-1 bg-border">
        {ITEMS.map((item, i) => (
          <motion.figure
            key={item.url}
            data-testid={`gallery-item-${i + 1}`}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.05 * i }}
            className={`group relative overflow-hidden bg-background ${item.cls}`}
          >
            <img
              src={item.url}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.figure>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-accent flex items-center justify-center p-6 text-center"
        >
          <p className="font-serif italic font-light text-2xl sm:text-3xl leading-snug">
            {t("gallery.tile1")}<br />{t("gallery.tile2")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
