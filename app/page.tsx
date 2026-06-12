import { Navbar } from "@/components/navbar/Navbar";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { SushiBoomLanding } from "@/components/landing/SushiBoomLanding";
import { getLacartaMenuData } from "@/lib/lacarta";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { menuData, error } = await getLacartaMenuData();

  return (
    <main>
      <Navbar />
      <HeroSlider />
      <SushiBoomLanding menuData={menuData} error={error} />
      <WhatsAppFab />
    </main>
  );
}
