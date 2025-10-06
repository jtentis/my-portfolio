import { useLocation } from "react-router";

export function Tabs() {
    const location = useLocation();

    const tabs = [
        { path: "/about"},
        { path: "/projects"},
        { path: "/"},
    ];

    return (
        <div className="flex justify-end relative">
            {[...tabs].reverse().map((tab, index) => {
                const isActive = location.pathname === tab.path;
                const originalIndex = tabs.length - 1 - index;
                return (
                    <div
                        key={tab.path}
                        className={`tab ${isActive ? "active" : ""}`}
                        style={{
                            zIndex: isActive ? tabs.length + 1 : index,
                            position: "relative",
                            right: -20 * originalIndex,
                        }}
                    >
                    </div>
                );
            })}
        </div>
    );
}
