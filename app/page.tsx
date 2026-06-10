import { Navbar } from "@/components/navbar/Navbar";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSlider />
      <WhatsAppFab />
    </main>
  );
}
