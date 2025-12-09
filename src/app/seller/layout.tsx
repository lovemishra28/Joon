"use client";
import { PackageIcon, ListOrderedIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/seller/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: "/seller/manageOrders",
      icon: ListOrderedIcon,
      label: "Orders",
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-100px)] bg-[#F3F4F6]">
      {/* Sidebar */}
      <aside className="w-16 sm:w-64 bg-white shadow-md flex flex-col transition-all duration-300">
        <nav className="flex-1 p-2 sm:p-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-3 justify-center sm:justify-start rounded-lg transition-colors ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title={link.label} // Tooltip for collapsed view
              >
                <link.icon className="w-6 h-6 sm:w-5 sm:h-5 shrink-0" />
                <span className="hidden sm:block font-semibold">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
