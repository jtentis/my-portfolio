import { Link } from "react-router";

export function Header() {
    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <header className="bg-primary text-secondary dark:bg-secondary dark:text-primary p-4 flex justify-between">
                <h1 className="text-lg font-bold">My Website</h1>
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:underline">
                                About Me
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className="hover:underline">
                                Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </main>
    );
}
