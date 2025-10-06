import { createContext } from "react";
import pt from "../language/pt.json";

type Language = "pt" | "en";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: typeof pt;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
