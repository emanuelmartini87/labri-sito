import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpRight, Mail, MessageCircle, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const labelCls = "block text-[10px] uppercase tracking-[0.26em] text-muted-foreground mb-1";
const inputCls = "w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-base focus:outline-none focus:border-foreground placeholder:text-muted-foreground/60 transition-colors duration-300";
const BEDBOOKING = "https://labriprenotazioni.bed-booking.com/";
const info = {
  it: { title: "Richiesta informazioni", notice: "Questo modulo prepara un'email: dovrai confermare l'invio nella tua app di posta. Non effettua prenotazioni e non verifica le disponibilità. Per prenotare subito, usa BedBooking.", send: "Prepara email di richiesta", whatsapp: "Invia richiesta via WhatsApp", status: "Disponibilità e tariffe aggiornate su BedBooking", help: "Si aprirà la tua applicazione email: ricordati di premere Invia.", bad: "Seleziona date corrette: l'uscita deve essere dopo l'arrivo.", subject: "Richiesta soggiorno L'Abrì", mailNote: "RICHIESTA, NON PRENOTAZIONE CONFERMATA", tip: "Per prenotare con conferma e prezzi aggiornati:", dateMissing: "Seleziona entrambe le date." },
  en: { title: "Accommodation enquiry", notice: "This form prepares an email; you must send it from your mail app. It does not book a room or check live availability. Use BedBooking to reserve.", send: "Prepare enquiry email", whatsapp: "Send via WhatsApp", status: "Live availability and prices on BedBooking", help: "Your email app will open. Remember to press Send.", bad: "Check your dates: departure must be later than arrival.", subject: "L'Abrì stay enquiry", mailNote: "ENQUIRY, NOT CONFIRMED BOOKING", tip: "For instant booking and up-to-date prices:", dateMissing: "Select both dates." },
  fr: { title: "Demande de séjour", notice: "Ce formulaire prépare un e-mail : vous devrez l'envoyer depuis votre messagerie. Il ne réserve pas de chambre et ne vérifie pas les disponibilités. Pour réserver, utilisez BedBooking.", send: "Préparer l'e-mail", whatsapp: "Envoyer via WhatsApp", status: "Disponibilités et tarifs actualisés sur BedBooking", help: "Votre application e-mail va s'ouvrir : pensez à cliquer sur Envoyer.", bad: "Vérifiez les dates : le départ doit être après l'arrivée.", subject: "Demande de séjour L'Abrì", mailNote: "DEMANDE, PAS UNE RÉSERVATION CONFIRMÉE", tip: "Pour réserver avec les prix à jour :", dateMissing: "Sélectionnez les deux dates." },
  de: { title: "Aufenthaltsanfrage", notice: "Dieses Formular bereitet eine E-Mail vor, die Sie in Ihrer E-Mail-App selbst absenden müssen. Es bucht kein Zimmer und prüft keine Verfügbarkeit. Buchen Sie über BedBooking.", send: "Anfrage-E-Mail vorbereiten", whatsapp: "Per WhatsApp anfragen", status: "Aktuelle Verfügbarkeit und Preise bei BedBooking", help: "Ihre E-Mail-App öffnet sich. Bitte denken Sie daran, auf Senden zu klicken.", bad: "Bitte prüfen Sie die Daten: Abreise muss nach Anreise liegen.", subject: "L'Abrì Aufenthaltsanfrage", mailNote: "ANFRAGE, KEINE BESTÄTIGTE BUCHUNG", tip: "Für direkte Buchung und aktuelle Preise:", dateMissing: "Bitte beide Daten wählen." },
};

