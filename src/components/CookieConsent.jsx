import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getConsent, saveConsent, startAnalytics } from "@/privacy/consent";
const words = {
 it: {heading:"La tua privacy conta",desc:"Utilizziamo le funzioni tecniche necessarie al sito. Solo con il tuo consenso attiviamo Google Analytics per conoscere le visite. Puoi scegliere liberamente e cambiare idea in qualsiasi momento.",accept:"Accetta statistiche",reject:"Rifiuta",settings:"Personalizza",necessary:"Cookie tecnici necessari",always:"Sempre attivi",stats:"Statistiche con Google Analytics",save:"Salva le preferenze",policy:"Informativa privacy e cookie"},
 en: {heading:"Your privacy matters",desc:"We use essential website functions. We enable Google Analytics to measure visits only with your consent. You can change your choice at any time.",accept:"Accept analytics",reject:"Reject",settings:"Customize",necessary:"Essential cookies",always:"Always enabled",stats:"Google Analytics statistics",save:"Save preferences",policy:"Privacy and cookie policy"},
 fr: {heading:"Votre vie privée compte",desc:"Nous utilisons les fonctions techniques nécessaires. Google Analytics ne sera activé qu'avec votre consentement. Vous pouvez changer votre choix à tout moment.",accept:"Accepter les statistiques",reject:"Refuser",settings:"Personnaliser",necessary:"Cookies essentiels",always:"Toujours actifs",stats:"Statistiques Google Analytics",save:"Enregistrer",policy:"Confidentialité et cookies"},
 de: {heading:"Ihre Privatsphäre zählt",desc:"Wir verwenden technisch notwendige Funktionen. Google Analytics wird nur mit Ihrer Einwilligung aktiviert. Sie können Ihre Wahl jederzeit ändern.",accept:"Statistik zustimmen",reject:"Ablehnen",settings:"Anpassen",necessary:"Notwendige Cookies",always:"Immer aktiv",stats:"Google Analytics Statistiken",save:"Auswahl speichern",policy:"Datenschutz und Cookies"}
};
export function CookieConsent() {
 const {lang} = useLanguage(); const t=words[lang]||words.it;
 const [visible,setVisible]=useState(()=>!getConsent());
 const [advanced,setAdvanced]=useState(false);
 const [analytics,setAnalytics]=useState(()=>getConsent()?.analytics||false);
 useEffect(()=>{ if(getConsent()?.analytics) startAnalytics(); const open=()=>{setAnalytics(getConsent()?.analytics||false);setAdvanced(true);setVisible(true)}; window.addEventListener('labri-consent-open',open); return ()=>window.removeEventListener('labri-consent-open',open);},[]);
 const pick=(value)=>{saveConsent(value);setVisible(false);setAdvanced(false)};
 if(!visible) return null;
 return <div role="dialog" aria-modal="true" aria-label={t.heading} className="fixed inset-0 z-[9999] flex items-end justify-end bg-black/35 p-3 sm:p-6">
   <div className="w-full sm:max-w-md lg:max-w-lg bg-[#f8f5ee] text-[#293c35] shadow-2xl border border-[#e0d9cb] rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
    <p className="text-[10px] uppercase tracking-[.3em] text-[#a65d40] mb-2">L'ABRÌ · PONTEBERNARDO</p>
    <h2 className="text-2xl sm:text-3xl font-serif mb-3">{t.heading}</h2>
    <p className="text-sm leading-relaxed text-[#526259] mb-4">{t.desc}</p>
    {advanced && <div className="border-y border-[#ded8cb] py-4 mb-4 space-y-4 text-sm">
      <div className="flex justify-between gap-4"><span>{t.necessary}</span><span className="text-xs font-semibold">{t.always}</span></div>
      <label className="flex items-center justify-between gap-4 cursor-pointer"><span>{t.stats}</span><input aria-label={t.stats} className="h-5 w-5 accent-[#ab6247]" type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label>
    </div>}
    <a href="/privacy" className="block text-xs underline underline-offset-4 mb-5" onClick={()=>{setVisible(false)}}>{t.policy}</a>
    <div className="grid grid-cols-2 gap-3">
     <button type="button" onClick={()=>pick(false)} className="border border-[#b9afa0] rounded-full py-3 px-3 text-sm font-medium">{t.reject}</button>
     <button type="button" onClick={()=>pick(true)} className="bg-[#a85c40] text-white rounded-full py-3 px-3 text-sm font-medium">{t.accept}</button>
    </div>
    {advanced ? <button type="button" className="text-sm underline underline-offset-4 mt-4 mx-auto block" onClick={()=>pick(analytics)}>{t.save}</button> : <button type="button" className="text-sm underline underline-offset-4 mt-4 mx-auto block" onClick={()=>setAdvanced(true)}>{t.settings}</button>}
   </div>
 </div>;
}
