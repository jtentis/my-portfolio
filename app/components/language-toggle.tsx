import { ReactSVG } from "react-svg";
import { useLanguage } from "~/hooks/useLanguage";

export const ToggleLanguageButton = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="navLinksInternal group hover:bg-secondary dark:hover:bg-primary"
            type="button"
        >
            <span className="group-hover-icon-fill flex gap-2 items-center">
                <ReactSVG
                    src={
                        language === "pt"
                            ? "/flagBR.svg"
                            : "/flagUS.svg"
                    }
                ></ReactSVG>
                {language}
            </span>
        </button>
    );
};
