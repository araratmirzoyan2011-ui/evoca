import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const menuItems = [
    { label: "Ընդհանուր", path: "/about" },
    { label: "Կառուցվածք", path: "/structure" },
    { label: "Բամբասետներ", path: "/shareholders" },
    { label: "Ղեկավարություն", path: "/management" },
    { label: "Գործընկերներ", path: "/partners" },
    { label: "Սրտանականներ", path: "/departments" },
    { label: "CSR", path: "/csr" },
    { label: "Էվկա ֆինանսական խումբ", path: "/evoca-group" },
  ];

  return (
    <nav className="w-full flex items-center h-14 bg-gradient-to-r from-[#3b0a91] via-[#5b1fc7] to-[#7b2ff2]">
      <ul className="w-full flex items-center justify-center gap-8">
        {menuItems.map((item, i) => {
          const isActive = pathname === item.path;
          return (
            <li key={i}>
              <Link
                to={item.path}
                className={`text-sm whitespace-nowrap transition-colors ${
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