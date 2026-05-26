import { useMemo, useState } from "react";
import en from "../language/en.json";
import pt from "../language/pt.json";
import { LanguageContext } from "./LanguageContext";

type Language = "pt" | "en";

const translations = { pt, en };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const storedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    const initialLanguage: Language = 
        (storedLanguage === "pt" || storedLanguage === "en") ? storedLanguage : "pt";
    
    const [language, setLanguage] = useState<Language>(initialLanguage);
    const [isLoading, setIsLoading] = useState(false);

    const toggleLanguage = () => {
        const newLanguage = language === "pt" ? "en" : "pt";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    const value = useMemo(
        () => ({ language, toggleLanguage, t: translations[language], isLoading }),
        [language, isLoading]
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}
