"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Work", link: "/#work" },
  { name: "Experience", link: "/#experience" },
  { name: "Skills", link: "/skills" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-[100] pointer-events-none">
      <Link href="/" className="pointer-events-auto">
        <div className="text-white font-bold text-2xl tracking-tighter cursor-pointer">
          ASWIN<span className="text-cyan-500">ANDRO</span>
        </div>
      </Link>
      <div className="flex gap-8 pointer-events-auto items-center">
        {navLinks.map((item) => (
          <Link 
            key={item.name} 
            href={item.link}
            className={cn(
              "font-mono text-xs uppercase tracking-widest transition-all duration-300",
              pathname === item.link 
                ? "text-cyan-400 border-b border-cyan-400 pb-1" 
                : "text-white/50 hover:text-cyan-400"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
