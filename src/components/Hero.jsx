import { motion, useScroll, useTransform } from "framer-motion";
import { LogoMark } from "@/components/Logo";
import { useLanguage } from "@/i18n/LanguageContext";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1578309830739-6226cb317b22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwzfHxkcmFtYXRpYyUyMGFscGluZSUyMG1vdW50YWlucyUyMHBlYWslMjBjaGFsZXR8ZW58MHx8fHwxNzkyNzI1MTA2fDA&ixlib=rb-4.1.0&q=85";

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 260]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const { t } = useLanguage();

  return (
    <section id="top" data-testid="hero-section" className="relative h-[100svh] min-h-[560px] overflow-hidden">
      <motion.img
        src={HERO_IMAGE}
        alt="Vette innevate della Valle Stura all'ora dorata"
        style={{ y }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-10 pb-24 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex items-center gap-3 text-white/85 mb-6"
        >
          <LogoMark className="h-5 w-5 text-white" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.32em]">
            {t("hero.overline")}
          </span>
        </motion.div>

        <h1 className="font-serif font-light tracking-tight leading-[0.95] text-white text-[15vw] sm:text-[11vw] lg:text-[8.5vw]">
          <MaskedLine delay={0.35}>{t("hero.title1")}</MaskedLine>
          <MaskedLine delay={0.5}>
            <em className="not-italic lg:italic">{t("hero.title2")}</em>
          </MaskedLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-white/85"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#prenota"
            data-testid="hero-booking-cta"
            className="bg-white text-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] hover:bg-primary hover:text-white transition-colors duration-300"
          >
            {t("hero.cta1")}
          </a>
          <a
            href="#camere"
            data-testid="hero-rooms-cta"
            className="border border-white text-white px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] hover:bg-white hover:text-foreground transition-colors duration-300"
          >
            {t("hero.cta2")}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 right-5 sm:right-10 z-10 flex items-center gap-3 text-white/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t("hero.scroll")}</span>
        <span className="relative block h-10 w-px bg-white/30 overflow-hidden">
          <motion.span
            className="absolute top-0 left-0 h-4 w-px bg-white"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
};
