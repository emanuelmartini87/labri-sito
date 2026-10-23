import { useState } from "react";
import { motion } from "framer-motion";
import { Square } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const RoomBlock = ({ room, index, onBook }) => {
  const { t } = useLanguage();
  const rd = t(`rooms.data.${room.id}`);
  const reversed = index % 2 === 1;
  const images = [room.image_url, room.image_url_2].filter(Boolean);
  const [active, setActive] = useState(0);

  return (
    <article
      data-testid={`room-card-${room.id}`}
      className="grid grid-cols-1 lg:grid-cols-2 border-b border-border"
    >
      <div className={`relative p-3 sm:p-5 ${reversed ? "lg:order-2 lg:border-l" : "lg:border-r"} border-border`}>
        <motion.div
          initial={{ clipPath: "inset(8% 8% 8% 8%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden"
        >
          <motion.img
            key={images[active]}
            src={images[active]}
            alt={`${rd.name} — foto ${active + 1} — Affittacamere L'Abrì, Pietraporzio`}
            initial={{ scale: 1.06, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-[320px] sm:h-[440px] lg:h-[540px] w-full object-cover hover:scale-105 transition-transform duration-700"
          />
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  data-testid={`room-thumb-${room.id}-${i + 1}`}
                  onClick={() => setActive(i)}
                  aria-label={`${rd.name}: foto ${i + 1}`}
                  className={`h-14 w-20 overflow-hidden border transition-colors duration-300 ${
                    i === active ? "border-white" : "border-white/40 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className={`flex flex-col justify-center p-8 sm:p-14 lg:p-20 ${reversed ? "lg:order-1" : ""}`}>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.3em] text-primary"
        >
          {rd.category} &middot; {t("rooms.upto")} {room.capacity} {t("rooms.guests")}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-5 font-serif font-light tracking-tight text-4xl sm:text-5xl"
        >
          {rd.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-6 text-base leading-relaxed text-muted-foreground max-w-lg"
        >
          {rd.description}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-8 space-y-3"
        >
          {rd.amenities.map((a) => (
            <li key={a} className="flex items-center gap-3 text-sm">
              <Square className="h-2 w-2 fill-primary text-primary" />
              <span>{a}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href="#prenota"
            data-testid={`room-book-btn-${room.id}`}
            onClick={() => onBook(room.id)}
            className="border border-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            {t("rooms.book")}
          </a>
          <span className="text-sm text-muted-foreground">
            <span className="font-serif text-2xl text-foreground">{t("rooms.price")}</span>
            <span className="block text-xs mt-1">{t("rooms.priceNote")}</span>
          </span>
        </motion.div>
      </div>
    </article>
  );
};

export const Rooms = ({ rooms, onBook }) => {
  const { t } = useLanguage();

  return (
    <section id="camere" data-testid="rooms-section">
      <div className="px-5 sm:px-10 py-16 sm:py-24 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-border">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary">{t("rooms.overline")}</span>
          <h2 className="mt-4 font-serif font-light tracking-tight text-4xl sm:text-5xl lg:text-6xl">
            {t("rooms.title1")}<br className="hidden sm:block" /> {t("rooms.title2")}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t("rooms.intro")}
        </p>
      </div>
      {rooms.map((room, i) => (
        <RoomBlock key={room.id} room={room} index={i} onBook={onBook} />
      ))}
    </section>
  );
};
