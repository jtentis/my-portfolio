import clsx from "clsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TextAnimator } from "~/components/text";
import { useLanguage } from "~/hooks/useLanguage";

export function loader() {
    return new Response("Not Found", { status: 404 });
}

export default function NotFound() {
    const { t } = useLanguage();

    useEffect(() => {
        document.title = t.notFound.title;
        const descriptionMeta = document.querySelector(
            'meta[name="description"]'
        );
        if (descriptionMeta) {
            descriptionMeta.setAttribute("content", t.notFound.path);
        }
    }, [t.notFound.title, t.notFound.message]);

    const containerClasses = clsx(
        "flex flex-col items-center justify-center p-8",
        "h-full w-full text-secondary dark:text-primary"
    );

    const codeClasses =
        "font-jetbrainsmono text-4xl mb-4 font-bold text-red-700 dark:text-red-400";

    const messageClasses = "font-jetbrainsmono text-xl mb-6 text-center";

    const linkClasses = clsx(
        "navLinksInternal",
        "mt-4 flex items-center gap-2",
        "group hover:bg-secondary dark:hover:bg-primary"
    );

    return (
        <div className={containerClasses}>
            <p className={codeClasses}><TextAnimator text="ERROR 404" blinkOnEnd={true}></TextAnimator></p>
            <p className={messageClasses}>{t.notFound.message}</p>
            <p className="text-sm mb-8 text-gray-500 dark:text-gray-400">
                {t.notFound.path}
            </p>

            <Link to="/" className={linkClasses}>
                <span className="group-hover-icon-fill">
                    {t.notFound.return}
                </span>
            </Link>
        </div>
    );
}
