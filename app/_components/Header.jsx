"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const path = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "How It Works", path: "/dashboard/how-it-works" },
    { name: "About Us", path: "/dashboard/about" },
  ];

  const handleNavClick = (itemPath) => {
    router.push(itemPath);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="flex p-4 items-center justify-between bg-secondary shadow-sm relative z-50">
        <Image
          src="/logo.svg"
          width={120}
          height={80}
          alt="logo"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <li
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === item.path && "text-primary font-bold"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Mobile & Desktop Right Section */}
        <div className="flex items-center gap-3">
          <UserButton />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg absolute top-[72px] left-0 right-0 z-40">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-6 py-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 ${
                  path === item.path
                    ? "bg-indigo-50 text-primary font-bold"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Header;
