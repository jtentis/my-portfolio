import React from "react";
import { useLanguage } from "~/hooks/useLanguage";

export const DownloadCv = ({ children }: { children: React.ReactNode }) => {
    const { t } = useLanguage();
    const finalPdflink = t.curriculum.link;

    return (
        <a
            href={finalPdflink}
            className="navLinksInternal w-[130px] group xl:hover:bg-secondary xl:hover:dark:bg-primary"
            type="button"
        >
            <span className="group-hover-icon-fill flex gap-2 items-center">
                {children}
            </span>
        </a>
    );
};
