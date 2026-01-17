"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Work", link: "/#work" },
  { name: "Experience", link: "/#experience" },
  { name: "Skills", link: "/skills" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full p-4 sm:p-8 flex justify-between items-center z-[100] pointer-events-none">
      <Link href="/" className="pointer-events-auto">
        <div className="text-white font-bold text-xl sm:text-2xl tracking-tighter cursor-pointer">
          ASWIN<span className="text-cyan-500">ANDRO</span>
        </div>
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 pointer-events-auto items-center">
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

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden pointer-events-auto text-white/80 hover:text-cyan-400 transition-colors"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 right-4 bg-black/95 border border-white/10 backdrop-blur-xl rounded-2xl p-6 pointer-events-auto shadow-[0_0_50px_rgba(0,242,255,0.2)]">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "font-mono text-xs uppercase tracking-widest transition-all duration-300 py-2",
                  pathname === item.link 
                    ? "text-cyan-400 border-l-2 border-cyan-400 pl-3" 
                    : "text-white/50 hover:text-cyan-400 hover:pl-3"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
