import React from "react";
import { useLanguage } from "~/hooks/useLanguage";

export const DownloadCv = ({
    children,
}: {
    children: React.ReactNode;
}) => {
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
            className="navLinksInternal flex gap-2 items-center"
            type="button"
        >
            {children}
        </button>
    );
};