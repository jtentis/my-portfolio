import { useEffect, useState } from "react";
import en from "../language/en.json";
import pt from "../language/pt.json";
import { LanguageContext } from "./LanguageContext";

type Language = "pt" | "en";

const translations = { pt, en };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("pt");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage && (storedLanguage === "pt" || storedLanguage === "en")) {
            setLanguage(storedLanguage);
        }
        setIsLoading(false);
    }, []);

    const toggleLanguage = () => {
        const newLanguage = language === "pt" ? "en" : "pt";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language], isLoading }}>
            {children}
        </LanguageContext.Provider>
    );
}
