import { siteConfig } from "@/lib/site-config";

export function OrderFab() {
  return (
    <a
      href={siteConfig.orderFab.href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full bg-boom-orange px-3 py-2 text-white shadow-md shadow-black/30 transition-all hover:scale-105 hover:shadow-xl sm:bottom-6 sm:right-6 sm:gap-2 sm:px-5 sm:py-3.5 sm:shadow-lg"
      aria-label={siteConfig.orderFab.label}
    >
      <CartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="text-xs font-bold uppercase tracking-wide sm:text-base">
        Pedir
      </span>
    </a>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className ?? "h-6 w-6"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="20" cy="20" r="1" />
      <path d="M1 2h2l2.4 12.4a2 2 0 0 0 2 1.6H19a2 2 0 0 0 2-1.6L22 7H4" />
    </svg>
  );
}
