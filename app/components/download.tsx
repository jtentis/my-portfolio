import React from "react";
import { useLanguage } from "~/hooks/useLanguage";

export const DownloadCv = ({ children }: { children: React.ReactNode }) => {
    const { t } = useLanguage();
    const finalPdfFile = t.curriculum.file;
    const finalPdfLocation = t.curriculum.path;

    const download = () => {
        const link = document.createElement("a");
        link.href = finalPdfLocation;
        link.download = finalPdfFile;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={download}
            className="navLinksInternal w-[130px] group xl:hover:bg-secondary xl:hover:dark:bg-primary"
            type="button"
        >
            <span className="group-hover-icon-fill flex gap-2 items-center">
                {children}
            </span>
        </button>
    );
};
