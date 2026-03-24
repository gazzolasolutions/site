import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Lang } from "./translations";

function detectLangFromPath(pathname: string): Lang {
  if (pathname.startsWith("/es")) return "es";
  if (pathname.startsWith("/pt")) return "pt";
  return "en";
}

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLangState] = useState<Lang>(() => detectLangFromPath(window.location.pathname));

  useEffect(() => {
    setLangState(detectLangFromPath(location.pathname));
  }, [location.pathname]);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    // Strip current lang prefix from path
    let path = location.pathname;
    path = path.replace(/^\/(es|pt)/, "");
    if (!path.startsWith("/")) path = "/" + path;

    const prefix = newLang === "en" ? "" : `/${newLang}`;
    const newPath = prefix + (path === "/" ? "" : path) || "/";
    navigate(newPath + location.search + location.hash);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
