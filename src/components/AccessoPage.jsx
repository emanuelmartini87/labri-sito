import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, KeyRound, Building2, DoorOpen, Coffee, Car, Bell, LogOut, ClipboardCheck, Mail, QrCode, Cpu } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

const ICONS = {
  key: KeyRound,
  mail: Mail,
  qr: QrCode,
  cpu: Cpu,
  building: Building2,
  door: DoorOpen,
  coffee: Coffee,
  car: Car,
  bell: Bell,
  logout: LogOut,
  clipboard: ClipboardCheck,
};

export const AccessoPage = () => {
  const { t } = useLanguage();
  useSeo({ title: `${t("accesso.title")} | Affittacamere L'Abrì` });
  const sections = t("accesso.sections");

  return (
    <main data-testid="accesso-page" className="pt-24 sm:pt-32">
      <div className="px-5 sm:px-10 py-14 sm:py-20 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.3em] text-primary"
        >
          {t("accesso.overline")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-serif font-light tracking-tight text-4xl sm:text-6xl leading-tight"
        >
          {t("accesso.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl"
        >
          {t("accesso.intro")}
        </motion.p>
      </div>

      <div className="border-t border-border grid grid-cols-1 md:grid-cols-2">
        {sections.map((s, i) => {
          const Icon = ICONS[s.icon] || KeyRound;
          return (
            <motion.div
              key={s.title}
              data-testid={`accesso-section-${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.05 * (i % 2) }}
              className={`p-8 sm:p-12 border-border ${i % 2 === 0 ? "md:border-r" : ""} border-b`}
            >
              <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              <h2 className="mt-5 font-serif font-light text-2xl sm:text-3xl tracking-tight">{s.title}</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">{s.text}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="px-5 sm:px-10 py-12 flex flex-wrap items-center justify-center gap-5">
        <a
          href="/#prenota"
          data-testid="accesso-book-cta"
          className="bg-foreground text-background px-8 py-4 text-[11px] uppercase tracking-[0.24em] hover:bg-primary transition-colors duration-300"
        >
          {t("accesso.book")}
        </a>
        <Link
          to="/"
          data-testid="accesso-back-home"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" /> {t("accesso.back")}
        </Link>
      </div>
    </main>
  );
};
