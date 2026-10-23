import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { translations } from "./translations";

const LangContext = createContext(null);
const LANGS = ["it", "en", "fr", "de"];

const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl && LANGS.includes(fromUrl)) return fromUrl;
    const saved = localStorage.getItem("labri-lang");
    if (saved && LANGS.includes(saved)) return saved;
    const nav = (navigator.language || "it").slice(0, 2);
    return LANGS.includes(nav) ? nav : "it";
  });

  const setLang = (l) => {
    if (LANGS.includes(l)) {
      localStorage.setItem("labri-lang", l);
      setLangState(l);
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(
    () => (path) => get(translations[lang], path) ?? get(translations.it, path) ?? path,
    [lang]
  );

  return <LangContext.Provider value={{ lang, setLang, t, LANGS }}>{children}</LangContext.Provider>;
};

export const useLanguage = () => useContext(LangContext);
