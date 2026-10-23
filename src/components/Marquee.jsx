import { useLanguage } from "@/i18n/LanguageContext";

export const Marquee = () => {
  const { t } = useLanguage();
  const items = t("marquee");

  return (
    <section data-testid="marquee-section" aria-hidden="true" className="border-y border-border py-6 sm:py-8 overflow-hidden bg-background">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center whitespace-nowrap">
                <span className="font-serif italic font-light text-4xl sm:text-6xl tracking-tight px-6 sm:px-10">
                  {item}
                </span>
                <span className="text-primary text-2xl sm:text-4xl">&middot;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
