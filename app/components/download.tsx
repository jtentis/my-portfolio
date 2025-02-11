export const DownloadCv = ({
    children,
    pdfName = "Curriculo_JOAO_TENTIS.pdf",
    pdfLocation = "app/assets/Curriculo_JOAO_TENTIS.pdf",
}: {
    children: React.ReactNode;
    pdfName?: string;
    pdfLocation?: string;
}) => {
    const download = () => {
        const pdf: string = pdfLocation;
        const link: any = document.createElement("a");
        link.href = pdf;
        link.download = pdfName;
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
