import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const STORY_IMAGE = "/immagini/Home/Giardino1.jpg";

export const Story = () => {
  const { t } = useLanguage();

  return (
    <section id="dimora" data-testid="story-section" className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
      <motion.div
        initial={{ clipPath: "inset(10% 10% 10% 10%)", opacity: 0.6 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[420px] lg:min-h-[720px]"
      >
        <img
          src={STORY_IMAGE}
          alt={t("story.caption")}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.28em] text-white/90 bg-black/35 px-3 py-1.5">
          {t("story.caption")}
        </span>
      </motion.div>

      <div className="flex flex-col justify-center p-8 sm:p-14 lg:p-24 border-t lg:border-t-0 lg:border-l border-border">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[11px] uppercase tracking-[0.3em] text-primary mb-8"
        >
          {t("story.overline")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif font-light tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-tight"
        >
          {t("story.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl"
        >
          <p>{t("story.p1")}</p>
          <p>{t("story.p2")}</p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 border-l-2 border-primary pl-6 font-serif italic font-light text-3xl sm:text-4xl leading-snug"
        >
          {t("story.quote")}
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
        >
          {t("story.sign")}
        </motion.p>
      </div>
    </section>
  );
};
