import HeroSection from "./components/HeroSection";
import StatsStrip from "./components/StatsStrip";
import ServicesSection from "./components/ServicesSection";
import NewsSection from "./components/NewsSection";

// الصفحة بتتبني مع كل زيارة، عشان أي تغيير في الداشبورد يظهر فورًا
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsStrip />
      <ServicesSection />
      <NewsSection />
      <NewsSection title="اخبار النقابات الفرعية" subtitle="تابع مستجدات وأنشطة نقابات التجاريين الفرعية في جميع المحافظات" useRealData={false} muted />
    </main>
  );
}
