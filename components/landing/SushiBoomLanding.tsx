import Image from "next/image";
import type { LacartaMenuData, LacartaProduct } from "@/lib/lacarta";
import { LACARTA_MENU_URL } from "@/lib/lacarta";
import { ContactInquiryForm } from "./ContactInquiryForm";

type SushiBoomLandingProps = {
  menuData: LacartaMenuData | null;
  error: string | null;
};

type ProductGroup = {
  category: string;
  id: string;
  products: LacartaProduct[];
};

const brandAssets = {
  combos: "https://sushiboom.com.ar/wp-content/uploads/2021/08/Banner1.png",
  promos:
    "https://sushiboom.com.ar/wp-content/uploads/2021/08/Banner-Promos-de-la-Semana.png",
  rolls: "https://sushiboom.com.ar/wp-content/uploads/2021/08/BannerRollsGourmet.png",
  calientes:
    "https://sushiboom.com.ar/wp-content/uploads/2021/08/BannerCalientes.png",
  greenBoom:
    "https://sushiboom.com.ar/wp-content/uploads/2021/08/Logo-Green-Boom.png",
  instagram:
    "https://sushiboom.com.ar/wp-content/uploads/2021/09/LogoInstagram-e1630513411745.png",
  facebook:
    "https://sushiboom.com.ar/wp-content/uploads/2021/09/LogoFacebook-e1630513453407.png",
};

const categoryAnchorMap: Record<string, string> = {
  Combos: "combos",
  Bebidas: "bebidas",
  Calientes: "calientes",
  Postres: "postres",
  Salsas: "salsas",
  "Menu Mediodia": "menu-mediodia",
  "Rolls Especiales": "rolls-especiales",
  "Rolls Clasicos": "rolls-clasicos",
  "Rolls Vegetarianos": "rolls-vegetarianos",
  "Piezas Especiales": "piezas-especiales",
};

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function SushiBoomLanding({ menuData, error }: SushiBoomLandingProps) {
  const products = menuData?.products ?? [];
  const visibleProducts = products.filter((product) => product.show !== false);
  const groups = groupProducts(visibleProducts, menuData?.business.categoryOrder);
  const businessName = menuData?.business.name ?? "Sushiboom - Palermo";
  const rolls = visibleProducts.filter((product) =>
    product.category.toLowerCase().includes("roll"),
  );
  const veggie = visibleProducts.filter((product) =>
    product.category.toLowerCase().includes("vegetar"),
  );
  const calientes = visibleProducts.filter((product) =>
    ["calientes", "piezas especiales", "salsas"].includes(
      product.category.toLowerCase(),
    ),
  );

  return (
    <>
      <BrandIntro productCount={visibleProducts.length} businessName={businessName} />
      <BrandBanners />
      <ProductMenu groups={groups} products={visibleProducts} error={error} />
      <RollsSection products={rolls.slice(0, 6)} />
      <HotSection products={calientes.slice(0, 6)} />
      <GreenBoomSection products={veggie.slice(0, 4)} />
      <DeliverySection businessName={businessName} />
      <FranchiseSection />
      <ContactFooter />
    </>
  );
}

