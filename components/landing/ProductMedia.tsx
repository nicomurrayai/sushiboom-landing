"use client";

import Image from "next/image";
import { useState } from "react";

type ProductMediaProps = {
  src: string | null;
  alt: string;
};

const productImageSizes =
  "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw";

export function ProductMedia({ src, alt }: ProductMediaProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageSrc = src && failedSrc !== src ? src : null;

  if (!imageSrc) {
    return (
      <div
        className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(240,90,40,0.5),transparent_35%),#171717] px-6 text-center font-display text-2xl font-bold uppercase text-white/70"
        role="img"
        aria-label={`${alt}, imagen no disponible`}
      >
        Boom Sushi
      </div>
    );
  }

  const handleImageError = () => setFailedSrc(imageSrc);

  return (
    <div className="relative isolate aspect-[4/5] overflow-hidden bg-[#1d1d1d]">
      <Image
        src={imageSrc}
        alt=""
        aria-hidden="true"
        fill
        sizes={productImageSizes}
        className="scale-110 select-none object-cover opacity-45 blur-2xl"
        onError={handleImageError}
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={productImageSizes}
        className="z-10 scale-[0.96] object-contain transition-transform duration-500 ease-out group-hover:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-[0.96]"
        onError={handleImageError}
      />
    </div>
  );
}
