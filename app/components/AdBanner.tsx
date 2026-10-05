import { TrendingUp, Phone } from "lucide-react";

interface AdBannerProps {
  variant?: "dark" | "blue";
}

// مساحات إعلانية تجريبية — لما الإعلانات المعتمدة تتنشر هتظهر هنا
export default function AdBanner({ variant = "dark" }: AdBannerProps) {
  if (variant === "blue") {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-secondary to-secondary-dark text-white p-6 md:p-8 flex items-center justify-between gap-4">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="relative text-right">
          <div className="text-[11px] font-bold bg-white/20 inline-block px-2.5 py-1 rounded-pill">إعلان</div>
          <div className="mt-3 text-lg md:text-2xl font-bold">برامج محاسبية متكاملة لشركتك</div>
          <div className="mt-1 text-sm text-white/70">فواتير إلكترونية، ضرائب، ومرتبات من مكان واحد</div>
        </div>
        <div className="relative text-2xl md:text-4xl font-extrabold shrink-0">خصم 15%</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-dark text-white p-6 md:p-8 flex items-center justify-between gap-4">
      <div className="absolute inset-0 bg-grid" />
      <TrendingUp className="absolute -left-4 -bottom-6 w-40 h-40 text-accent/20" strokeWidth={1.2} />
      <div className="relative text-right">
        <div className="text-[11px] text-white/60 border border-white/15 inline-block px-2.5 py-1 rounded-pill">إعلان</div>
        <div className="mt-3 text-lg md:text-2xl font-bold">دبلومة المحاسبة المالية المعتمدة</div>
      </div>
      <div className="relative flex items-center gap-2 text-sm text-white/80 shrink-0" dir="ltr">
        <Phone className="w-4 h-4" />
        01234567800
      </div>
    </div>
  );
}
