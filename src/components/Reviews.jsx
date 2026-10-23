import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Stars = () => (
  <span className="flex gap-1" aria-hidden="true">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
    ))}
  </span>
);

const PLATFORMS = [
  {
    id: "google",
    name: "Google",
    score: "4,8",
    count: "126",
    href: "https://www.google.com/maps/search/?api=1&query=Affittacamere+L+Abri+Pietraporzio",
  },
  {
    id: "tripadvisor",
    name: "Tripadvisor",
    score: "4,8/5",
    count: "71",
    href: "https://www.tripadvisor.com/ShowUserReviews-g2052807-d7086324",
  },
];

export const Reviews = () => {
  const { t } = useLanguage();

  return (
    <section id="recensioni" data-testid="reviews-section" className="border-b border-border">
      <div className="px-5 sm:px-10 py-16 sm:py-24 border-b border-border flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary">{t("reviews.overline")}</span>
          <h2 className="mt-4 font-serif font-light tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            {t("reviews.title")}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("reviews.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {PLATFORMS.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`review-platform-${p.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.08 * i }}
            className={`group p-10 sm:p-16 border-border ${i === 0 ? "md:border-r" : ""} max-md:border-b hover:bg-accent transition-colors duration-500`}
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{p.name}</span>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-serif font-light text-7xl sm:text-8xl tracking-tighter leading-none">{p.score}</span>
              <Stars />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {p.count} {t(`reviews.${p.id}`)}
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-primary">
              {t("reviews.read")} →
            </p>
          </motion.a>
        ))}
      </div>

      <div className="border-t border-border px-5 sm:px-10 py-8 flex justify-center">
        <a
          href="#prenota"
          data-testid="reviews-booking-cta"
          className="border border-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          {t("reviews.cta")}
        </a>
      </div>
    </section>
  );
};
