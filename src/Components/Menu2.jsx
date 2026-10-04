import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const menuItems = [
    { label: "Մշակույթ", path: "/career" },
    { label: "Առավելություններ", path: "/plus" },
    { label: "Հաճախ տրվող հարցեր", path: "/answers" },
    { label: "Ինչպես ընդունվել աշխատանքի  Evocabank-ում", path: "/evocawork" },
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