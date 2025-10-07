export function Title({title}:{title: string}) {
    return (
        <div className="flex flex-col justify-between">
            <div className="mb-5">
                <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <div className="h-2.5 w-2.5 mt-1 rounded-full border border-foreground bg-card"></div>
                    <div className="flex row w-full justify-around">   
                    <h1 className="font-bold">~{title}</h1>
                    <div className="w-[90%] border-b-2 self-center border-dashed border-secondary/20 dark:border-primary/20" />
                    </div>
                </div>
            </div>
        </div>
    );
}