function BrandIntro({
  productCount,
  businessName,
}: {
  productCount: number;
  businessName: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#111] px-4 py-16 sm:px-6 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-boom-orange/70 to-transparent" />
      <div className="absolute -right-32 top-12 h-80 w-80 rounded-full bg-boom-orange/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-boom-yellow/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-boom-yellow">
            Sushi Boom Palermo
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-white sm:text-5xl md:text-6xl">
            Elegi el combo que te hace feliz.
          </h2>
        </div>

        <div className="max-w-2xl lg:ml-auto">
          <p className="text-lg leading-8 text-white/74 sm:text-xl">
            Frescura, calidad y sabor en una carta pensada para pedir facil:
            rolls especiales, combos generosos, calientes y opciones veggie de{" "}
            {businessName}.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full bg-boom-orange px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-boom-orange/90"
            >
              Ver carta
            </a>
            <a
              href={LACARTA_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white/45 hover:bg-white/10"
            >
              Pedir online
            </a>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
            {productCount > 0
              ? `${productCount} productos disponibles`
              : "Carta online disponible"}
          </p>
        </div>
      </div>
    </section>
  );
}

function BrandBanners() {
  return (
    <section id="promociones" className="scroll-mt-28 bg-boom-dark px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
        <BannerCard
          image={brandAssets.combos}
          title="Combos Sushi Boom"
          copy="La frescura de cada pieza en formatos para compartir."
          href="#combos"
          cta="Ver combos"
          priority
        />
        <BannerCard
          image={brandAssets.promos}
          title="Promos de la semana"
          copy="Destacados de la carta a un precio pensado para vos."
          href="#promociones"
          cta="Ver promos"
        />
        <BannerCard
          image={brandAssets.rolls}
          title="Rolls gourmet"
          copy="Especiales de Sushi Boom con sabores intensos."
          href="#rolls"
          cta="Ver rolls"
        />
      </div>
    </section>
  );
}

function BannerCard({
  image,
  title,
  copy,
  href,
  cta,
  priority = false,
}: {
  image: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
  priority?: boolean;
}) {
  return (
    <article className="group relative min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-black">
      <Image
        src={image}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-6">
        <h3 className="font-display text-4xl font-bold uppercase leading-none text-white">
          {title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">{copy}</p>
        <a
          href={href}
          className="mt-6 inline-flex w-fit items-center rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-boom-dark transition hover:bg-boom-yellow"
        >
          {cta}
        </a>
      </div>
    </article>
  );
}

function ProductMenu({
  groups,
  products,
  error,
}: {
  groups: ProductGroup[];
  products: LacartaProduct[];
  error: string | null;
}) {
  return (
    <section id="menu" className="bg-[#f7f3ed] px-4 py-16 text-boom-dark sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-boom-orange">
              Carta
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none sm:text-5xl md:text-6xl">
              La carta de Palermo, lista para pedir.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-black/65 lg:ml-auto">
            Navega por categorias y encontra tus piezas favoritas: rolls,
            combos, bebidas, calientes, postres y opciones vegetarianas.
          </p>
        </div>

        {error ? (
          <MenuError />
        ) : products.length === 0 ? (
          <EmptyMenu />
        ) : (
          <>
            <nav
              className="mt-10 flex gap-2 overflow-x-auto pb-3"
              aria-label="Categorias de la carta"
            >
              {groups.map((group) => (
                <a
                  key={group.category}
                  href={`#${group.id}`}
                  className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-black/70 transition hover:border-boom-orange hover:text-boom-orange"
                >
                  {group.category}
                </a>
              ))}
            </nav>

            <div className="mt-10 space-y-16">
              {groups.map((group) => (
                <section key={group.category} id={group.id} className="scroll-mt-28">
                  <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-boom-orange">
                        {group.products.length} opciones
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-bold uppercase leading-none sm:text-4xl">
                        {group.category}
                      </h3>
                    </div>
                    <a
                      href={LACARTA_MENU_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit rounded-full bg-boom-dark px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-boom-orange"
                    >
                      Pedir
                    </a>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: LacartaProduct }) {
  const imageSrc = getProductImage(product);

  return (
    <article className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1d1d1d]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(240,90,40,0.5),transparent_35%),#171717] px-6 text-center font-display text-2xl font-bold uppercase text-white/70">
            Boom Sushi
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-lg font-bold leading-tight text-black">{product.name}</h4>
          <p className="shrink-0 rounded-full bg-boom-yellow px-3 py-1 text-sm font-bold text-black">
            {priceFormatter.format(product.price)}
          </p>
        </div>
        {product.description ? (
          <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-black/60">
            {product.description}
          </p>
        ) : (
          <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-black/45">
            Preparado con el sello de Sushi Boom.
          </p>
        )}
      </div>
    </article>
  );
}

function RollsSection({ products }: { products: LacartaProduct[] }) {
  return (
    <section id="rolls" className="scroll-mt-28 bg-boom-dark px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-black">
          <Image
            src={brandAssets.rolls}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-boom-yellow">
            Rolls gourmet
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-white sm:text-5xl md:text-6xl">
            Especiales con caracter Boom.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
            Selecciones frescas, piezas generosas y combinaciones pensadas para
            repetir.
          </p>
          <MiniProductList products={products} />
        </div>
      </div>
    </section>
  );
}

function HotSection({ products }: { products: LacartaProduct[] }) {
  return (
    <section id="entradas" className="scroll-mt-28 bg-[#15110f] px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-boom-yellow">
              Calientes
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-white sm:text-5xl md:text-6xl">
              Sabores de alta temperatura.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
              Rebozados, piezas especiales y salsas para arrancar el pedido con
              intensidad.
            </p>
            <MiniProductList products={products} />
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-white/10 bg-black">
            <Image
              src={brandAssets.calientes}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GreenBoomSection({ products }: { products: LacartaProduct[] }) {
  return (
    <section id="veggie" className="scroll-mt-28 bg-[#102217] px-4 py-16 text-white sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div>
          <div className="relative h-24 w-56">
            <Image
              src={brandAssets.greenBoom}
              alt="Green Boom"
              fill
              sizes="224px"
              className="object-contain object-left"
            />
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-none sm:text-5xl md:text-6xl">
            Fresco, natural, veggie.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/72">
            Opciones verdes con el mismo pulso de Sushi Boom: sabor claro,
            textura y mucha frescura.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <a
              href={LACARTA_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/15 bg-white/10 p-6 text-white transition hover:bg-white/15 sm:col-span-2"
            >
              Ver opciones veggie en la carta online
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function DeliverySection({ businessName }: { businessName: string }) {
  return (
    <section id="delivery" className="scroll-mt-28 bg-[#f7f3ed] px-4 py-16 text-boom-dark sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-boom-orange">
            Delivery y take away
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none sm:text-5xl md:text-6xl">
            Pedilo y disfrutalo en casa.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-black/65">
            {businessName} mantiene el espiritu de la marca: pedidos agiles,
            piezas frescas y una experiencia directa desde la carta online.
          </p>
          <a
            href={LACARTA_MENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-boom-orange px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-boom-dark"
          >
            Pedir ahora
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InfoTile label="Horario" value="Lun a jue 10 a 15 y 17 a 23" />
          <InfoTile label="Fin de semana" value="Vie a dom hasta 23:30" />
          <InfoTile label="Formato" value="Delivery y take away" />
          <InfoTile label="Menu" value="Actualizado online" />
        </div>
      </div>
    </section>
  );
}

function FranchiseSection() {
  return (
    <section id="franquicias" className="scroll-mt-28 bg-[#101010] px-4 py-16 text-white sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-y border-white/10 py-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-boom-yellow">
              Franquicias
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none sm:text-5xl md:text-6xl">
              Una marca con energia propia.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-white/70">
              Sushi Boom combina una identidad reconocible, carta visual y
              propuesta comercial lista para crecer en nuevos puntos.
            </p>
            <a
              href="#contacto"
              className="mt-7 inline-flex rounded-full border border-white/20 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-boom-yellow hover:text-boom-yellow"
            >
              Contacto comercial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <section id="contacto" className="scroll-mt-28 bg-black px-4 py-16 text-white sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-boom-yellow">
            Contacto
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none sm:text-5xl md:text-6xl">
            Hablemos de tu proximo Boom.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/68">
            Consultas comerciales, franquicias, eventos o pedidos especiales.
            Dejanos tus datos y el equipo te responde con una propuesta clara.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-boom-yellow">
                Horarios
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/68">
                Lunes a jueves de 10hs a 15hs y de 17hs a 23hs.
                <br />
                Viernes a domingo de 10hs a 15hs y de 17hs a 23:30hs.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-boom-yellow">
                Redes
              </h3>
              <div className="mt-4 flex items-center gap-3">
                <SocialLink
                  href="https://www.instagram.com/tusushiboom/"
                  image={brandAssets.instagram}
                  label="Instagram"
                />
                <SocialLink
                  href="https://www.facebook.com/sushiboomdelivery/"
                  image={brandAssets.facebook}
                  label="Facebook"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-8">
          <ContactInquiryForm />
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-2xl font-bold uppercase text-white">
          BOOM SUSHI
        </p>
        <a
          href={LACARTA_MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit rounded-full bg-boom-orange px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
        >
          Pedir online
        </a>
      </div>
    </section>
  );
}

function MiniProductList({ products }: { products: LacartaProduct[] }) {
  if (products.length === 0) {
    return (
      <a
        href={LACARTA_MENU_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex rounded-full bg-boom-orange px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
      >
        Ver carta online
      </a>
    );
  }

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {products.map((product) => (
        <a
          key={product._id}
          href={LACARTA_MENU_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/10 bg-white/[0.06] p-4 transition hover:border-boom-orange/70 hover:bg-white/[0.09]"
        >
          <p className="text-sm font-bold text-white">{product.name}</p>
          <p className="mt-1 text-sm font-semibold text-boom-yellow">
            {priceFormatter.format(product.price)}
          </p>
        </a>
      ))}
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_14px_35px_rgba(0,0,0,0.08)]">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-boom-orange">
        {label}
      </p>
      <p className="mt-3 text-xl font-bold leading-tight">{value}</p>
    </div>
  );
}

function SocialLink({
  href,
  image,
  label,
}: {
  href: string;
  image: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block h-10 w-10 overflow-hidden rounded-full bg-white p-2 transition hover:scale-105"
      aria-label={label}
    >
      <Image src={image} alt="" fill sizes="40px" className="object-contain p-2" />
    </a>
  );
}

function MenuError() {
  return (
    <div className="mt-10 rounded-lg border border-boom-orange/30 bg-white p-8">
      <p className="font-display text-3xl font-bold uppercase">
        La carta esta actualizandose.
      </p>
      <p className="mt-3 max-w-xl text-sm leading-6 text-black/62">
        Mientras vuelve la conexion, podes abrir el menu online y hacer tu
        pedido desde LaCarta!.
      </p>
      <a
        href={LACARTA_MENU_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex rounded-full bg-boom-orange px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-boom-dark"
      >
        Abrir menu online
      </a>
    </div>
  );
}

function EmptyMenu() {
  return (
    <div className="mt-10 rounded-lg border border-black/10 bg-white p-8">
      <p className="font-display text-3xl font-bold uppercase">
        No hay productos disponibles.
      </p>
      <p className="mt-3 max-w-xl text-sm leading-6 text-black/62">
        La carta online puede estar recibiendo cambios. Volve a intentar en unos
        minutos.
      </p>
    </div>
  );
}

function groupProducts(
  products: LacartaProduct[],
  categoryOrder?: string[] | null,
): ProductGroup[] {
  const grouped = new Map<string, LacartaProduct[]>();

  for (const product of products) {
    const group = grouped.get(product.category) ?? [];
    group.push(product);
    grouped.set(product.category, group);
  }

  const categories = Array.from(grouped.keys());
  const orderedCategories =
    categoryOrder && categoryOrder.length > 0
      ? [
          ...categoryOrder.filter((category) => grouped.has(category)),
          ...categories.filter((category) => !categoryOrder.includes(category)),
        ]
      : categories;

  return orderedCategories.map((category) => ({
    category,
    id: categoryAnchorMap[category] ?? slugify(category),
    products: grouped.get(category) ?? [],
  }));
}

function getProductImage(product: LacartaProduct) {
  if (product.contentType?.startsWith("image") && product.contentUrl) {
    return product.contentUrl;
  }

  return product.thumbnail ?? null;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
