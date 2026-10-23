import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Video, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export const Location = () => {
  const { t } = useLanguage();
  const hours = t("location.hours");

  const USEFUL_LINKS = [
    { href: "https://webcam.labri.it/", label: t("location.links.webcam"), testid: "link-webcam", external: true },
    { href: "/domotica", label: t("location.links.domotica"), testid: "link-domotica", external: false },
    { href: "/accesso", label: t("location.links.accesso"), testid: "link-accesso", external: false },
    { href: "/dove-mangiare", label: t("location.links.eat"), testid: "link-dove-mangiare", external: false },
    { href: "https://labriprenotazioni.bed-booking.com/", label: t("location.links.bed"), testid: "link-bed-booking", external: true },
  ];

  return (
    <section id="dove-siamo" data-testid="location-section" className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
      <div className="p-8 sm:p-14 lg:p-24 flex flex-col justify-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-primary">{t("location.overline")}</span>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-6 font-serif font-light tracking-tight text-4xl sm:text-5xl leading-tight"
        >
          {t("location.address1")}<br />
          {t("location.address2")}
          <span className="block text-2xl sm:text-3xl text-muted-foreground mt-2">{t("location.address3")}</span>
        </motion.h2>

        <div className="mt-10 space-y-4 text-sm sm:text-base">
          <a href="https://wa.me/393335984119" target="_blank" rel="noopener noreferrer" data-testid="location-whatsapp-link" className="flex items-center gap-3 hover:text-primary transition-colors duration-300">
            <Phone className="h-4 w-4 text-primary" /> {t("location.whatsapp")}
          </a>
          <a href="https://webcam.labri.it/" target="_blank" rel="noopener noreferrer" data-testid="location-webcam-link" className="flex items-center gap-3 hover:text-primary transition-colors duration-300">
            <Video className="h-4 w-4 text-primary" /> {t("location.webcam")}
          </a>
          <p className="flex items-center gap-3 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" /> {t("location.mapNote")}
          </p>
        </div>

        <div className="mt-12 border-t border-border">
          <h3 className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{t("location.hoursTitle")}</h3>
          <dl className="mt-4">
            {hours.map((h) => (
              <div key={h.label} className="flex flex-col sm:flex-row sm:justify-between gap-1 py-3 border-b border-border text-sm sm:text-base">
                <dt className="text-muted-foreground">{h.label}</dt>
                <dd className="font-medium sm:text-right">{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12">
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{t("location.linksTitle")}</h3>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {USEFUL_LINKS.map((l) => (
              <li key={l.href} className="border-b border-border">
                {l.external ? (
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={l.testid}
                    className="group flex items-center justify-between py-3.5 text-sm sm:text-base hover:text-primary transition-colors duration-300"
                  >
                    {l.label}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </a>
                ) : (
                  <Link
                    to={l.href}
                    data-testid={l.testid}
                    className="group flex items-center justify-between py-3.5 text-sm sm:text-base hover:text-primary transition-colors duration-300"
                  >
                    {l.label}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative min-h-[380px] lg:min-h-[640px] border-t lg:border-t-0 lg:border-l border-border">
        <iframe
          data-testid="location-map"
          title="Mappa — Affittacamere L'Abrì, Via Francia 3, Pontebernardo, Pietraporzio"
          src="https://www.google.com/maps?q=Affittacamere+L%27Abr%C3%AC+Via+Francia+3+Pontebernardo+Pietraporzio&output=embed"
          className="absolute inset-0 h-full w-full border-0 grayscale contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
};
