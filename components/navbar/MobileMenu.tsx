"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import { NavDropdown } from "./NavDropdown";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        id="mobile-menu"
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(100%,320px)] flex-col bg-boom-dark shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <span className="font-display text-lg font-bold tracking-wide text-white">
            MENÚ
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Cerrar menú"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-5 overflow-y-auto px-6 py-6 pb-8">
          {siteConfig.nav.links.map((link) => (
            <NavDropdown
              key={link.href}
              link={link}
              variant="mobile"
              onNavigate={onClose}
            />
          ))}
        </nav>
      </div>
    </>
  );
}
