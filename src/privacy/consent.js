export const CONSENT_KEY = "labri-privacy-consent-v1";
export const GA_ID = "G-VJ759J5GKT";
export const getConsent = () => {
  try { const v = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null"); return v && typeof v.analytics === "boolean" ? v : null; } catch { return null; }
};
let gaLoaded = false;
export function startAnalytics() {
  if (gaLoaded || !getConsent()?.analytics) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement('script'); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}
export function saveConsent(analytics) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({analytics: !!analytics, savedAt: new Date().toISOString(), version: 1}));
  window.dispatchEvent(new Event('labri-consent-change'));
  if (analytics) startAnalytics();
  else if (gaLoaded) {
    // Elimina i cookie GA accessibili al sito, poi interrompe i tag caricati.
    document.cookie.split(';').forEach(part => {
      const name = part.split('=')[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) return;
      for (const domain of [undefined, location.hostname, '.labri.it']) {
        const d = domain ? `; domain=${domain}` : '';
        document.cookie = `${name}=; Max-Age=0; path=/${d}; SameSite=Lax`;
      }
    });
    window.location.reload();
  }
}
export function openConsentSettings() {window.dispatchEvent(new Event('labri-consent-open'));}
