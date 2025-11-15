"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Header() {
  const path = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "How It Works", path: "/dashboard/how-it-works" },
    { name: "About Us", path: "/dashboard/about" },
  ];

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image
        src={"/logo.svg"}
        width={160}
        height={100}
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
      <UserButton />
    </div>
  );
}

export default Header;
