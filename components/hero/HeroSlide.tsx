import Image from "next/image";
import Link from "next/link";
import type { HeroSlide as HeroSlideType } from "@/lib/site-config";

type HeroSlideProps = {
  slide: HeroSlideType;
  priority?: boolean;
};

export function HeroSlide({ slide, priority = false }: HeroSlideProps) {
  return (
    <div className="relative min-h-screen w-full flex-[0_0_100%]">
      <Image
        src={slide.image}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center md:px-8">
        <div className="mx-auto max-w-4xl">
          <span className="mb-4 inline-block rounded-md bg-boom-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-boom-dark md:text-sm">
            {slide.badge}
          </span>

          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-7xl">
            {slide.title}
          </h1>

          <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-white/90 sm:text-base md:mt-4 md:text-lg">
            {slide.subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            {slide.ctas.map((cta) => {
              const className =
                cta.variant === "primary"
                  ? "w-full rounded-full bg-boom-orange px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-boom-orange/90 hover:scale-105 sm:w-auto"
                  : "w-full rounded-full border-2 border-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-white/10 hover:scale-105 sm:w-auto";

              if (cta.href.startsWith("http")) {
                return (
                  <a
                    key={cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {cta.label}
                  </a>
                );
              }

              return (
                <Link key={cta.label} href={cta.href} className={className}>
                  {cta.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
