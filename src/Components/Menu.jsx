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

  // էջը բացելիս ակտիվ կետը բերում է տեսադաշտ (օգտակար է մոբայլում)
  useEffect(() => {
    activeRef.current?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <nav
      className="w-full h-12 md:h-14 overflow-x-auto bg-gradient-to-r from-[#3b0a91] via-[#5b1fc7] to-[#7b2ff2]
                 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="h-full w-max mx-auto flex items-center gap-5 px-4 md:gap-8">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li key={item.path} ref={isActive ? activeRef : null}>
              <Link
                to={item.path}
                className={`block py-2 text-[13px] md:text-sm whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-purple-100/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}