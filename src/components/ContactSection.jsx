import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const inputCls = "w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-base focus:outline-none focus:border-foreground placeholder:text-muted-foreground/60 transition-colors duration-300";
const labelCls = "block text-[10px] uppercase tracking-[0.26em] text-muted-foreground mb-1";
const langText = {
  it: { notice: "Il modulo apre la tua applicazione email con il messaggio già compilato. Per inviare la richiesta premi Invia nella tua posta.", send: "Prepara email", subject: "Messaggio dal sito L'Abrì" },
  en: { notice: "This form opens your email app with a draft. Please press Send in your mail app.", send: "Prepare email", subject: "Message from L'Abrì website" },
  fr: { notice: "Ce formulaire ouvre votre messagerie avec un brouillon. Cliquez sur Envoyer pour nous contacter.", send: "Préparer l'e-mail", subject: "Message depuis le site L'Abrì" },
  de: { notice: "Dieses Formular öffnet Ihre E-Mail-App mit einem Entwurf. Bitte klicken Sie dort auf Senden.", send: "E-Mail vorbereiten", subject: "Nachricht von L'Abrì Website" },
};
export const ContactSection = () => {
  const { t, lang } = useLanguage();
  const s = langText[lang] || langText.it;
  const [form, setForm] = useState({name:"",email:"",phone:"",message:""});
  const set = (key) => (e) => setForm(prev => ({...prev,[key]:e.target.value}));
  const submit = (e) => {
    e.preventDefault();
    const body = `Nome: ${form.name}\nEmail: ${form.email}\nTelefono: ${form.phone}\n\n${form.message}`;
    toast.info(s.notice);
    window.location.href = `mailto:booking@labri.it?subject=${encodeURIComponent(s.subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <section id="contatti" data-testid="contact-section" className="grid grid-cols-1 lg:grid-cols-2 border-b border-border">
      <div className="p-8 sm:p-14 lg:p-24 flex flex-col justify-center lg:border-r border-border">
        <span className="text-[11px] uppercase tracking-[0.3em] text-primary">{t("contact.overline")}</span>
        <h2 className="mt-6 font-serif font-light tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-tight">{t("contact.title1")}<br/>{t("contact.title2")}</h2>
        <p className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">{t("contact.intro1")} <a href="https://wa.me/393335984119" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:text-foreground">{t("contact.whatsapp")}</a>: {t("contact.intro2")}</p>
      </div>
      <div className="p-8 sm:p-14 lg:p-24">
        <p className="text-sm leading-relaxed text-muted-foreground border-l-2 border-primary pl-4 mb-8">{s.notice}</p>
        <form data-testid="contact-form" onSubmit={submit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div><label htmlFor="contact-name" className={labelCls}>{t("contact.name")}</label><input id="contact-name" data-testid="contact-name-input" required minLength={2} value={form.name} onChange={set("name")} placeholder={t("contact.namePh")} className={inputCls}/></div>
            <div><label htmlFor="contact-email" className={labelCls}>{t("contact.email")}</label><input id="contact-email" type="email" required value={form.email} onChange={set("email")} placeholder={t("contact.emailPh")} className={inputCls}/></div>
          </div>
          <div><label htmlFor="contact-phone" className={labelCls}>{t("contact.phone")}</label><input id="contact-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+39 …" className={inputCls}/></div>
          <div><label htmlFor="contact-message" className={labelCls}>{t("contact.message")}</label><textarea id="contact-message" required minLength={5} rows={5} value={form.message} onChange={set("message")} placeholder={t("contact.messagePh")} className={`${inputCls} resize-none`}/></div>
          <button type="submit" data-testid="contact-submit-button" className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-4 text-[11px] uppercase tracking-[0.24em] hover:bg-primary transition-colors duration-300"><Mail className="h-4 w-4"/>{s.send}</button>
        </form>
      </div>
    </section>
  );
};
