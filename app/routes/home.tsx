import { useEffect } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router";
import { TextAnimator } from "~/components/text";
import { Title } from "~/components/title";
import { useLanguage } from "../hooks/useLanguage";

export default function Home() {
    const { t } = useLanguage();
    console.log(typeof t.home.description)

    useEffect(() => {
        document.title = t.home.title;
        const descriptionMeta = document.querySelector(
            'meta[name="description"]'
        );
        if (descriptionMeta) {
            descriptionMeta.setAttribute("content", t.home.description);
        }
    }, [t.home.title, t.home.description]);

    return (
        <div className="flex flex-col">
            <Title title={t.nav.home} />
            <div className="flex flex-col justify-center items-start h-[450px] gap-10">
                <p className="list__item-col text-3xl">
                    <TextAnimator text="$ cat welcome.txt" blinkOnEnd={true}/>
                </p>
                <p className="font-bold text-7xl">
                    <TextAnimator text="João Tentis" />
                </p>
                <p className="text-3xl">
                    <TextAnimator text={t.home.description} />
                </p>
                <Link to="/projects" className={`navLinksHome`}>
                    {t.home.button}<IoMdArrowForward className="ml-3" size={20}/>
                </Link>
            </div>
        </div>
    );
}
