export function Title({ title }: { title: string }) {
    return (
        <div className="flex row w-full xl:justify-between justify-start">
            <div className="flex gap-1">
                <div className="h-3 w-3 mt-1 rounded-full border border-foreground bg-card"></div>
                <div className="h-3 w-3 mt-1 rounded-full border border-foreground bg-card"></div>
                <div className="h-3 w-3 mt-1 rounded-full border border-foreground bg-card"></div>
            </div>
            <h1 className="font-bold w-20 px-2 xl:px-0">~{title}</h1>
            <div className="2xl:w-8/9 border-b-2 self-center border-dashed border-secondary/20 dark:border-primary/20" />
        </div>
    );
}
