import { useLocation } from "react-router";

export function Tabs() {
    const location = useLocation();

    const tabs = [
        { path: "/", zIndex: 1 },
        { path: "/projects", zIndex: 2 },
        { path: "/about", zIndex: 1 },
    ];

    return (
        <div className="tabs-container flex justify-end relative">
            {tabs.map((tab, index) => {
                const isActive = location.pathname === tab.path;
                return (
                    <div
                        key={tab.path}
                        className={`tab ${isActive ? "active" : ""}`}
                        style={{
                            zIndex: isActive ? tabs.length + 1 : tab.zIndex,
                            position: "relative",
                            right: 15 * index - 20,
                        }}
                    >
                        <div className="tab-fill" />
                    </div>
                );
            })}
        </div>
    );
}
