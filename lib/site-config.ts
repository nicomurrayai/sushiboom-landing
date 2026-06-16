export type NavLink = {
  label: string;
  href: string;
  highlight?: boolean;
  children?: { label: string; href: string }[];
};

export type HeroCta = {
  label: string;
  href: string;
  variant: "primary" | "outline";
};

export type HeroSlide = {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  ctas: HeroCta[];
};

const orderUrl = "https://www.cartasboom.com/";

export const siteConfig = {
  brand: {
    name: "BOOM SUSHI",
    logoSrc: "/logo.png",
  },
  nav: {
    links: [
      {
        label: "Menú",
        href: "#menu",
        children: [
          { label: "Combos", href: "#combos" },
          { label: "Rolls", href: "#rolls" },
          { label: "Entradas", href: "#entradas" },
          { label: "Bebidas", href: "#bebidas" },
        ],
      },
      { label: "Promociones", href: "#promociones" },
      { label: "Franquicias", href: "#franquicias", highlight: true },
      { label: "Delivery", href: "#delivery" },
      { label: "Contacto", href: "#contacto" },
    ] satisfies NavLink[],
  },
  heroSlides: [
    {
      image: "/slide-1.webp",
      badge: "¡APROVECHÁ!",
      title: "PROMO DE LA SEMANA",
      subtitle: "EN COMBOS SELECCIONADOS",
      ctas: [
        { label: "VER COMBOS", href: "#combos", variant: "primary" },
        { label: "PEDÍ ONLINE", href: orderUrl, variant: "outline" },
      ],
    },
    {
      image: "/slide-2.webp",
      badge: "NUEVO",
      title: "ROLLS PREMIUM",
      subtitle: "SABOR INTENSO EN CADA BOCADO",
      ctas: [
        { label: "VER MENÚ", href: "#menu", variant: "primary" },
        { label: "PEDÍ ONLINE", href: orderUrl, variant: "outline" },
      ],
    },
    {
      image: "/slide-3.webp",
      badge: "VEGGIE",
      title: "OPCIONES VEGGIE",
      subtitle: "SABOR SIN LÍMITES PARA TODOS",
      ctas: [
        { label: "VER CARTA", href: "#menu", variant: "primary" },
        { label: "PEDÍ ONLINE", href: orderUrl, variant: "outline" },
      ],
    },
    {
      image: "/slide-4.webp",
      badge: "DELIVERY",
      title: "LLEVALO A CASA",
      subtitle: "PEDÍ Y RECIBÍ EN MINUTOS",
      ctas: [
        { label: "PEDIR AHORA", href: orderUrl, variant: "primary" },
        { label: "VER ZONAS", href: "#delivery", variant: "outline" },
      ],
    },
  ] satisfies HeroSlide[],
  orderUrl,
  whatsapp: {
    label: "Pedir",
    href: orderUrl,
  },
} as const;
