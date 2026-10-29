import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const activeRef = useRef(null);

  const menuItems = [
    { label: "Ընդհանուր", path: "/about" },
    { label: "Կառուցվածք", path: "/structure" },
    { label: "Բաժնետերեր", path: "/shareholders" },
    { label: "Ղեկավարություն", path: "/management" },
    { label: "Գործընկերներ", path: "/partners" },
    { label: "Մրցանակներ", path: "/departments" },
    { label: "CSR", path: "/csr" },
    { label: "Էվոկա ֆինանսական խումբ", path: "/evoca-group" },
  ];

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <nav className="w-full h-12 md:h-14 bg-[#6200ee] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-x-auto">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center">
        <ul className="h-full flex items-center">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} ref={isActive ? activeRef : null} className="h-full">
                <Link
                  to={item.path}
                  className={`h-full flex items-center px-4 md:px-5 text-xs md:text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-[#4800b8] text-white font-bold"
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