import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ items = [] }) {
  const { pathname } = useLocation();
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: "smooth",
    });
  }, [pathname]);

  if (!items.length) return null;

  return (
    <nav className="w-full h-12 md:h-14 bg-[#6200ee] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-x-auto">
      {/* max-w-7xl px-4/px-6 / container դասը կենտրոնացնում է բովանդակության լայնությունը, 
          իսկ ul-ը սկսվում է հենց դրա ձախ եզրից */}
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center">
        <ul className="h-full flex items-center">
          {items.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} ref={isActive ? activeRef : null} className="h-full">
                <Link
                  to={item.path}
                  className={`h-full flex items-center px-5 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#4800b8] text-white font-bold" // Ակտիվ էլեմենտի մուգ ֆոնը
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}