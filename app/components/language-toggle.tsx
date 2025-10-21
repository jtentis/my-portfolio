import { ReactSVG } from "react-svg";
import { useLanguage } from "~/hooks/useLanguage";

export const ToggleLanguageButton = () => {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="navLinksInternal group xl:hover:bg-secondary xl:hover:dark:bg-primary"
            type="button"
            aria-label={t.header.language}
        >
            <span className="group-hover-icon-fill flex gap-2 items-center">
                <ReactSVG
                    className="w-5"
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
