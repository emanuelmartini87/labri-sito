import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowUpRight, MapPin, CalendarDays, KeyRound, HelpCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const labels = {
  it: { title: "Guida L'Abrì", subtitle: "Link utili e contatto diretto", welcome: "Come possiamo aiutarti? Scegli un collegamento. Per parlare con noi usa WhatsApp.", booking: "Prenota e verifica disponibilità", access: "Istruzioni per il check-in", domotica: "Domotica camere", location: "Come raggiungerci", whatsapp: "Scrivici su WhatsApp", note: "Questa guida non è un assistente AI e non accede alle prenotazioni.", open: "Apri guida", close: "Chiudi guida" },
  en: { title: "L'Abrì guide", subtitle: "Useful links and direct contact", welcome: "How can we help? Choose a link. For a personal reply, contact us via WhatsApp.", booking: "Book and check availability", access: "Check-in instructions", domotica: "Room controls", location: "How to find us", whatsapp: "Chat via WhatsApp", note: "This guide is not an AI assistant and cannot access bookings.", open: "Open guide", close: "Close guide" },
  fr: { title: "Guide L'Abrì", subtitle: "Liens et contact direct", welcome: "Comment vous aider ? Choisissez un lien. Contactez-nous via WhatsApp pour une réponse personnalisée.", booking: "Réserver et voir les disponibilités", access: "Instructions d'arrivée", domotica: "Domotique des chambres", location: "Comment venir", whatsapp: "Écrire via WhatsApp", note: "Ce guide n'est pas un assistant IA et n'accède pas aux réservations.", open: "Ouvrir le guide", close: "Fermer le guide" },
  de: { title: "L'Abrì Wegweiser", subtitle: "Hilfreiche Links und Kontakt", welcome: "Wie können wir helfen? Wählen Sie einen Link. Für eine direkte Antwort nutzen Sie WhatsApp.", booking: "Buchen und Verfügbarkeit prüfen", access: "Check-in-Anleitung", domotica: "Zimmersteuerung", location: "Anfahrt", whatsapp: "Per WhatsApp schreiben", note: "Dies ist kein KI-Assistent und hat keinen Zugriff auf Buchungen.", open: "Wegweiser öffnen", close: "Wegweiser schließen" },
};
export const ChatWidget = () => {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.it;
  const [open, setOpen] = useState(false);
  const items = [
    { label: t.booking, href: "https://labriprenotazioni.bed-booking.com/", Icon: CalendarDays, external: true },
    { label: t.access, href: "/accesso", Icon: KeyRound },
    { label: t.domotica, href: "/domotica", Icon: HelpCircle },
    { label: t.location, href: "/#dove-siamo", Icon: MapPin },
    { label: t.whatsapp, href: "https://wa.me/393335984119", Icon: MessageCircle, external: true },
  ];
  return <>
    <AnimatePresence>
      {open && <motion.div initial={{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:24,scale:.98}} transition={{duration:.3}} className="fixed bottom-24 right-5 z-50 w-[min(24rem,calc(100vw-2.5rem))] bg-background border border-foreground/15 shadow-2xl overflow-hidden" data-testid="guide-panel">
        <div className="bg-foreground text-background px-4 py-4 flex items-center gap-3"><MessageCircle className="h-5 w-5"/><span className="flex-1"><strong className="block text-sm">{t.title}</strong><small className="text-background/60">{t.subtitle}</small></span><button type="button" onClick={()=>setOpen(false)} aria-label={t.close}><X className="h-5 w-5"/></button></div>
        <div className="p-5"><p className="text-sm text-muted-foreground leading-relaxed mb-5">{t.welcome}</p><nav className="space-y-2">
          {items.map(({label,href,Icon,external})=><a key={href} href={href} {...(external ? {target:"_blank",rel:"noopener noreferrer"} : {})} onClick={()=>setOpen(false)} className="flex items-center gap-3 border border-border px-4 py-3 text-sm hover:border-primary hover:text-primary transition-colors"><Icon className="h-4 w-4 shrink-0"/><span className="flex-1">{label}</span><ArrowUpRight className="h-4 w-4"/></a>)}
        </nav><p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t.note}</p></div>
      </motion.div>}
    </AnimatePresence>
    <button type="button" data-testid="chat-toggle-button" onClick={()=>setOpen(v=>!v)} aria-label={open?t.close:t.open} className="fixed right-5 bottom-5 z-50 w-14 h-14 flex justify-center items-center shadow-xl bg-foreground text-background hover:bg-primary transition-colors duration-300">{open?<X className="h-6 w-6"/>:<MessageCircle className="h-6 w-6"/>}</button>
  </>;
};
