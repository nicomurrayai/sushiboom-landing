"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { MobileMenu } from "./MobileMenu";
import { NavDropdown } from "./NavDropdown";

export function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full px-4 pt-4 md:px-6 md:pt-5">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 md:px-6 md:py-4 lg:px-8 ${
            scrolled
              ? "bg-boom-dark/75 shadow-lg shadow-black/20"
              : "bg-black/30"
          }`}
          aria-label="Navegación principal"
        >
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src={siteConfig.brand.logoSrc}
              alt={siteConfig.brand.name}
              width={180}
              height={72}
              className="h-14 w-auto sm:h-16 md:h-[4.5rem]"
              priority
            />
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {siteConfig.nav.links.map((link) => (
              <NavDropdown key={link.href} link={link} />
            ))}
          </div>

          <button
            type="button"
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
