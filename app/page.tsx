import { Navbar } from "@/components/navbar/Navbar";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { OrderFab } from "@/components/ui/OrderFab";
import { SushiBoomLanding } from "@/components/landing/SushiBoomLanding";
import { getLacartaMenuData } from "@/lib/lacarta";
import { getCombosHref } from "@/lib/menu-navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { menuData, error } = await getLacartaMenuData();
  const combosHref = getCombosHref(menuData?.products ?? []);

  return (
    <main>
      <Navbar />
      <HeroSlider combosHref={combosHref} />
      <SushiBoomLanding
        menuData={menuData}
        error={error}
        combosHref={combosHref}
      />
      <OrderFab />
    </main>
  );
}
