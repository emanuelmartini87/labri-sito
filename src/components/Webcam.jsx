import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WEBCAM_BG =
  "https://images.unsplash.com/photo-1578309830739-6226cb317b22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxkcmFtYXRpYyUyMGFscGluZSUyMG1vdW50YWlucyUyMHBlYWslMjBjaGFsZXR8ZW58MHx8fHwxNzkyNzI1MTA2fDA&ixlib=rb-4.1.0&q=85";

export const Webcam = () => {
  const { t } = useLanguage();

  return (
    <section id="webcam" data-testid="webcam-section" className="relative overflow-hidden">
      <img
        src={WEBCAM_BG}
        alt="Le cime dell'Alta Valle Stura inquadrate dalla webcam de L'Abrì"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 px-5 sm:px-10 py-24 sm:py-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/85"
        >
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
          {t("webcam.overline")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-serif font-light tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-3xl"
        >
          {t("webcam.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-white/85"
        >
          {t("webcam.text")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center gap-5"
        >
          <a
            href="https://webcam.labri.it/"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="webcam-open-link"
            className="inline-flex items-center gap-3 bg-white text-foreground px-8 py-4 text-[11px] uppercase tracking-[0.24em] hover:bg-primary hover:text-white transition-colors duration-300"
          >
            {t("webcam.cta")} <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">{t("webcam.note")}</span>
        </motion.div>
      </div>
    </section>
  );
};
