import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, MessageCircle } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { openConsentSettings } from "@/privacy/consent";
import { useLanguage } from "@/i18n/LanguageContext";

const SOCIAL = {
  facebook: "https://www.facebook.com/Affittacamerelabri",
  instagram: "https://www.instagram.com/abri_affittacamere_",
  whatsapp: "https://wa.me/393335984119",
  google: "https://www.google.com/maps/search/?api=1&query=Affittacamere+L+Abri+Pietraporzio",
};

export const Footer = () => {
  const { t, lang } = useLanguage();

  return (
    <footer data-testid="site-footer" className="bg-foreground text-background">
      <div className="px-5 sm:px-10 py-14 sm:py-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        <div className="col-span-2 md:col-span-1">
          <span className="inline-flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" />
            <span className="font-serif text-xl tracking-tight">L&rsquo;Abr&igrave;</span>
          </span>
          <p className="mt-4 text-background/60 leading-relaxed max-w-xs">
            {t("footer.tagline")}
          </p>
          <div className="mt-6">
            <span className="text-[10px] uppercase tracking-[0.26em] text-background/50">{t("footer.social")}</span>
            <div className="mt-3 flex items-center gap-4">
              {SOCIAL.facebook && (
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" data-testid="social-facebook" aria-label="Facebook" className="text-background/70 hover:text-background transition-colors duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {SOCIAL.instagram && (
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" data-testid="social-instagram" aria-label="Instagram" className="text-background/70 hover:text-background transition-colors duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" data-testid="social-whatsapp" aria-label="WhatsApp" className="text-background/70 hover:text-background transition-colors duration-300">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href={SOCIAL.google} target="_blank" rel="noopener noreferrer" data-testid="social-google" aria-label={t("footer.googlePage")} className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors duration-300">
                <MapPin className="h-5 w-5" />
                <span className="text-xs uppercase tracking-[0.18em]">{t("footer.googlePage")}</span>
              </a>
            </div>
          </div>
        </div>
        <nav aria-label="Collegamenti footer">
          <h3 className="text-[10px] uppercase tracking-[0.26em] text-background/50 mb-4">{t("footer.explore")}</h3>
          <ul className="space-y-2.5">
            <li><a href="/#dimora" data-testid="footer-link-dimora" className="text-background/80 hover:text-background transition-colors duration-300">{t("footer.casa")}</a></li>
            <li><a href="/#camere" data-testid="footer-link-camere" className="text-background/80 hover:text-background transition-colors duration-300">{t("footer.camere")}</a></li>
            <li><a href="/#valle" data-testid="footer-link-valle" className="text-background/80 hover:text-background transition-colors duration-300">{t("footer.valle")}</a></li>
            <li><Link to="/dove-mangiare" data-testid="footer-link-dove-mangiare" className="text-background/80 hover:text-background transition-colors duration-300">{t("footer.eat")}</Link></li>
            <li><Link to="/accesso" data-testid="footer-link-accesso" className="text-background/80 hover:text-background transition-colors duration-300">{t("footer.accesso")}</Link></li>
          </ul>
        </nav>
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.26em] text-background/50 mb-4">{t("footer.contacts")}</h3>
          <ul className="space-y-2.5 text-background/80">
            <li>Via Francia 3, Fraz. Pontebernardo</li>
            <li>12010 Pietraporzio (CN)</li>
            <li><a href="https://wa.me/393335984119" target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp-link" className="hover:text-background transition-colors duration-300">WhatsApp +39 333 598 4119</a></li>
            <li><a href="mailto:booking@labri.it" data-testid="footer-email-link" className="hover:text-background transition-colors duration-300">booking@labri.it</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.26em] text-background/50 mb-4">{t("footer.arrival")}</h3>
          <ul className="space-y-2.5 text-background/80">
            <li>{t("footer.checkin")}</li>
            <li>{t("footer.checkout")}</li>
            <li><a href="https://labriprenotazioni.bed-booking.com/" target="_blank" rel="noopener noreferrer" data-testid="footer-bed-booking-link" className="hover:text-background transition-colors duration-300">{t("footer.bed")}</a></li>
            <li><a href="https://webcam.labri.it/" target="_blank" rel="noopener noreferrer" data-testid="footer-webcam-link" className="hover:text-background transition-colors duration-300">Webcam live</a></li>
          </ul>
        </div>
      </div>

      <div className="px-5 sm:px-10 overflow-hidden border-t border-background/15">
        <h2 aria-hidden="true" className="font-serif font-light tracking-tighter leading-[0.85] text-[21vw] text-center select-none text-background/95 py-4">
          L&rsquo;ABR&Igrave;
        </h2>
      </div>
{/* Dati identificativi della struttura */}
<div className="px-5 sm:px-10 py-5 border-t border-background/15 text-center">
  <p className="text-[11px] text-background/60 tracking-[0.12em] leading-relaxed">
    Affittacamere L'Abrì di Martini Emanuel
  </p>

  <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-background/60 tracking-[0.08em]">
    <span>P.IVA: 03493740041</span>
    <span>REA: CN-294966</span>
    <span>CIR: 004167-AFF-00003</span>
    <span>CIN: IT004167B4SR5N3EAA</span>
  </div>
</div>
      <div className="px-5 sm:px-10 pb-5 text-center">
        <p className="text-[11px] leading-relaxed text-background/65 italic">
          {t("footer.petsNotice")}
        </p>
      </div>
      <div className="px-5 sm:px-10 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-background/45 border-t border-background/15">
        <span>{t("footer.rights")}</span>
        <span className="flex items-center gap-6">
          <Link to="/privacy" data-testid="footer-privacy-link" className="hover:text-background/80 transition-colors duration-300">{t("footer.privacy")}</Link>
          <button type="button" onClick={openConsentSettings} className="hover:text-background/80 transition-colors duration-300">{({it:"Preferenze cookie",en:"Cookie settings",fr:"Préférences cookies",de:"Cookie-Einstellungen"})[lang] || "Preferenze cookie"}</button>
          <span>{t("footer.place")}</span>
        </span>
      </div>
    </footer>
  );
};