export const Booking = ({ rooms, selectedRoom, setSelectedRoom }) => {
  const { t, lang } = useLanguage();
  const ui = info[lang] || info.it;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const room = rooms.find((r) => r.id === selectedRoom) || rooms[0];
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.round((Date.parse(checkOut + "T12:00:00") - Date.parse(checkIn + "T12:00:00")) / 86400000);
  }, [checkIn, checkOut]);
  if (!room) return null;
  const roomData = t(`rooms.data.${room.id}`);
  const label = (r) => {
    const rd = t(`rooms.data.${r.id}`);
    return `${rd.name} — ${rd.category} (${t("booking.maxGuests")} ${r.capacity} ${t("rooms.guests")})`;
  };
  const message = [ui.mailNote, "", `${t("booking.room")}: ${roomData.name}`, `${t("booking.checkin")}: ${checkIn}`, `${t("booking.checkout")}: ${checkOut}`, `${t("booking.guests")}: ${guests}`, `${t("booking.name")}: ${name}`, `${t("booking.email")}: ${email}`, `${t("booking.phone")}: ${phone}`, `${t("booking.notes")}: ${notes}`, "", "Richiesta inviata dal sito L'Abrì"].join("\n");
  const validate = () => {
    if (!checkIn || !checkOut) { toast.error(ui.dateMissing); return false; }
    if (nights <= 0 || checkIn < today) { toast.error(ui.bad); return false; }
    return true;
  };
  const sendMail = (e) => {
    e.preventDefault();
    if (!validate()) return;
    toast.info(ui.help);
    window.location.href = `mailto:booking@labri.it?subject=${encodeURIComponent(ui.subject)}&body=${encodeURIComponent(message)}`;
  };
  const whatsapp = () => {
    if (!validate()) return;
    window.open(`https://wa.me/393335984119?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="prenota" data-testid="booking-section" className="bg-accent border-b border-border">
      <div className="px-5 sm:px-10 py-16 sm:py-24 border-b border-foreground/10">
        <span className="text-[11px] uppercase tracking-[0.3em] text-primary">{t("booking.overline")}</span>
        <h2 className="mt-4 font-serif font-light tracking-tight text-4xl sm:text-5xl lg:text-6xl">{t("booking.title")}</h2>
        <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">{t("booking.intro")}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 sm:p-14 lg:p-20 lg:border-r border-foreground/10">
          <div className="mb-8 border-l-2 border-primary pl-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{ui.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ui.notice}</p>
          </div>
          <form data-testid="booking-form" onSubmit={sendMail} className="space-y-7">
            <div>
              <label htmlFor="booking-room" className={labelCls}>{t("booking.room")}</label>
              <div className="relative">
                <select id="booking-room" data-testid="booking-room-select" value={room.id} onChange={(e) => {setSelectedRoom(e.target.value);setGuests(Math.min(guests,rooms.find(r=>r.id===e.target.value)?.capacity || 2));}} className={`${inputCls} appearance-none cursor-pointer`}>
                  {rooms.map(r => <option key={r.id} value={r.id}>{label(r)}</option>)}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div><label htmlFor="booking-checkin" className={labelCls}>{t("booking.checkin")}</label><input id="booking-checkin" type="date" required min={today} value={checkIn} onChange={e=>setCheckIn(e.target.value)} className={inputCls}/></div>
              <div><label htmlFor="booking-checkout" className={labelCls}>{t("booking.checkout")}</label><input id="booking-checkout" type="date" required min={checkIn || today} value={checkOut} onChange={e=>setCheckOut(e.target.value)} className={inputCls}/></div>
            </div>
            <div><label htmlFor="booking-guests" className={labelCls}>{t("booking.guests")}</label><select id="booking-guests" value={guests} onChange={e=>setGuests(Number(e.target.value))} className={inputCls}>{Array.from({length: room.capacity},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}</select></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div><label htmlFor="booking-name" className={labelCls}>{t("booking.name")}</label><input id="booking-name" value={name} onChange={e=>setName(e.target.value)} required minLength={2} className={inputCls}/></div>
              <div><label htmlFor="booking-phone" className={labelCls}>{t("booking.phone")}</label><input id="booking-phone" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} className={inputCls}/></div>
            </div>
            <div><label htmlFor="booking-email" className={labelCls}>{t("booking.email")}</label><input id="booking-email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} className={inputCls}/></div>
            <div><label htmlFor="booking-notes" className={labelCls}>{t("booking.notes")}</label><textarea id="booking-notes" rows={3} value={notes} onChange={e=>setNotes(e.target.value)} className={`${inputCls} resize-none`}/></div>
            <div className="flex flex-wrap gap-3">
              <button type="submit" data-testid="booking-submit-button" className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-primary transition-colors duration-300"><Mail className="h-4 w-4"/>{ui.send}</button>
              <button type="button" onClick={whatsapp} className="inline-flex items-center gap-2 border border-foreground px-6 py-4 text-[11px] uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors duration-300"><MessageCircle className="h-4 w-4" />{ui.whatsapp}</button>
            </div>
          </form>
        </div>
        <div className="p-8 sm:p-14 lg:p-20 flex flex-col justify-center">
          <motion.div key={room.id} initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
            <div className="relative overflow-hidden"><img src={room.image_url} alt={roomData.name} loading="lazy" className="w-full h-[290px] sm:h-[400px] object-cover" /></div>
            <div className="mt-7 flex justify-between items-center gap-3 border-b border-foreground/20 pb-5"><h3 className="font-serif font-light text-3xl">{roomData.name}</h3><span className="text-xs text-muted-foreground">{t("rooms.upto")} {room.capacity} {t("rooms.guests")}</span></div>
            <div className="mt-5 flex gap-3 text-muted-foreground"><CalendarDays className="h-5 w-5 text-primary shrink-0"/><span className="text-sm">{ui.status}{nights>0 ? ` · ${nights} ${t("booking.nights")}` : ""}</span></div>
            <div className="mt-9 border-t border-foreground/20 pt-7"><p className="text-sm text-muted-foreground mb-4">{ui.tip}</p><a href={BEDBOOKING} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-foreground px-7 py-4 text-[11px] uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition-colors duration-300">{t("booking.bedCta")} <ArrowUpRight className="h-4 w-4"/></a></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
