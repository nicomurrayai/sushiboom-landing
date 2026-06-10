type HeroControlsProps = {
  slideCount: number;
  selectedIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
};

export function HeroControls({
  slideCount,
  selectedIndex,
  onPrev,
  onNext,
  onDotClick,
}: HeroControlsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 md:left-6 md:h-12 md:w-12"
        aria-label="Slide anterior"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 md:right-6 md:h-12 md:w-12"
        aria-label="Slide siguiente"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-10"
        role="tablist"
        aria-label="Slides del carrusel"
      >
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`Ir al slide ${index + 1}`}
            onClick={() => onDotClick(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-boom-orange"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </>
  );
}
