import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
            <p>inicio</p>
        </div>
    );
}
