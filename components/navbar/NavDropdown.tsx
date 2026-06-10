"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavLink } from "@/lib/site-config";

type NavDropdownProps = {
  link: NavLink;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

export function NavDropdown({
  link,
  onNavigate,
  variant = "desktop",
}: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  if (!link.children?.length) {
    return (
      <Link
        href={link.href}
        onClick={onNavigate}
        className="text-sm font-medium text-white transition-colors hover:text-boom-orange"
      >
        {link.label}
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between text-left text-lg font-medium text-white transition-colors hover:text-boom-orange"
          aria-expanded={open}
        >
          {link.label}
          <ChevronIcon className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="flex flex-col gap-2 border-l border-white/20 pl-4">
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                className="text-base text-white transition-colors hover:text-boom-orange"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-white transition-colors hover:text-boom-orange"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {link.label}
        <ChevronIcon className="transition-transform group-hover:rotate-180" />
      </button>
      <div
        className={`absolute left-0 top-full z-50 min-w-[180px] pt-2 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-lg border border-white/10 bg-boom-dark/95 shadow-xl backdrop-blur-md">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className="block px-4 py-2.5 text-sm text-white transition-colors hover:bg-white/5 hover:text-boom-orange"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${className ?? ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
