import { useEffect } from "react";

// Aggiorna titoli e metadata delle pagine interne della SPA.
// La homepage conserva i metadati statici definiti in index.html.
export const useSeo = ({ title, description, noindex = false }) => {
  useEffect(() => {
    const origin = "https://www.labri.it";
    const path = window.location.pathname;
    const canonicalPath = ["/accesso", "/dove-mangiare", "/privacy", "/domotica"].includes(path)
      ? path : "/";
    const canonical = origin + canonicalPath;
    const pageDescription = description || `${title}. Informazioni e servizi dell'Affittacamere L'Abrì a Pontebernardo, Pietraporzio, in Valle Stura.`;

    const touched = [];
    const setMeta = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (!element) return;
      const oldValue = element.getAttribute(attribute);
      touched.push({ element, attribute, oldValue });
      element.setAttribute(attribute, value);
    };

    const oldTitle = document.title;
    document.title = title;
    setMeta('meta[name="description"]', "content", pageDescription);
    setMeta('meta[name="robots"]', "content", noindex
      ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");
    setMeta('link[rel="canonical"]', "href", canonical);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", pageDescription);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", pageDescription);

    return () => {
      document.title = oldTitle;
      for (const { element, attribute, oldValue } of touched) {
        if (oldValue === null) element.removeAttribute(attribute);
        else element.setAttribute(attribute, oldValue);
      }
    };
  }, [title, description, noindex]);
};
